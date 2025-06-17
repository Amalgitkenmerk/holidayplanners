// pages/CoverPage.jsx
import { Page, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  fullPageImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

const FixedPageOne = () => (
  <Page size="A4">
    <Image src="/page1.png" style={styles.fullPageImage} />
  </Page>
);

export default FixedPageOne;
