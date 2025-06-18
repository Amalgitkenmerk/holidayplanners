// ItineraryPDF.jsx
import React from 'react';

import { Document } from '@react-pdf/renderer';
import FixedPageOne from './FixedPageOne';
import FixedPageTwo from './FixedPageTwo';
import FixedPageLast from './FixedPageLast';
import DynamicItineraryPages from './DynamicItineraryPages';

import Quotationpage from './Quatationpage';
const ItineraryPDF = ({ itinerary,quotationDetails }) => (
  <Document>
    <FixedPageOne />
    <FixedPageTwo />
    <DynamicItineraryPages itinerary={itinerary} />
    <Quotationpage quotationDetails={quotationDetails}/>
  
        

    <FixedPageLast />
  </Document>
);

export default ItineraryPDF;
