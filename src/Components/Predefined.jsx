import React, { useRef, useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const Predefined = () => {
  const fileInputRef = useRef();
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => setPdfFile(reader.result);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const generateCustomPdf = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF first.");
      return;
    }

    const pdfDoc = await PDFDocument.load(pdfFile);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawText("Customer Name: John Doe", {
      x: 50,
      y: 700,
      size: 14,
      font,
      color: rgb(0, 0.53, 0.71),
    });

    firstPage.drawText("Travel Date: 2025-06-20", {
      x: 50,
      y: 680,
      size: 12,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    firstPage.drawText("Package Price: Rs 34,800", {
      x: 50,
      y: 660,
      size: 12,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });

    firstPage.drawText("Vehicle: Sedan (4 Seater)", {
      x: 50,
      y: 640,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "custom-itinerary.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Choose and Edit Your Own PDF</h3>

      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <br /><br />

      <button onClick={generateCustomPdf}>Customize and Download</button>
    </div>
  );
};

export default Predefined;
