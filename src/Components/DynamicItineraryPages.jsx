import { Page, Text, View, Image } from '@react-pdf/renderer';
import styles from './pdfStyles';

const DynamicItineraryPages = ({ itinerary }) =>
  itinerary
    .filter(item => item && (item.day || item.title || (item.content && item.content.length > 0)))
    .map((item, index) => (
      <>
      <Page key={index} style={styles.page}>
        <Text style={styles.dayHeading}>
          {item.day ? `Day ${item.day}: ` : ''}{item.title || ''}
        </Text>

        <View style={styles.contentWrapper}>
          {/* LEFT COLUMN */}
          <View style={styles.leftCol}>
            {item.content?.map((line, idx) => {
              if (typeof line === 'string' && line.trim()) {
                return (
                  <View key={idx} style={styles.bullet}>
                    <Text style={styles.bulletIcon}>• </Text>
                    <Text style={styles.bulletText}>{line}</Text>
                  </View>
                );
              }

              if (line?.subheading) {
                const hasNotes = Array.isArray(line.notes) && line.notes.length > 0;
                return (
                  <View key={idx} style={styles.subSection}>
                    <Text style={styles.subheading}>{line.subheading}</Text>
                    {hasNotes &&
                      line.notes.map((note, noteIdx) =>
                        note.trim() ? (
                          <View key={noteIdx} style={styles.subBullet}>
                            <Text style={styles.bulletIcon}>⮞ </Text>
                            <Text style={styles.bulletText}>{note}</Text>
                          </View>
                        ) : null
                      )}
                  </View>
                );
              }

              return null;
            })}
          </View>

          {/* RIGHT COLUMN */}
          {item.image && (
            <View style={styles.rightCol}>
              <Image src={item.image} style={styles.dayImage} />
            </View>
          )}
        </View>
       
      </Page>
    
      </>
    ));

export default DynamicItineraryPages;
