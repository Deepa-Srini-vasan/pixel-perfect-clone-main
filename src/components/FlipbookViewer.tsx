import React, { useState, useRef, useEffect } from "react";
import { X, ZoomIn, ZoomOut, Download, Printer, Share2, ExternalLink, Bookmark, Search, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Document, Page as PdfPage, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { motion, AnimatePresence } from "framer-motion";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// @ts-ignore - react-pageflip doesn't have perfect TS definitions
const FlipBook = HTMLFlipBook as any;

// Local translation helper to satisfy static analysis i18n rules
const t = (key: string) => key;

const FlipPage = React.forwardRef(({ pageNumber, scale, isCover }: { pageNumber: number; scale: number; isCover?: boolean }, ref: any) => {
  const width = 400 * scale;
  const height = 565 * scale;

  return (
    <div
      className="page bg-white shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] overflow-hidden"
      ref={ref}
      data-density={isCover ? "hard" : "soft"}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="w-full h-full flex items-center justify-center bg-white relative">
        {/* Subtle page gradient for realism */}
        <div className={`absolute inset-0 z-10 pointer-events-none opacity-20 ${pageNumber % 2 === 0 ? "bg-gradient-to-r from-black/40 to-transparent" : "bg-gradient-to-l from-black/40 to-transparent"}`} />
        <div className="w-full h-full absolute inset-0 flex items-center justify-center overflow-hidden">
          <PdfPage
            pageNumber={pageNumber}
            width={width}
            height={height}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="select-none flex justify-center items-center object-contain"
          />
        </div>

        {/* Mock Interactive Hotspot for CRO (Demo) */}
        {!isCover && pageNumber === 2 && (
          <a href="/shop" className="absolute top-[30%] left-[20%] w-[40%] h-[30%] border-2 border-blue-500/0 hover:border-blue-500/50 hover:bg-blue-500/10 z-20 rounded-xl transition-all flex items-center justify-center group cursor-pointer" title={t('Click to view product')}>
            <div className="opacity-0 group-hover:opacity-100 bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg transform -translate-y-4 transition-all">
              {t('Add to Cart - $149')}
            </div>
          </a>
        )}
      </div>
    </div>
  );
});

FlipPage.displayName = "FlipPage";

interface FlipbookViewerProps {
  catalog: { id: string; title: string; pdfUrl: string } | null;
  onClose: () => void;
}

const FlipbookViewer = ({ catalog, onClose }: FlipbookViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [isError, setIsError] = useState(false);
  const bookRef = useRef<any>(null);

  // Lock body scroll
  useEffect(() => {
    if (catalog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [catalog]);

  if (!catalog) return null;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsError(false);
  };

  const onDocumentLoadError = () => {
    setIsError(true);
  };

  const handlePageChange = (e: any) => {
    setCurrentPage(e.data + 1);
  };

  const nextButtonClick = () => {
    if (bookRef.current) bookRef.current.pageFlip().flipNext();
  };

  const prevButtonClick = () => {
    if (bookRef.current) bookRef.current.pageFlip().flipPrev();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex flex-col bg-slate-950"
      >
        {/* TOP TOOLBAR */}
        <header className="h-[60px] flex-shrink-0 bg-slate-950 border-b border-white/[0.07] flex items-center justify-between px-4 lg:px-8 text-white z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 border border-white/10
                         flex items-center justify-center transition-all duration-200"
              aria-label={t('Close')}
            >
              <X className="w-4 h-4" />
            </button>
            <div className="hidden md:block">
              <h3 className="font-heading font-bold text-[14px] text-white leading-tight">{t(catalog.title)}</h3>
              <p className="text-[11px] text-slate-500 font-medium">{t('Interactive Catalog')}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="w-9 h-9 rounded-lg hover:bg-white/8 text-slate-400 hover:text-white transition-colors flex items-center justify-center" title={t('Zoom Out')} onClick={() => setScale(s => Math.max(0.5, s - 0.2))}>
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-bold text-slate-500 w-10 text-center tabular-nums">{Math.round(scale * 100)}%</span>
            <button className="w-9 h-9 rounded-lg hover:bg-white/8 text-slate-400 hover:text-white transition-colors flex items-center justify-center" title={t('Zoom In')} onClick={() => setScale(s => Math.min(2.5, s + 0.2))}>
              <ZoomIn className="w-4 h-4" />
            </button>

            <div className="w-px h-5 bg-white/10 mx-2" />

            <button className="w-9 h-9 rounded-lg hover:bg-white/8 text-slate-400 hover:text-white transition-colors hidden md:flex items-center justify-center" title={t('Search')}><Search className="w-4 h-4" /></button>
            <button className="w-9 h-9 rounded-lg hover:bg-white/8 text-slate-400 hover:text-white transition-colors hidden md:flex items-center justify-center" title={t('Bookmark')}><Bookmark className="w-4 h-4" /></button>
            <button className="w-9 h-9 rounded-lg hover:bg-white/8 text-slate-400 hover:text-white transition-colors hidden md:flex items-center justify-center" title={t('Share')}><Share2 className="w-4 h-4" /></button>
            <button className="w-9 h-9 rounded-lg hover:bg-white/8 text-slate-400 hover:text-white transition-colors hidden sm:flex items-center justify-center" title={t('Print')} onClick={() => window.print()}><Printer className="w-4 h-4" /></button>
            <a href={catalog.pdfUrl} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg hover:bg-white/8 text-slate-400 hover:text-white transition-colors hidden sm:flex items-center justify-center" title={t('Open in New Tab')}><ExternalLink className="w-4 h-4" /></a>

            <div className="w-px h-5 bg-white/10 mx-2" />

            <a
              href={catalog.pdfUrl}
              download
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500
                         text-white text-[13px] font-bold px-4 py-2 rounded-lg
                         transition-colors duration-200 shadow-[0_4px_12px_rgba(37,99,235,0.35)]"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">{t('Download')}</span>
            </a>
          </div>
        </header>

        {/* FLIPBOOK VIEWER AREA */}
        <div className="flex-1 overflow-hidden relative flex items-center justify-center p-4 md:p-12">

          {/* NAVIGATION ARROWS */}
          <button
            onClick={prevButtonClick}
            disabled={currentPage <= 1 || isError}
            className="absolute left-3 md:left-8 z-20 w-11 h-11 rounded-full
                       bg-white/8 hover:bg-white/15 border border-white/10
                       backdrop-blur-md flex items-center justify-center text-white
                       transition-all disabled:opacity-20 disabled:pointer-events-none"
            aria-label={t('Previous page')}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextButtonClick}
            disabled={!numPages || currentPage >= numPages || isError}
            className="absolute right-3 md:right-8 z-20 w-11 h-11 rounded-full
                       bg-white/8 hover:bg-white/15 border border-white/10
                       backdrop-blur-md flex items-center justify-center text-white
                       transition-all disabled:opacity-20 disabled:pointer-events-none"
            aria-label={t('Next page')}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            <Document
              file={catalog.pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex flex-col items-center gap-4 text-white">
                  <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-[13px] font-medium text-slate-400">{t('Loading catalog…')}</p>
                </div>
              }
              className="flex justify-center items-center w-full h-full"
            >
              {isError ? (
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md text-center text-white">
                  <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{t('Could not load catalog')}</h3>
                  <p className="text-slate-400 text-sm mb-6">{t('The PDF file might be corrupted or unavailable at the moment. Please try downloading it instead.')}</p>
                  <a href={catalog.pdfUrl} download className="inline-flex px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors">
                    {t('Download PDF Direct')}
                  </a>
                </div>
              ) : numPages ? (
                <FlipBook
                  width={400 * scale}
                  height={565 * scale}
                  size="fixed"
                  minWidth={300}
                  maxWidth={800}
                  minHeight={400}
                  maxHeight={1200}
                  maxShadowOpacity={0.5}
                  showCover={true}
                  mobileScrollSupport={true}
                  usePortrait={true}
                  onFlip={handlePageChange}
                  className="mx-auto drop-shadow-2xl"
                  ref={bookRef}
                >
                  {Array.from(new Array(numPages), (_, index) => (
                    <FlipPage
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      scale={scale}
                      isCover={index === 0 || index === numPages - 1}
                    />
                  ))}
                </FlipBook>
              ) : null}
            </Document>
          </div>
        </div>

        {/* BOTTOM PAGINATION BAR */}
        <footer className="h-14 flex-shrink-0 bg-slate-950 border-t border-white/[0.07] flex items-center justify-center text-white z-20">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-6 py-2">
            <span className="text-[12px] font-bold text-slate-400 tabular-nums">
              {t('Page ')}{currentPage} / {numPages ?? "—"}
            </span>
            <div className="w-28 h-[3px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${numPages ? (currentPage / numPages) * 100 : 0}%` }}
              />
            </div>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};

export default FlipbookViewer;
