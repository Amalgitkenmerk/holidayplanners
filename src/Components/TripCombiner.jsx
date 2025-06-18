import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './Config'; // Adjust path if needed

const TripCombiner = () => {
  const [availableTrips, setAvailableTrips] = useState([]);
  const [selectedTrips, setSelectedTrips] = useState([]); // [{ day: 1, tripId: '...', itinerary: [...] }]
  const [tripTitle, setTripTitle] = useState('');
   const [quotation, setQuotation] = useState({
    duration: '',
    date: '',
    persons: '',
    rooms: '',
    vehicle: '',
    destinations: [{ name: '', nights: '', rooms: '' }],
    inclusions: [''],
    exclusions: [''],
    pricing: {
      withHotel: { perHead: '', total: '' },
      withHouseboat: { perHead: '', total: '' },
    },
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      const snapshot = await getDocs(collection(db, 'trips'));
      const trips = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAvailableTrips(trips);
    };
    fetchTrips();
  }, []);

  const handleSelectTrip = async (dayIndex, tripId) => {
    const trip = availableTrips.find(t => t.id === tripId);
    const dayLabel = `Day ${dayIndex + 1}`;

    const selected = [...selectedTrips];
    selected[dayIndex] = {
      day: dayLabel,
      title: trip.title,
      content: trip.itinerary.flatMap(i => i.content || []),
      image: trip.itinerary[0]?.image || ''
    };
    setSelectedTrips(selected);
  };

  const handleAddDay = () => {
    setSelectedTrips([...selectedTrips, null]);
  };

  const handleSave = async () => {
    if (!tripTitle.trim()) return alert('Please enter a title');
    if (selectedTrips.some(d => !d)) return alert('Select trips for all days');

    try {
      setSaving(true);
      await addDoc(collection(db, 'Dayplans'), {
        title: tripTitle,
        itinerary: selectedTrips,
           quotation,
        createdAt: new Date(),
      });
            setQuotation({
        duration: '',
        date: '',
        persons: '',
        rooms: '',
        vehicle: '',
        destinations: [{ name: '', nights: '', rooms: '' }],
        inclusions: [''],
        exclusions: [''],
        pricing: {
          withHotel: { perHead: '', total: '' },
          withHouseboat: { perHead: '', total: '' },
        },
      });
      alert('Combined trip saved!');
      setTripTitle('');
      setSelectedTrips([]);
    } catch (err) {
      console.error('Saving error:', err);
      alert('Failed to save trip.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h3>Create Itinerary by Selecting Trips for Each Day</h3>
      <input
        type="text"
        value={tripTitle}
        onChange={(e) => setTripTitle(e.target.value)}
        placeholder="New Trip Title"
        style={{ width: '100%', marginBottom: 15 }}
      />

      {selectedTrips.map((day, index) => (
        <div key={index} style={{ marginBottom: 15 }}>
          <label>Select trip for Day {index + 1}</label>
          <select
            onChange={(e) => handleSelectTrip(index, e.target.value)}
            defaultValue=""
            style={{ marginLeft: 10 }}
          >
            <option value="" disabled>Select Trip</option>
            {availableTrips.map((trip) => (
              <option key={trip.id} value={trip.id}>{trip.title}</option>
            ))}
          </select>
        </div>
      ))}

      <button onClick={handleAddDay}>➕ Add Day</button>
<div style={{ padding: 20 }}>
      <h3>Create Quotation</h3>

      <label>Trip Title:</label>
      <input value={tripTitle} onChange={(e) => setTripTitle(e.target.value)} style={{ width: '100%', marginBottom: 10 }} />

      <label>Duration:</label>
      <input value={quotation.duration} onChange={(e) => setQuotation({ ...quotation, duration: e.target.value })} style={{ width: '100%' }} />

      <label>Date:</label>
      <input value={quotation.date} onChange={(e) => setQuotation({ ...quotation, date: e.target.value })} style={{ width: '100%' }} />

      <label>Number of Persons:</label>
      <input value={quotation.persons} onChange={(e) => setQuotation({ ...quotation, persons: e.target.value })} style={{ width: '100%' }} />

      <label>Number of Rooms:</label>
      <input value={quotation.rooms} onChange={(e) => setQuotation({ ...quotation, rooms: e.target.value })} style={{ width: '100%' }} />

      <label>Vehicle Type:</label>
      <input value={quotation.vehicle} onChange={(e) => setQuotation({ ...quotation, vehicle: e.target.value })} style={{ width: '100%', marginBottom: 10 }} />

      <h4>Destinations</h4>
      {quotation.destinations.map((dest, i) => (
        <div key={i} style={{ marginBottom: 5 }}>
          <input placeholder="Place" value={dest.name} onChange={(e) => {
            const newDests = [...quotation.destinations];
            newDests[i].name = e.target.value;
            setQuotation({ ...quotation, destinations: newDests });
          }} style={{ marginRight: 5 }} />
          <input placeholder="Nights" value={dest.nights} onChange={(e) => {
            const newDests = [...quotation.destinations];
            newDests[i].nights = e.target.value;
            setQuotation({ ...quotation, destinations: newDests });
          }} style={{ marginRight: 5 }} />
          <input placeholder="Rooms" value={dest.rooms} onChange={(e) => {
            const newDests = [...quotation.destinations];
            newDests[i].rooms = e.target.value;
            setQuotation({ ...quotation, destinations: newDests });
          }} />
        </div>
      ))}
      <button onClick={() => setQuotation({ ...quotation, destinations: [...quotation.destinations, { name: '', nights: '', rooms: '' }] })}>
        ➕ Add Destination
      </button>

      <h4>Pricing</h4>
      <label>With Hotel Stay - Per Head:</label>
      <input value={quotation.pricing.withHotel.perHead} onChange={(e) => {
        setQuotation({
          ...quotation,
          pricing: {
            ...quotation.pricing,
            withHotel: { ...quotation.pricing.withHotel, perHead: e.target.value }
          }
        });
      }} style={{ width: '100%' }} />

      <label>With Hotel Stay - Total:</label>
      <input value={quotation.pricing.withHotel.total} onChange={(e) => {
        setQuotation({
          ...quotation,
          pricing: {
            ...quotation.pricing,
            withHotel: { ...quotation.pricing.withHotel, total: e.target.value }
          }
        });
      }} style={{ width: '100%' }} />

      <label>With Houseboat - Per Head:</label>
      <input value={quotation.pricing.withHouseboat.perHead} onChange={(e) => {
        setQuotation({
          ...quotation,
          pricing: {
            ...quotation.pricing,
            withHouseboat: { ...quotation.pricing.withHouseboat, perHead: e.target.value }
          }
        });
      }} style={{ width: '100%' }} />

      <label>With Houseboat - Total:</label>
      <input value={quotation.pricing.withHouseboat.total} onChange={(e) => {
        setQuotation({
          ...quotation,
          pricing: {
            ...quotation.pricing,
            withHouseboat: { ...quotation.pricing.withHouseboat, total: e.target.value }
          }
        });
      }} style={{ width: '100%' }} />

      <h4>Inclusions</h4>
      {quotation.inclusions.map((item, i) => (
        <textarea key={i} value={item} onChange={(e) => {
          const newIncl = [...quotation.inclusions];
          newIncl[i] = e.target.value;
          setQuotation({ ...quotation, inclusions: newIncl });
        }} style={{ width: '100%', marginBottom: 5 }} />
      ))}
      <button onClick={() => setQuotation({ ...quotation, inclusions: [...quotation.inclusions, ''] })}>➕ Add Inclusion</button>

      <h4>Exclusions</h4>
      {quotation.exclusions.map((item, i) => (
        <textarea key={i} value={item} onChange={(e) => {
          const newExcl = [...quotation.exclusions];
          newExcl[i] = e.target.value;
          setQuotation({ ...quotation, exclusions: newExcl });
        }} style={{ width: '100%', marginBottom: 5 }} />
      ))}
      <button onClick={() => setQuotation({ ...quotation, exclusions: [...quotation.exclusions, ''] })}>➕ Add Exclusion</button>
</div>
      <div style={{ marginTop: 20 }}>
        <button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : '💾 Save Combined Itinerary'}
        </button>
      </div>
    </div>
  );
};

export default TripCombiner;
