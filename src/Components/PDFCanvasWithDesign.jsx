// 📦 Required: npm install pdfjs-dist pdf-lib

import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PDFCanvasWithDesign = ({ file }) => {
  const [numPages, setNumPages] = useState(0);
  const containerRef = useRef();

  useEffect(() => {
    const renderPDF = async () => {
      if (!file) return;

      const loadingTask = pdfjsLib.getDocument(file);
      const pdf = await loadingTask.promise;
      setNumPages(pdf.numPages);

      const container = containerRef.current;
      container.innerHTML = '';

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: context, viewport }).promise;

        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.marginBottom = '20px';
        wrapper.style.width = `${canvas.width}px`;
        wrapper.style.height = `${canvas.height}px`;
        wrapper.className = `pdf-page-wrapper`;
        wrapper.dataset.pageNum = pageNum;
        wrapper.appendChild(canvas);

        const textContent = await page.getTextContent();
        textContent.items.forEach((item) => {
          const transform = item.transform;
          const x = transform[4];
          const y = viewport.height - transform[5];

          const div = document.createElement('div');
          div.textContent = item.str;
          div.contentEditable = true;
          div.dataset.originalText = item.str;
          div.dataset.x = x;
          div.dataset.y = y;
          div.dataset.fontSize = item.height;
          div.dataset.page = pageNum;

          div.style.position = 'absolute';
          div.style.left = `${x}px`;
          div.style.top = `${y}px`;
          div.style.fontSize = `${item.height}px`;
          div.style.fontFamily = 'Helvetica';
          div.style.whiteSpace = 'nowrap';
          div.style.backgroundColor = 'transparent';
          div.style.padding = '1px 2px';
          div.style.color = '#000';

          wrapper.appendChild(div);
        });

        container.appendChild(wrapper);
      }
    };

    renderPDF();
  }, [file]);

const exportToPDF = async () => {
  const response = await fetch(file);
  const arrayBuffer = await response.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const textDivs = containerRef.current.querySelectorAll('[data-page]');
  textDivs.forEach((div) => {
    const page = parseInt(div.dataset.page);
    const x = parseFloat(div.dataset.x);
    const y = parseFloat(div.dataset.y);
    const fontSize = parseFloat(div.dataset.fontSize);
    
    // Get latest edited value and clean unsupported characters
    let value = div.textContent.trim();
    value = value.replace(/[^\x00-\x7F]/g, ''); // Remove emojis/special icons

    const pdfPage = pdfDoc.getPage(page - 1);
    const { height } = pdfPage.getSize();

    // Erase old content background with a white rectangle
    pdfPage.drawRectangle({
      x,
      y: height - y - fontSize,
      width: value.length * fontSize * 0.6,
      height: fontSize + 4,
      color: rgb(1, 1, 1),
    });

    // Draw new edited text
    pdfPage.drawText(value, {
      x,
      y: height - y - fontSize + 2,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
  });

  const editedBytes = await pdfDoc.save();
  const blob = new Blob([editedBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'edited_output.pdf';
  link.click();
};


 



  return (
    <div style={{ padding: 20 }}>
      <h3>Edit PDF Text In-Place and Export</h3>
      <button onClick={exportToPDF} style={{ marginBottom: 10 }}>
        Export Edited PDF
      </button>
      <div ref={containerRef}></div>
    </div>
  );
};

export default PDFCanvasWithDesign;