import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Createpdf = () => {
  const handleDownload = async () => {
    const element = document.getElementById("pdf-content");

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("converted.pdf");
  };

  return (
    <div>
      <div id="pdf-content" style={{ padding: 20, background: "#f8f8f8" }}>
        <h2>Custom Component Content</h2>
        <p>This content will be converted to PDF.</p>
      </div>
      <button onClick={handleDownload}>Download as PDF</button>
    </div>
  );
};

export default Createpdf;
