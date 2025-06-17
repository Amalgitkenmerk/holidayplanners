import React, { useState } from 'react';
import PDFCanvasWithDesign from './PDFCanvasWithDesign'; // adjust path if needed

const PDFUploader = () => {
  const [fileURL, setFileURL] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const objectURL = URL.createObjectURL(file);
      setFileURL(objectURL);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Choose a PDF to View</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <br /><br />
      {fileURL && <PDFCanvasWithDesign file={fileURL} />}
    </div>
  );
};

export default PDFUploader;
