// pages/CoverPage.jsx

import { Page, Text, View, Image } from '@react-pdf/renderer';

import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#cfd3e4',
    lineHeight: 1.5,
  },

  // Section Wrapper
  section: {
    marginBottom: 20,
    padding: 10,
    borderBottom: '1px solid #ccc',
  },

  // Section Title
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },

  // Table Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottom: '1px solid #e0e0e0',
  },

  // Table Header Row
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },

  // Cell Style
  cell: {
    flex: 1,
    paddingHorizontal: 5,
    fontSize: 11,
    color: '#222',
  },

  // Bullet List Item
  bullet: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 10,
  },

  bulletIcon: {
    width: 10,
    fontSize: 12,
    color: '#444',
  },

  // Day Headings for itinerary
  dayHeading: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginBottom: 8,
  },

  // For itinerary layout
  contentWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  leftCol: {
    flex: 2,
    paddingRight: 10,
    minWidth: '60%',
  },

  rightCol: {
    flex: 1,
    minWidth: '30%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  dayImage: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    marginTop: 10,
  },

  bulletText: {
    fontSize: 11,
    flex: 1,
    lineHeight: 1.4,
  },

  subSection: {
    marginTop: 8,
  },

  subheading: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },

  subBullet: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 2,
  },

  subheadingRight: {
    fontSize: 11,
    marginBottom: 2,
    marginLeft: 20,
    paddingRight: 5,
  },

  smallText: {
    fontSize: 10,
    marginTop: 5,
    fontStyle: 'italic',
  },

  text: {
    fontSize: 11,
    marginBottom: 2,
  },
});


const Quotationpage = ({ quotationDetails }) => (
    <>
      <Page size="A4" style={styles.page}>
 <View style={styles.section}>
  <Text style={styles.title}>Destination Nights & Rooms</Text>
  <View style={[styles.row, styles.tableHeader]}>
    <Text style={styles.cell}>Destination</Text>
    <Text style={styles.cell}>Nights</Text>
    <Text style={styles.cell}>No. of Rooms</Text>
  </View>
  {quotationDetails.destinations.map(({ name, nights, rooms }, idx) => (
    <View key={idx} style={styles.row}>
      <Text style={styles.cell}>{name}</Text>
      <Text style={styles.cell}>{nights}</Text>
      <Text style={styles.cell}>{rooms}</Text>
    </View>
  ))}
</View>
<View style={styles.section}>
  <Text style={styles.title}>Quotation</Text>
  <View style={styles.row}>
    <Text style={styles.cell}>Duration:</Text>
    <Text style={styles.cell}>{quotationDetails.duration}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.cell}>No. of Persons:</Text>
    <Text style={styles.cell}>{quotationDetails.persons}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.cell}>Rooms:</Text>
    <Text style={styles.cell}>{quotationDetails.rooms}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.cell}>Vehicle Type:</Text>
    <Text style={styles.cell}>{quotationDetails.vehicle}</Text>
  </View>

  <View style={[styles.row, styles.tableHeader]}>
    <Text style={styles.cell}>Package Type</Text>
    <Text style={styles.cell}>Rate/Head</Text>
    <Text style={styles.cell}>Total</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.cell}>With Hotel Stay</Text>
    <Text style={styles.cell}>₹ {quotationDetails.pricing.withHotel.perHead}</Text>
    <Text style={styles.cell}>₹ {quotationDetails.pricing.withHotel.total}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.cell}>With Private Houseboat</Text>
    <Text style={styles.cell}>₹ {quotationDetails.pricing.withHouseboat.perHead}</Text>
    <Text style={styles.cell}>₹ {quotationDetails.pricing.withHouseboat.total}</Text>
  </View>
</View>
<View style={styles.section}>
  <Text style={styles.title}>Inclusions</Text>
  {quotationDetails.inclusions.map((item, idx) => (
    <View key={idx} style={styles.bullet}>
      <Text style={styles.bulletIcon}>• </Text>
      <Text>{item}</Text>
    </View>
  ))}
</View>
<View style={styles.section}>
  <Text style={styles.title}>Exclusions</Text>
  {quotationDetails.exclusions.map((item, idx) => (
    <View key={idx} style={styles.bullet}>
      <Text style={styles.bulletIcon}>• </Text>
      <Text>{item}</Text>
    </View>
  ))}
</View>
</Page>
</>
);

export default Quotationpage;
