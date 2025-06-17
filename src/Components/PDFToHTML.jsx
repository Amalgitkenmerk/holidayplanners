import React, { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import worker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = worker;

const PDFToHTML = ({ file }) => {
  const [htmlContent, setHtmlContent] = useState([]);

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(file);
      const pdf = await loadingTask.promise;
      const pagesHtml = [];

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const viewport = page.getViewport({ scale: 1 });

        const pageHtml = textContent.items.map((item, index) => {
          const style = item.transform;
          const left = style[4];
          const top = viewport.height - style[5];
          return (
            <div
              key={index}
              contentEditable
              style={{
                position: 'absolute',
                top: `${top}px`,
                left: `${left}px`,
                fontSize: `${item.height}px`,
              }}
            >
              {item.str}
            </div>
          );
        });

        pagesHtml.push(
          <div
            key={pageNum}
            style={{
              position: 'relative',
              width: `${viewport.width}px`,
              height: `${viewport.height}px`,
              border: '1px solid #ccc',
              marginBottom: '20px',
            }}
          >
            {pageHtml}
          </div>
        );
      }

      setHtmlContent(pagesHtml);
    };

    if (file) loadPdf();
  }, [file]);

  return (
    <div>
      <h3>PDF as Editable HTML</h3>
      {htmlContent}
    </div>
  );
};

export default PDFToHTML;
