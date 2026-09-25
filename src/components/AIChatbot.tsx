import { useState, useRef, useEffect, type FormEvent } from "react";
import {
  X, Send, User, Settings, Key, RotateCcw, Maximize2, Minimize2
} from "lucide-react";
import imgVoice from "@/assets/3d-assets/mascot_hero_hd.png";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

const DEFAULT_GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const SYSTEM_INSTRUCTION = `You are Aqua AI, the official AI Product Specialist for Euroaqua Plumtek - India's leading manufacturer of PPR pipes, PP-RCT hot/cold water systems, HDPE/MDPE pipes, taps, faucets, and fluid conveyance fittings based in Salem, Tamil Nadu.
1. Answer customer queries clearly regarding pipe sizes (20mm-160mm), pressure ratings (PN10, PN16, PN20, PN25), socket fusion installation, dealership opportunities, and prices.
2. If asked about prices, provide typical estimates and invite them to request an official GST quotation or call +91 98427 42936.
3. Be professional, friendly, helpful, and concise. Do not use emojis in your responses. Use clear formatting like bullet points when listing sizes or technical specifications.
4. Euroaqua Plumtek contact details: Phone: +91 98427 42936, Email: support@euroaquappr.com, Address: Edappadi Main Rd, Kuppanoor, Salem, Tamil Nadu.`;

const renderBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

function FormattedMessage({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1 text-xs leading-relaxed">
      {lines.map((line, idx) => {
        if (line.startsWith("### ")) {
          return (
            <h4 key={idx} className="font-extrabold text-blue-400 text-sm mt-2 mb-1">
              {line.replace("### ", "")}
            </h4>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h3 key={idx} className="font-black text-blue-400 text-base mt-2 mb-1">
              {line.replace("## ", "")}
            </h3>
          );
        }
        if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
          const content = line.trim().substring(2);
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1 my-0.5">
              <span className="text-blue-400 font-bold shrink-0">•</span>
              <span>{renderBoldText(content)}</span>
            </div>
          );
        }
        if (!line.trim()) {
          return <div key={idx} className="h-1" />;
        }
        return <p key={idx}>{renderBoldText(line)}</p>;
      })}
    </div>
  );
}

const generateKnowledgeBaseResponse = (prompt: string): string => {
  const p = prompt.toLowerCase();

  if (p.includes("size") || p.includes("dimension") || p.includes("diameter") || p.includes("mm")) {
    return `### Euroaqua Plumtek PPR & Pipe Size Availability
Euroaqua Plumtek manufactures pipes and fittings in standard metric sizes:
- PPR Pipes (PN10, PN16, PN20, PN25): 20mm, 25mm, 32mm, 40mm, 50mm, 63mm, 75mm, 90mm, 110mm, 160mm.
- PP-RCT High Performance Pipes: 20mm up to 160mm.
- HDPE & MDPE Pipes: 20mm to 315mm SDR ratings.

Need a specific dimension quote? Call our Salem sales office at +91 98427 42936 or submit a bulk query on our Shop page!`;
  }

  if (p.includes("price") || p.includes("cost") || p.includes("quote") || p.includes("rate") || p.includes("rs") || p.includes("inr")) {
    return `### Product Pricing & Bulk Quotations
Euroaqua Plumtek offers factory-direct pricing for contractors, plumbers, and authorized dealers:

- Sample Unit Price Ranges:
  - PPR Cold Water Pipes: Starting from ₹85 / meter
  - PPR Hot Water PN20 Pipes: Starting from ₹145 / meter
  - Brass Ball Valves & Taps: ₹240 – ₹1,250 / unit

For a formal GST invoice quotation tailored to your project bill of materials (BOM), please contact us at +91 98427 42936 or email support@euroaquappr.com.`;
  }

  if (p.includes("dealer") || p.includes("distributor") || p.includes("agency") || p.includes("business")) {
    return `### Become an Authorized Plumtek Dealer
We are expanding our retail and distribution network across Tamil Nadu and South India!

Distributor Benefits:
1. High profit margins & annual performance bonuses.
2. Official marketing collaterals, display boards, & catalog samples.
3. Fast 24-48 hour order dispatch from our Salem central warehouse.

Interested? Submit a dealership inquiry via our Contact page or speak with our Dealer Network Manager at +91 98427 42936.`;
  }

  if (p.includes("catalog") || p.includes("download") || p.includes("pdf") || p.includes("brochure")) {
    return `### Product Catalogs & Technical Datasheets
You can view and download all official Euroaqua Plumtek product catalogs directly from our website!

Visit the Catalogs page in the main navigation menu to download PDF technical guides for:
1. PPR & PP-RCT Hot & Cold Water Systems
2. Taps, Faucets, & Brass Accessories
3. HDPE / MDPE Infrastructure Pipes

Or contact support@euroaquappr.com to request printed catalogs.`;
  }

  return `### Euroaqua Plumtek Support Overview
Thank you for reaching out to Euroaqua Plumtek! Here is quick information about our products and services:

- Products: PPR Hot/Cold Pipes (PN10–PN25), PP-RCT, Brass Taps & Faucets, HDPE/MDPE Pipes, & Flexible Hoses.
- Factory Location: Edappadi Main Rd, Kuppanoor, Salem, Tamil Nadu.
- Direct Phone: +91 98427 42936
- Email Support: support@euroaquappr.com

How can I assist you with your plumbing requirement today?`;
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(DEFAULT_GEMINI_KEY);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting: ChatMessage = {
    id: 1,
    role: "assistant",
    content:
      "Hello! I am Aqua AI, your Euroaqua Plumtek AI Product Specialist. Ask me about PPR pipe sizes, pressure ratings (PN10–PN25), installation guidelines, prices, or dealer opportunities!",
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleResetChat = () => {
    setMessages([initialGreeting]);
  };

  /* Call Google Gemini API directly */
  const callGeminiAPI = async (userPrompt: string, history: ChatMessage[]) => {
    const keyToUse = apiKey.trim() || DEFAULT_GEMINI_KEY;

    const modelsToTry = [
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
    ];

    const contents = [
      {
        role: "user",
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      {
        role: "model",
        parts: [{ text: "Understood! I am ready to assist as Aqua AI, Euroaqua Plumtek's AI Product Specialist." }],
      },
      ...history.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      {
        role: "user",
        parts: [{ text: userPrompt }],
      },
    ];

    let lastError: Error | null = null;

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${keyToUse}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
            },
          }),
        });

        const data = await response.json();
        if (response.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          return data.candidates[0].content.parts[0].text;
        }

        const errMsg = data?.error?.message || `API error ${response.status}`;
        lastError = new Error(errMsg);
      } catch (err: any) {
        lastError = err;
      }
    }

    throw lastError || new Error("Gemini API connection failed.");
  };

  const handleSendMessage = async (textToSend: string) => {
    const prompt = textToSend.trim();
    if (!prompt || isTyping) return;

    const userMessage: ChatMessage = { id: Date.now(), role: "user", content: prompt };
    const nextHistory = [...messages, userMessage];

    setMessages(nextHistory);
    setDraft("");
    setIsTyping(true);

    try {
      const aiReply = await callGeminiAPI(prompt, messages);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: aiReply },
      ]);
    } catch {
      // Graceful fallback to Knowledge Base
      const kbReply = generateKnowledgeBaseResponse(prompt);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: kbReply },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage(draft);
  };

  const quickChips = [
    "PPR Pipe Sizes (20mm-160mm)",
    "PN Rating Specs (PN10-PN25)",
    "Download Product Catalog",
    "Become a Dealer",
  ];

  return (
    <div className="relative flex flex-col items-end gap-3 font-sans">
      {isOpen ? (
        <div
          className={`
            bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-[9999]
            ${
              isMaximized
                ? "fixed inset-4 md:inset-10 w-auto h-auto"
                : "w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh]"
            }
          `}
        >
          {/* Header */}
          <div className="bg-slate-900 border-b border-slate-800 px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 border border-blue-400/40 flex items-center justify-center shadow-lg shadow-blue-500/30 overflow-hidden shrink-0">
                  <img src={imgVoice} alt="Plumtek Mascot" className="w-full h-full object-contain p-0.5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-white text-base tracking-tight">Aqua AI</h3>
                  <span className="px-2 py-0.5 rounded-full bg-blue-600/30 border border-blue-400/30 text-blue-300 text-[10px] font-black tracking-wider uppercase">
                    PRO
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Plumtek Product Specialist</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-xl transition-colors ${showSettings ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                title="API Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                title={isMaximized ? "Minimize" : "Maximize"}
              >
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Settings Panel Drawer */}
          {showSettings && (
            <div className="bg-slate-900 border-b border-slate-800 p-4 space-y-3 shrink-0 animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                <span className="flex items-center gap-1.5 text-blue-400">
                  <Key className="w-3.5 h-3.5" />
                  Gemini API Key Setting
                </span>
                <span className="text-[10px] text-slate-400 font-normal">Optional custom key</span>
              </div>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste AI Studio Key (AIzaSy...)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Free tier AI Studio keys work automatically</span>
                <button
                  onClick={() => setApiKey(DEFAULT_GEMINI_KEY)}
                  className="text-blue-400 hover:underline font-semibold"
                >
                  Reset Default
                </button>
              </div>
            </div>
          )}

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed bg-slate-950">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
                    <img src={imgVoice} alt="Mascot" className="w-full h-full object-contain p-0.5" />
                  </div>
                )}
                <div
                  className={`
                    max-w-[85%] rounded-2xl p-3.5 shadow-sm
                    ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-slate-900 text-slate-100 border border-slate-800 rounded-bl-none"
                    }
                  `}
                >
                  {m.role === "assistant" ? (
                    <FormattedMessage text={m.content} />
                  ) : (
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  )}
                </div>
                {m.role === "user" && (
                  <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-slate-300">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3 text-slate-400 text-xs py-1">
                <div className="w-7 h-7 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src={imgVoice} alt="Mascot" className="w-full h-full object-contain p-0.5" />
                </div>
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-2 rounded-2xl">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-150" />
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-300" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
            {quickChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSendMessage(chip)}
                className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-blue-600/30 border border-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-blue-300 text-[11px] font-semibold whitespace-nowrap transition-all"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Footer Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask about PPR pipes, sizes, prices, dealers..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!draft.trim() || isTyping}
              className="w-9 h-9 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-all hover:scale-105"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        /* Floating Launcher Button - Blue Accent with Mascot PNG Profile */
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white p-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-blue-600/40 transition-all duration-300 hover:scale-105"
          title="Open AI Support Assistant"
        >
          <div className="relative w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center overflow-hidden shrink-0">
            <img src={imgVoice} alt="Plumtek Mascot" className="w-full h-full object-contain p-0.5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <span className="hidden sm:inline font-extrabold text-xs uppercase tracking-wider text-white">
            Ask AI Specialist
          </span>
        </button>
      )}
    </div>
  );
};

export default AIChatbot;
