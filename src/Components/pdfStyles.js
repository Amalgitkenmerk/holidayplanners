import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#cfd3e4',
    lineHeight: 1.5,
  },

  dayHeading: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginBottom: 8,
  },

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

  bullet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },

  bulletIcon: {
    fontSize: 12,
    marginRight: 4,
    lineHeight: 1.4,
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
  row: {
    flexDirection: 'row',
    borderBottom: '1px solid #ddd',
    alignItems: 'center',
    paddingVertical: 4,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    padding: 5,
    fontSize: 11,
  },

  // Bullet list
  bullet: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletIcon: {
    width: 10,
    fontSize: 12,
  },

  // Optional text style
  text: {
    fontSize: 11,
    marginBottom: 2,
  },
});

export default styles;
