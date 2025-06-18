import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import ItineraryForm from './Components/AddTrip';
import TripCombiner from './Components/TripCombiner';
import PDFGenerator from './Components/PDFGenerator'; // Updated component that handles selection

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 20 }}>🏠 PDF Generator</Link>
        <Link to="/create" style={{ marginRight: 20 }}>✍️ Create Itinerary</Link>
        <Link to="/combine">🔀 Trip Combiner</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PDFGenerator />} />
        <Route path="/create" element={<ItineraryForm />} />
        <Route path="/combine" element={<TripCombiner />} />
      </Routes>
    </div>
  );
};

export default App;
