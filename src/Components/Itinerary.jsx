import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const hexToRgb = (hex) => {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const Itinerary = () => {
  const [form, setForm] = useState({
    duration: "5 Days & 4 Nights",
    date: "",
    persons: "4 Adults",
    vehicle: "Sedan (4 Seater)",
    itinerary: ["", "", "", "", ""],
    inclusions: ["A/C Vehicle", "Toll, parking, permit, driver bata", "Hotel stay with breakfast & dinner", "Houseboat with meals", "24x7 assistance"],
    exclusions: ["Lunch & snacks", "Entrance fees", "Optional activities", "Unmentioned sightseeing"],
    hotelPrice: 7750,
    houseboatPrice: 8700,
    themeColor: "#2385F5",
    fontFamily: "helvetica",
    fontSize: 12,
    layoutStyle: "card",
    showPricing: true,
    showContact: true,
    includeLogo: false
  });

  const handleChange = (e, field, index = null) => {
    if (index !== null) {
      const updated = [...form[field]];
      updated[index] = e.target.value;
      setForm({ ...form, [field]: updated });
    } else {
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setForm({ ...form, [field]: value });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const themeRGB = hexToRgb(form.themeColor);
    let y = 20;

    // Header Banner
    doc.setFillColor(...themeRGB);
    doc.rect(0, 0, 210, 30, "F");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("ELROI HOLIDAY PLANNERS", 105, 20, { align: 'center' });

    // Logo (optional)
    if (form.includeLogo) {
      const img = new Image();
      img.src = "/logo.png"; // Ensure logo.png is in public/
      img.onload = () => {
        doc.addImage(img, "PNG", 160, 10, 30, 15);
      };
    }

    doc.setFontSize(form.fontSize);
    doc.setFont(form.fontFamily);
    doc.setTextColor(0);
    doc.text(`Duration: ${form.duration}`, 20, 40);
    doc.text(`Date: ${form.date}`, 20, 47);
    doc.text(`Persons: ${form.persons}`, 20, 54);
    doc.text(`Vehicle: ${form.vehicle}`, 20, 61);

    // Itinerary Layouts
    y = 70;
    if (form.layoutStyle === "card") {
      form.itinerary.forEach((item, i) => {
        if (!item) return;
        doc.setFillColor(240, 248, 255);
        doc.rect(15, y, 180, 30, "FD");
        doc.setFontSize(14);
        doc.text(`Day ${i + 1}`, 20, y + 10);
        doc.setFontSize(form.fontSize);
        doc.text(doc.splitTextToSize(item, 170), 20, y + 20);
        y += 35;
      });
    } else {
      autoTable(doc, {
        startY: y,
        head: [["Day", "Plan"]],
        body: form.itinerary.map((item, i) => [`Day ${i + 1}`, item])
      });
      y = doc.lastAutoTable.finalY + 10;
    }

    // Pricing
    if (form.showPricing) {
      autoTable(doc, {
        startY: y,
        head: [["Package Type", "Per Head", "Total"]],
        body: [
          ["With Hotel Stay", `Rs ${form.hotelPrice}`, `Rs ${form.hotelPrice * 4}`],
          ["With Private Houseboat", `Rs ${form.houseboatPrice}`, `Rs ${form.houseboatPrice * 4}`]
        ]
      });
      y = doc.lastAutoTable.finalY + 10;
    }

    // Inclusions
    autoTable(doc, {
      startY: y,
      head: [["Inclusions"]],
      body: form.inclusions.map((i) => [i])
    });

    // Exclusions
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      head: [["Exclusions"]],
      body: form.exclusions.map((e) => [e])
    });

    if (form.showContact) {
      doc.text("Contact: +91 7012199335, +91 7012775441", 20, doc.internal.pageSize.height - 20);
    }
    doc.save("Elroi_Itinerary.pdf");
  };

  return (
    <div className="p-4">
      <h2>Custom Itinerary PDF Generator</h2>

      <label>Date: <input type="date" onChange={(e) => handleChange(e, "date")} /></label><br />
      <label>Vehicle Type: <input type="text" value={form.vehicle} onChange={(e) => handleChange(e, "vehicle")} /></label><br />
      <label>Theme Color: <input type="color" value={form.themeColor} onChange={(e) => handleChange(e, "themeColor")} /></label><br />
      <label>Font Family:
        <select value={form.fontFamily} onChange={(e) => handleChange(e, "fontFamily")}> 
          <option value="helvetica">Helvetica</option>
          <option value="courier">Courier</option>
          <option value="times">Times</option>
        </select>
      </label><br />
      <label>Font Size: <input type="number" value={form.fontSize} onChange={(e) => handleChange(e, "fontSize")} /></label><br />
      <label>Layout Style:
        <select value={form.layoutStyle} onChange={(e) => handleChange(e, "layoutStyle")}>
          <option value="card">Card</option>
          <option value="table">Table</option>
        </select>
      </label><br />
      <label><input type="checkbox" checked={form.showPricing} onChange={(e) => handleChange(e, "showPricing")} /> Include Pricing</label><br />
      <label><input type="checkbox" checked={form.showContact} onChange={(e) => handleChange(e, "showContact")} /> Include Contact Info</label><br />
      <label><input type="checkbox" checked={form.includeLogo} onChange={(e) => handleChange(e, "includeLogo")} /> Include Logo</label><br />

      <h4>Itinerary</h4>
      {form.itinerary.map((item, i) => (
        <textarea key={i} placeholder={`Day ${i + 1}`} value={item} onChange={(e) => handleChange(e, "itinerary", i)} />
      ))}

      <h4>Inclusions</h4>
      {form.inclusions.map((item, i) => (
        <input key={i} placeholder="Inclusion" value={item} onChange={(e) => handleChange(e, "inclusions", i)} />
      ))}

      <h4>Exclusions</h4>
      {form.exclusions.map((item, i) => (
        <input key={i} placeholder="Exclusion" value={item} onChange={(e) => handleChange(e, "exclusions", i)} />
      ))}

      <h4>Pricing</h4>
      <label>Hotel Package Per Head: <input type="number" value={form.hotelPrice} onChange={(e) => handleChange(e, "hotelPrice")} /></label><br />
      <label>Houseboat Package Per Head: <input type="number" value={form.houseboatPrice} onChange={(e) => handleChange(e, "houseboatPrice")} /></label><br />

      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default Itinerary;
