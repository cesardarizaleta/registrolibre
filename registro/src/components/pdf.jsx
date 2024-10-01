import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  text: {
    fontSize: 10,
    textAlign: 'center'
  }
});

// Create Document Component
export default function MyDocument({ registros }) {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.text}>Registro de Productos</Text>
          {registros.map((row, index) => (
            <View key={index} style={styles.section}>
              <Text>{row.formato}</Text>
            </View>
          ))}

        </View>
      </Page>
    </Document>
  )
}