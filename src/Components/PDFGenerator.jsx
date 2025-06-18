// PDFGenerator.jsx
import React, { useState, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './Config';
import ItineraryPDF from './ItineraryPDF';

const PDFGenerator = () => {
  const [tripList, setTripList] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState('');
  const [itinerary, setItinerary] = useState([]);
    const [quatation, setquotation] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      const snapshot = await getDocs(collection(db, 'Dayplans'));
      const trips = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || 'Untitled Trip',
      }));
      setTripList(trips);
    };
    fetchTrips();
  }, []);

  useEffect(() => {
    if (!selectedTripId) return;
    const fetchItinerary = async () => {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, 'Dayplans', selectedTripId));
        if (snap.exists()) {
          setItinerary(snap.data().itinerary || []);
          setquotation(snap.data().quotation || [])
 
        } else {
          setItinerary([]);
          console.error('Trip not found');
        }
      } catch (error) {
        console.error('Error loading itinerary:', error);
        setItinerary([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItinerary();
  }, [selectedTripId]);

  return (
    <div>
      <h3>Select a Trip to View or Download PDF</h3>

      <select
        onChange={(e) => setSelectedTripId(e.target.value)}
        value={selectedTripId}
        disabled={tripList.length === 0}
        style={{ padding: '8px', marginBottom: '20px' }}
      >
        <option value="">-- Select Trip --</option>
        {tripList.map(trip => (
          <option key={trip.id} value={trip.id}>{trip.title}</option>
        ))}
      </select>

      {!selectedTripId && <p>Please select a trip to generate PDF.</p>}
      {loading && <p>Loading itinerary...</p>}

      {!loading && itinerary.length > 0 && (
        <>
          <PDFDownloadLink document={<ItineraryPDF itinerary={itinerary} quotationDetails={quatation}/>} fileName="Itinerary.pdf">
            {({ loading }) => loading ? 'Generating PDF...' : '📥 Download PDF'}
          </PDFDownloadLink>

          <div style={{ marginTop: 20 }}>
            <PDFViewer width="100%" height={600}>
              <ItineraryPDF itinerary={itinerary} quotationDetails={quatation} />
            </PDFViewer>
          </div>
        </>
      )}
    </div>
  );
};

export default PDFGenerator;