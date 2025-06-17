import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const PDFEditor = () => {
  const [file, setFile] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [textInputs, setTextInputs] = useState([
    { x: 100, y: 100, value: "Edit me" }
  ]);

  const handlePdfUpload = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded?.type === "application/pdf") {
      setFile(uploaded);
    }
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...textInputs];
    newInputs[index].value = value;
    setTextInputs(newInputs);
  };

  const generateFinalPdf = async () => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const page = pdfDoc.getPages()[pageNum - 1];

    textInputs.forEach((item) => {
      // Cover original text area
      page.drawRectangle({
        x: item.x,
        y: page.getHeight() - item.y - 12,
        width: 160,
        height: 14,
        color: rgb(1, 1, 1),
      });

      // Draw new text
      page.drawText(item.value, {
        x: item.x,
        y: page.getHeight() - item.y,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
    });

    const finalBytes = await pdfDoc.save();
    const blob = new Blob([finalBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "edited.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Interactive PDF Viewer + Editor</h2>

      <input type="file" accept="application/pdf" onChange={handlePdfUpload} /><br /><br />

      {file && (
        <>
          <Document
            file={file}
            onLoadSuccess={({ numPages }) => setTotalPages(numPages)}
          >
            <Page pageNumber={pageNum} />
            <div style={{ position: "absolute", top: 100, left: 50 }}>
              {textInputs.map((input, i) => (
                <input
                  key={i}
                  value={input.value}
                  style={{
                    position: "absolute",
                    top: input.y,
                    left: input.x,
                    background: "#ffffcc",
                    border: "1px solid gray",
                  }}
                  onChange={(e) => handleInputChange(i, e.target.value)}
                />
              ))}
            </div>
          </Document>

          <div style={{ marginTop: 10 }}>
            Page: {pageNum} / {totalPages}
            <button disabled={pageNum <= 1} onClick={() => setPageNum((p) => p - 1)}>Prev</button>
            <button disabled={pageNum >= totalPages} onClick={() => setPageNum((p) => p + 1)}>Next</button>
          </div>

          <button onClick={() => setTextInputs([...textInputs, { x: 100, y: 150, value: "" }])}>
            + Add Text Field
          </button>

          <button onClick={generateFinalPdf} style={{ marginTop: 20 }}>Export Edited PDF</button>
        </>
      )}
    </div>
  );
};

export default PDFEditor;