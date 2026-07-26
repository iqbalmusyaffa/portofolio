import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Set worker source to CDN for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const PdfThumbnail = ({ fileUrl, title }) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let renderTask = null;

    const renderPdf = async () => {
      try {
        setLoading(true);
        const loadingTask = pdfjsLib.getDocument(fileUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        
        // Calculate scale to fit canvas width (e.g. 600px for good quality thumbnail)
        const viewport = page.getViewport({ scale: 1 });
        const scale = 600 / viewport.width;
        const scaledViewport = page.getViewport({ scale });
        
        // Set canvas dimensions
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        renderTask = page.render({
          canvasContext: ctx,
          viewport: scaledViewport
        });

        await renderTask.promise;
        setLoading(false);
      } catch (err) {
        console.error("Error rendering PDF thumbnail:", err);
        setError(true);
        setLoading(false);
      }
    };

    renderPdf();

    return () => {
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [fileUrl]);

  if (error) {
    return (
      <div className="w-full h-full bg-white/5 flex items-center justify-center p-4 text-center text-gray-500 text-sm">
        Preview Not Available
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-white/5 flex items-center justify-center">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${loading ? 'opacity-0' : 'opacity-100'}`}
        aria-label={`Thumbnail of ${title}`}
      />
    </div>
  );
};

export default PdfThumbnail;
