import React, { useState } from 'react';
import { db } from './Config.js';
import { collection, addDoc } from 'firebase/firestore';

const AddTrip = () => {
  const [tripTitle, setTripTitle] = useState('');
  const [itinerary, setItinerary] = useState([
    {
      segmentTitle: '', // e.g., "Munnar to Kochi"
      image: '',
      content: []
    }
  ]);
  const [saving, setSaving] = useState(false);

  const addSegment = () => {
    setItinerary([...itinerary, {
      segmentTitle: '',
      image: '',
      content: []
    }]);
  };

  const updateSegmentField = (index, field, value) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  };

  const addContentItem = (segmentIndex, type = 'text') => {
    const updated = [...itinerary];
    if (type === 'text') {
      updated[segmentIndex].content.push('');
    } else {
      updated[segmentIndex].content.push({ subheading: '', notes: [''] });
    }
    setItinerary(updated);
  };

  const updateContentItem = (segmentIndex, contentIndex, value, noteIndex = null) => {
    const updated = [...itinerary];
    const item = updated[segmentIndex].content[contentIndex];

    if (typeof item === 'string') {
      updated[segmentIndex].content[contentIndex] = value;
    } else if (noteIndex === null) {
      updated[segmentIndex].content[contentIndex].subheading = value;
    } else {
      updated[segmentIndex].content[contentIndex].notes[noteIndex] = value;
    }

    setItinerary(updated);
  };

  const addNote = (segmentIndex, contentIndex) => {
    const updated = [...itinerary];
    updated[segmentIndex].content[contentIndex].notes.push('');
    setItinerary(updated);
  };

  const saveToFirebase = async () => {
    if (!tripTitle.trim()) {
      alert('Please enter a trip title');
      return;
    }

    try {
      setSaving(true);
      await addDoc(collection(db, 'trips'), {
        title: tripTitle,
        itinerary,
        createdAt: new Date()
      });
      alert('Trip saved successfully!');
      setTripTitle('');
      setItinerary([
        {
          segmentTitle: '',
          image: '',
          content: []
        }
      ]);
    } catch (error) {
      console.error('Error saving trip:', error);
      alert('Failed to save trip.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h3>Create Trip Itinerary</h3>

      <input
        type="text"
        placeholder="Trip Title"
        value={tripTitle}
        onChange={(e) => setTripTitle(e.target.value)}
        style={{ width: '100%', marginBottom: 15, fontSize: 16, padding: 8 }}
      />

      {itinerary.map((segment, segmentIndex) => (
        <div key={segmentIndex} style={{ border: '1px solid #ccc', marginBottom: 20, padding: 10 }}>
          <h4>Trip Segment {segmentIndex + 1}</h4>

          <input
            type="text"
            placeholder="Segment Title (e.g., Munnar to Kochi)"
            value={segment.segmentTitle}
            onChange={(e) => updateSegmentField(segmentIndex, 'segmentTitle', e.target.value)}
            style={{ width: '100%', marginBottom: 10 }}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={segment.image}
            onChange={(e) => updateSegmentField(segmentIndex, 'image', e.target.value)}
            style={{ width: '100%', marginBottom: 10 }}
          />

          <div>
            <h5>Contents</h5>
            {segment.content.map((item, contentIndex) => (
              <div key={contentIndex} style={{ marginBottom: 10, paddingLeft: 10 }}>
                {typeof item === 'string' ? (
                  <input
                    type="text"
                    placeholder="Simple bullet point"
                    value={item}
                    onChange={(e) =>
                      updateContentItem(segmentIndex, contentIndex, e.target.value)
                    }
                    style={{ width: '100%' }}
                  />
                ) : (
                  <div>
                    <input
                      type="text"
                      placeholder="Subheading"
                      value={item.subheading}
                      onChange={(e) =>
                        updateContentItem(segmentIndex, contentIndex, e.target.value)
                      }
                      style={{ width: '100%', marginBottom: 5 }}
                    />

                    {item.notes.map((note, noteIndex) => (
                      <input
                        key={noteIndex}
                        type="text"
                        placeholder={`Note ${noteIndex + 1}`}
                        value={note}
                        onChange={(e) =>
                          updateContentItem(segmentIndex, contentIndex, e.target.value, noteIndex)
                        }
                        style={{ width: '95%', marginLeft: 15, marginBottom: 5 }}
                      />
                    ))}

                    <button onClick={() => addNote(segmentIndex, contentIndex)}>
                      ➕ Add Note
                    </button>
                  </div>
                )}
              </div>
            ))}

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => addContentItem(segmentIndex, 'text')}>➕ Add Bullet</button>
              <button onClick={() => addContentItem(segmentIndex, 'group')}>➕ Add Subheading Group</button>
            </div>
          </div>
        </div>
      ))}

      <button onClick={addSegment} style={{ marginTop: 20 }}>➕ Add Trip Segment</button>

      <div style={{ marginTop: 30 }}>
        <button onClick={saveToFirebase} disabled={saving}>
          {saving ? 'Saving...' : '💾 Save Trip to Firebase'}
        </button>
      </div>
    </div>
  );
};

export default AddTrip;
