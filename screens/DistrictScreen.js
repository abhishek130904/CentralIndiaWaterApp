import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import mpDistData from '../assets/mp_dist.json';

export default function DistrictScreen({ route }) {
  const { district } = route.params;

  const allDistricts = Object.values(mpDistData).flat();
  const districtData = allDistricts.find((d) => d.name === district.name);

  if (!districtData) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>District data not found.</Text>
      </View>
    );
  }

  const {
    image1,
    image2,
    image3,
    image4,
    image5,
    overview,
    data,
    lulc_data,
    name,
  } = districtData;

  return (
    <LinearGradient colors={['#0077b6', '#00b4d8']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{name} District</Text>
          <Text style={styles.subtitle}>
            Water Resource Monitoring & LULC Report
          </Text>
        </View>

        {/* Image 1 */}
        {image1 && (
          <View style={styles.sectionCard}>
            <Image
              source={{ uri: image1 }}
              style={styles.largeImage}
              resizeMode="contain"
            />
          </View>
        )}

        {/* Overview */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>District Overview</Text>
          <Text style={styles.text}>{overview}</Text>
        </View>

        {/* Image 2 */}
        {image2 && (
          <View style={styles.sectionCard}>
            <Image
              source={{ uri: image2 }}
              style={styles.largeImage}
              resizeMode="contain"
            />
          </View>
        )}

        {/* Decadal Water Data */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Decadal Water Body Data</Text>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <View key={index} style={styles.waterRow}>
                <Text style={styles.waterYear}>{item.year}</Text>
                <Text style={styles.waterText}>
                  Seasonal: {item.seasonal} km² | Permanent: {item.permanent} km²
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>No decadal data available.</Text>
          )}
        </View>

        {/* Image 3 and 4 side by side */}
        {(image3 || image4) && (
          <View style={styles.sectionCard}>
            <View style={styles.imageRow}>
              {image3 && (
                <Image
                  source={{ uri: image3 }}
                  style={styles.halfImage}
                  resizeMode="contain"
                />
              )}
              {image4 && (
                <Image
                  source={{ uri: image4 }}
                  style={styles.halfImage}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        )}

        {/* LULC Data */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Land Use Land Cover (LULC) Data</Text>
          {lulc_data ? (
            Object.entries(lulc_data).map(([key, value], index) => (
              <View key={index} style={styles.lulcRow}>
                <Text style={styles.lulcKey}>{key}</Text>
                <Text style={styles.lulcValue}>{value} km²</Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>No LULC data available.</Text>
          )}
        </View>

        {/* Image 5 at end */}
        {image5 && (
          <View style={styles.sectionCard}>
            <Image
              source={{ uri: image5 }}
              style={styles.largeImage}
              resizeMode="contain"
            />
          </View>
        )}

        <View style={{ height: 50 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#d4f2ff',
    textAlign: 'center',
    marginTop: 5,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0077b6',
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  largeImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfImage: {
    width: '48%',
    height: 200,
    borderRadius: 12,
  },
  lulcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  lulcKey: {
    color: '#444',
    fontSize: 15,
  },
  lulcValue: {
    color: '#0077b6',
    fontWeight: 'bold',
    fontSize: 15,
  },
  waterRow: {
    backgroundColor: '#f4f9ff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 4,
  },
  waterYear: {
    fontWeight: 'bold',
    color: '#0077b6',
    fontSize: 15,
  },
  waterText: {
    color: '#555',
    fontSize: 14,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});
