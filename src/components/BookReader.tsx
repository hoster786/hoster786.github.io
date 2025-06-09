
import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, Download, ChevronLeft, ChevronRight, RotateCcw, Maximize2 } from 'lucide-react';

interface Book {
  title: string;
  author: string;
  filename: string;
  coverText: string;
  type: string;
  source?: string;
}

interface BookReaderProps {
  book: Book;
  onClose: () => void;
}

const BookReader = ({ book, onClose }: BookReaderProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleDownload = () => {
    if (book.source !== 'url') {
      const link = document.createElement('a');
      link.href = `/epubs/${book.filename}`;
      link.download = book.filename;
      link.click();
    }
  };

  const getBookUrl = () => {
    if (book.source === 'url') {
      return book.filename;
    }
    return `/epubs/${book.filename}`;
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header Controls */}
      <div className="bg-white shadow-lg border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div>
            <h2 className="font-semibold text-gray-900">{book.title}</h2>
            <p className="text-sm text-gray-600">by {book.author}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-white rounded transition-colors"
              disabled={zoom <= 50}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            <span className="px-3 py-2 text-sm font-medium min-w-[4rem] text-center">
              {zoom}%
            </span>
            
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-white rounded transition-colors"
              disabled={zoom >= 200}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleResetZoom}
              className="p-2 hover:bg-white rounded transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Page Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value) || 1;
                  setCurrentPage(Math.max(1, Math.min(totalPages, page)));
                }}
                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded text-center"
                min="1"
                max={totalPages}
              />
              <span className="text-sm text-gray-600">of {totalPages}</span>
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handleFullscreen}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            
            {book.source !== 'url' && (
              <button
                onClick={handleDownload}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reader Content */}
      <div className="flex-1 bg-gray-100 p-4 overflow-hidden">
        <div 
          className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
        >
          <iframe
            ref={iframeRef}
            src={getBookUrl()}
            className="w-full h-full border-0"
            title={book.title}
            onLoad={() => {
              // For PDFs, we might need to implement page detection
              // This is a simplified version
              setTotalPages(100); // Placeholder
            }}
          />
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage(1)}
              className="px-3 py-1 text-sm hover:bg-gray-100 rounded transition-colors"
              disabled={currentPage <= 1}
            >
              First
            </button>
            
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="px-3 py-1 text-sm hover:bg-gray-100 rounded transition-colors"
              disabled={currentPage <= 1}
            >
              Previous
            </button>
            
            <div className="w-64 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              />
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="px-3 py-1 text-sm hover:bg-gray-100 rounded transition-colors"
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
            
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-3 py-1 text-sm hover:bg-gray-100 rounded transition-colors"
              disabled={currentPage >= totalPages}
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReader;
