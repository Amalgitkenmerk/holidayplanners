// App.jsx
import React from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ItineraryPDF from './Components/ItineraryPDF';

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>View or Download Itinerary PDF</h2>

      <PDFDownloadLink document={<ItineraryPDF />} fileName="Kerala-Itinerary.pdf">
        {({ loading }) => (loading ? 'Generating PDF...' : '📥 Download PDF')}
      </PDFDownloadLink>

      <div style={{ marginTop: 30 }}>
        <PDFViewer width="100%" height={600}>
          <ItineraryPDF />
        </PDFViewer>
      </div>
    </div>
  );
};

export default App;
