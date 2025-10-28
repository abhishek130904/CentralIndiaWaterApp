import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Assuming you still want a gradient background

const ExploreWaterScreen = ({ navigation }) => {
  // Sample data for states - you'd likely fetch this from an API
  const states = [
    { id: '1', name: 'Madhya Pradesh', districts: 55, mapImage: 'https://static.vecteezy.com/system/resources/previews/021/847/226/non_2x/madhya-pradesh-state-location-within-india-3d-map-vector.jpg' },
    { id: '2', name: 'Chhattisgarh', districts: 33, mapImage: 'https://static.vecteezy.com/system/resources/previews/021/828/485/non_2x/chhattisgarh-state-location-within-india-3d-map-vector.jpg' },

  ];

  const handleViewDistricts = (stateName) => {
    navigation.navigate('StateScreen', { stateName });
  };

  return (
    <LinearGradient colors={['#F0F4F8', '#E0E8F0']} style={styles.gradientBackground}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#0F76B1" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Ionicons name="water-outline" size={26} color="#0F76B1" />
            <Text style={styles.logoText}>Central India Water Portal</Text>
          </View>
          <View style={{ width: 44 }} /> 
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleSection}>
            <View style={styles.titleLine} />
            <Text style={styles.screenTitle}>Explore Water Research by State</Text>
          </View>

          {/* State Cards */}
          <View style={styles.cardsContainer}>
            {states.map((state) => (
              <View key={state.id} style={styles.card}>
                <Image source={{ uri: state.mapImage }} style={styles.mapImage} resizeMode="cover" />

                <View style={styles.cardContent}>
                  <Text style={styles.stateName}>{state.name}</Text>
                  <Text style={styles.districtCount}>{state.districts} Districts</Text>
                  <TouchableOpacity 
                    style={styles.viewDistrictsButton}
                    onPress={() => handleViewDistricts(state.name)}
                  >
                    <Text style={styles.viewDistrictsButtonText}>View Districts</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff', // White header background
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Light border
  },
  backButton: {
    padding: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    color: '#0F76B1', // Darker blue for logo text
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  mapImage: {
  width: '100%',
  height: 150,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
},

  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  titleLine: {
    width: 5,
    height: 24,
    backgroundColor: '#0F76B1',
    marginRight: 10,
    borderRadius: 2,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow cards to wrap to the next line
    justifyContent: 'space-around', // Distribute cards evenly
  },
  card: {
    width: '48%', // Approx. half width for two columns, adjust as needed
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
    overflow: 'hidden', // Ensures borderRadius clips content
  },
  mapPlaceholder: {
    width: '100%',
    height: 150, // Fixed height for map area
    backgroundColor: '#f0f0f0', // Light grey background for map area
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mapText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
  },
  cardContent: {
    padding: 15,
    alignItems: 'center',
  },
  stateName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  districtCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  viewDistrictsButton: {
    backgroundColor: '#0F76B1', // Blue button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '90%', // Button width
    alignItems: 'center',
  },
  viewDistrictsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ExploreWaterScreen;

