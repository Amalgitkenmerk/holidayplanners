import React, { useState } from 'react';
import PDFToHTML from './PDFToHTML';

const PDFUploadAndConvert = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload PDF and Convert to HTML</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <br /><br />
      {pdfUrl && <PDFToHTML file={pdfUrl} />}
    </div>
  );
};

export default PDFUploadAndConvert;
