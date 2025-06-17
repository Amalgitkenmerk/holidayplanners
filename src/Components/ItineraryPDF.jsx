// ItineraryPDF.jsx
import { Page, Text, View, Image, StyleSheet,Document } from '@react-pdf/renderer';
import FixedPageOne from './FixedPageOne';
import FixedPageTwo from './FixedPageTwo';
import FixedPageLast from './FixedPageLast';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
      backgroundColor: '#cfd3e4', 
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itineraryBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottom: '1px solid #eee',
    paddingBottom: 10,
  },
backgroundFullPage: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  opacity: 0.15, // Adjust as needed
},

foregroundContent: {
  position: 'relative',
  zIndex: 1,
},
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  leftCol: {
  flex: 2,
  paddingRight: 10,
},

rightCol: {
  flex: 1,
  alignItems: 'center',
},

dayImage: {
  width: 80,
  height: 80,
},
  section: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 4,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  bullet: {
    marginLeft: 10,
  },
  tableHeader: {
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 10,
    marginTop: 5,
    fontStyle: 'italic',
  },
  

bullet: {
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: 11,
  marginVertical: 2,
},

bulletIcon: {
   fontSize: 11,
  marginVertical: 2,
  paddingLeft: 10,
  textAlign: 'left',
},

row: {
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderColor: '#ccc',
  paddingVertical: 4,
},
dayHeading: {
  fontSize: 14,
  color: 'green',
  fontWeight: 'bold',
  textDecoration: 'underline',
  marginBottom: 6,
},

cell: {
  flex: 1,
  paddingHorizontal: 5,
  fontSize: 11,
},

tableHeader: {
  backgroundColor: '#d0f0d0',
  fontWeight: 'bold',
},

});
// Dynamic itinerary
const itinerary = [
  {
    day: 'Day 1',
    title: 'Cochin to Munnar',
    image: '/download.jpg',
    content: [
      'Starting from Kochi',
      'Visit Cheeyappara and Valara Waterfalls',
      'Tea Plantations, Spices Garden, Chocolate Factory',
      'Adventure Activities: Wonder Valley, Jeep Safari, Air Balloon Ride, Massage',
      'Reach Munnar and rest at resort'
    ]
  },
  {
    day: 'Day 2',
    title: 'Munnar',
    image: '/download.jpg',
    content: [
      'Breakfast',
      'Start sightseeing by 9am',
      'Eravikulam National Park, Tea Museum',
      'Echo Point, Mattuppetty Dam, Botanical Garden, Elephant Safari, Photo Point',
      'Overnight stay at resort'
    ]
  },
  {
    day: 'Day 3',
    title: 'Munnar to Thekkady',
    image: '/download.jpg',
    content: [
      'After breakfast, drive to Thekkady',
      'Periyar boating to see wildlife sanctuary',
      'Optional: Kathakali, Kalari Paittu, Elephant ride & bath, Tribal dance, Ayurveda massage, Jeep Safari',
      'Overnight stay at resort'
    ]
  },
  {
    day: 'Day 4',
    title: 'Thekkady to Alappuzha',
    image: '/download.jpg',
    content: [
      'After breakfast, head to Alleppey',
      'Optional: Shikara Boating, Kayaking, Visit Alleppey Beach',
      'Or check-in to Houseboat at 12pm, cruise till sunset',
      'Stay anchored overnight with 1-hour cruise in the morning',
      'Check out at 9am next day'
    ]
  },
  {
    day: 'Day 5',
    title: 'Alappuzha to Kochi',
    image: '/download.jpg',
    content: [
      'After breakfast, drive to Kochi',
      'Stop at Kerala Chips Shop, Kasavalayam for shopping',
      'Kochi Sightseeing: Fort Kochi, Santa Cruz Basilica, Chinese Fishing Nets, Marine Drive, Broadway, etc.',
      'Drop-off at Airport/Railway station'
    ]
  }
];


const DynamicItineraryPage = () => (
  <Page style={styles.page}>
 
    {/* 🔼 All content overlays here */}
    <View style={styles.foregroundContent}>
    <Text style={styles.heading}>Detailed Itinerary</Text>

      {itinerary.map((item, index) => (
        <View key={index} style={styles.itineraryBlock}>
          {/* Left Column: Text */}
          <View style={styles.leftCol}>
        <Text style={styles.dayHeading}>{item.day}: {item.title}</Text>
            {item.content.map((line, idx) => (
              <View key={idx} style={styles.bullet}>
               <Text style={styles.bulletIcon}>• </Text>
                <Text>{line}</Text>
              </View>
            ))}
          </View>

          {/* Right Column: Image */}
          <View style={styles.rightCol}>
            <Image src={item.image} style={styles.dayImage} />
          </View>
        </View>
      ))}
 
         <View style={styles.section}>
  <Text style={styles.title}>Destination Nights & Rooms</Text>
  <View style={[styles.row, styles.tableHeader]}>
    <Text style={styles.cell}>Destination</Text>
    <Text style={styles.cell}>Nights</Text>
    <Text style={styles.cell}>No. of Rooms</Text>
  </View>
  {[
    ['Munnar', '2', '1'],
    ['Thekkady', '1', '1'],
    ['Alleppey', '1', '1']
  ].map(([dest, nights, rooms], idx) => (
    <View key={idx} style={styles.row}>
      <Text style={styles.cell}>{dest}</Text>
      <Text style={styles.cell}>{nights}</Text>
      <Text style={styles.cell}>{rooms}</Text>
    </View>
  ))}
</View>

{/* Quotation Table */}
<View style={styles.section}>
  <Text style={styles.title}>Quotation</Text>
  <View style={styles.row}><Text style={styles.cell}>Duration:</Text><Text style={styles.cell}>5 Days & 4 Nights</Text></View>
  <View style={styles.row}><Text style={styles.cell}>No. of Persons:</Text><Text style={styles.cell}>4 Adults</Text></View>
  <View style={styles.row}><Text style={styles.cell}>Rooms:</Text><Text style={styles.cell}>1 (4 Sharing)</Text></View>
  <View style={styles.row}><Text style={styles.cell}>Vehicle Type:</Text><Text style={styles.cell}>Sedan (4 Seater)</Text></View>

  <View style={[styles.row, styles.tableHeader]}>
    <Text style={styles.cell}>Package Type</Text>
    <Text style={styles.cell}>Rate/Head</Text>
    <Text style={styles.cell}>Total</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.cell}>With Hotel Stay</Text>
    <Text style={styles.cell}>₹ 7750</Text>
    <Text style={styles.cell}>₹ 31,000</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.cell}>With Private Houseboat</Text>
    <Text style={styles.cell}>₹ 8700</Text>
    <Text style={styles.cell}>₹ 34,800</Text>
  </View>
</View>

{/* Inclusions */}
<View style={styles.section}>
  <Text style={styles.title}>Inclusions</Text>
  {[
    "Inclusive A/C vehicle.",
    "Including toll, parking, fuel charges, permit charges and driver bata.",
    "Service of an experienced Driver with Vehicle from 8 am to 6 pm.",
    "20 Hours Houseboat with all the Meals.",
    "Accommodation with Breakfast & Dinner at Hotels.",
    "24-hour assistance from Elroi Office Kochi."
  ].map((item, idx) => (
    <View key={idx} style={styles.bullet}>
         <Text style={styles.bulletIcon}>• </Text>
      <Text>{item}</Text>
    </View>
  ))}
</View>

{/* Exclusions */}
<View style={styles.section}>
  <Text style={styles.title}>Exclusions</Text>
  {[
    "Lunch & Other refreshments.",
    "Entrance fees at sightseeing spots.",
    "Sightseeing spots which are not mentioned in the itinerary.",
    "Optional activities (Activities, Tickets, Purchasing) which require payment."
  ].map((item, idx) => (
    <View key={idx} style={styles.bullet}>
       <Text style={styles.bulletIcon}>• </Text>
      <Text>{item}</Text>
    </View>
  ))}
</View>

{/* Contact */}
<View style={styles.section}>
  <Text style={styles.title}>Contact</Text>
  <View >
    <View  />
    <Text>+91 70121 99335, +91 70127 75441</Text>
  </View>
</View>

{/* Footer Note */}
<Text style={styles.smallText}>
  [We will try to cover the mentioned maximum places with the possible timing]
</Text>
</View>
  </Page>
);

const ItineraryPDF = () => (
  <Document>
    <FixedPageOne />
    <FixedPageTwo />
    <DynamicItineraryPage />
    <FixedPageLast/>
  </Document>
);

export default ItineraryPDF;
