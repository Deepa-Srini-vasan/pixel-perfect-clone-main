import { productService } from '../services/ProductService.js';
import { sendJson, readBody } from '../utils/http.js';

function getFallbackReply(question, products) {
  const normalizeText = (t) => String(t || "").toLowerCase().replace(/[^a-z0-9]/g, " ").trim();
  const normalized = normalizeText(question);
  
  const unsupportedTerms = ["price", "discount", "stock", "availability", "delivery", "order", "warranty", "refund", "return", "custom", "quote", "invoice"];
  const isOutOfScope = unsupportedTerms.some((term) => normalized.includes(term));
  if (isOutOfScope) {
    return "I can help with product size and specification questions. For pricing, stock, delivery, orders, or custom requirements, please contact our customer care executive through WhatsApp or the contact page.";
  }

  // Find product match
  let bestProduct = null;
  let bestScore = 0;
  for (const p of products) {
    const pName = normalizeText(p.name);
    const pCat = normalizeText(p.category_name || p.category);
    let score = 0;
    if (normalized.includes(pName) || pName.includes(normalized)) score += 3;
    if (normalized.includes(pCat)) score += 1;
    if (score > bestScore) {
      bestScore = score;
      bestProduct = p;
    }
  }

  if (!bestProduct) {
    return "I can answer questions about the sizes and specifications of products on this site. Tell me a product name or ask about a specific size or spec and I’ll help.";
  }

  // Get specs
  let specs = [];
  try {
    specs = typeof bestProduct.specs_json === 'string' ? JSON.parse(bestProduct.specs_json) : (bestProduct.specs_json || []);
  } catch (e) {
    specs = [];
  }

  const specLine = specs.length > 0 
    ? `${specs[0].label}: ${specs[0].value}` 
    : bestProduct.short_description || "Please check the product page for technical details.";

  return `For ${bestProduct.name}, ${specLine}. ${bestProduct.short_description ? `The product is described as ${bestProduct.short_description}.` : ""} If you need more detail, our customer care executive can assist.`;
}

export class ChatbotController {
  async chat(req, res) {
    try {
      const { message, history = [] } = await readBody(req);
      if (!message) {
        sendJson(res, 400, { error: 'Message is required' });
        return;
      }

      // 1. Fetch catalog context from Database
      const { products } = await productService.getProducts({ limit: 1000, active: true });

      // 2. Read Gemini key
      const apiKey = process.env.GEMINI_API_KEY || '';

      if (!apiKey) {
        // Fallback to local rule engine if no API key is provided
        const reply = getFallbackReply(message, products);
        sendJson(res, 200, { reply });
        return;
      }

      // 3. Construct Context prompt
      const productsContext = products.map(p => {
        let specsStr = '';
        try {
          const specs = typeof p.specs_json === 'string' ? JSON.parse(p.specs_json) : p.specs_json;
          specsStr = Array.isArray(specs) ? specs.map(s => `${s.label}: ${s.value}`).join(', ') : '';
        } catch (e) {
          specsStr = '';
        }
        return `- Product: ${p.name}, Category: ${p.category_name || p.category}, Specs: [${specsStr}], Details: ${p.short_description}`;
      }).join('\n');

      const systemPrompt = `You are Ollie, the friendly 3D Mascot for Euro Plumber Tech Private Limited.
Your task is to answer user questions about product sizes, dimensions, specifications, and descriptions based ONLY on the catalog context below.

Catalog Context:
${productsContext}

Rules:
1. Answer in a friendly, professional manner.
2. Keep your answers concise, maximum 2-3 lines.
3. If the user asks about pricing, stock availability, custom orders, delivery, or anything outside of technical specs, politely tell them to contact our customer care executive on WhatsApp at 6379665268.
4. If a question cannot be answered using the catalog context, guide them to contact the customer care executive on WhatsApp.`;

      const contents = [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nChat History:\n${history.map(h => `${h.role}: ${h.content}`).join('\n')}\nUser Question: ${message}` }]
        }
      ];

      // 4. Invoke Gemini API
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API failed with status ${response.status}`);
      }

      const resData = await response.json();
      const reply = resData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 
                    getFallbackReply(message, products);

      sendJson(res, 200, { reply });

    } catch (err) {
      console.error('[Chatbot error]', err.message);
      // Fallback gracefully on exceptions
      try {
        const { products } = await productService.getProducts({ limit: 100, active: true });
        const { message } = await readBody(req).catch(() => ({ message: '' }));
        const reply = getFallbackReply(message, products);
        sendJson(res, 200, { reply });
      } catch (e) {
        sendJson(res, 500, { error: 'Internal server error' });
      }
    }
  }
}
export const chatbotController = new ChatbotController();
