import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import mpDistData from '../assets/mp_dist.json';

export default function StateScreen({ route, navigation }) {
  const { stateName } = route.params;
  const [districts, setDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadDistrictData = () => {
      try {
        const data = mpDistData[stateName] || [];
        const formatted = data.map((d) => ({
          id: d.id,
          name: d.name,
          waterBodies: d.waterBodies || Math.floor(Math.random() * 20) + 5, // fallback
        }));
        setDistricts(formatted);
        setFilteredDistricts(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDistrictData();
  }, [stateName]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = districts.filter((d) =>
      d.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDistricts(filtered);
  };

  return (
    <LinearGradient colors={['#0077b6', '#00b4d8']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
            <Text style={styles.backText}>Back to Home</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{stateName} Water Resources</Text>
          <Text style={styles.subTitle}>
            Comprehensive water data across all districts
          </Text>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Ionicons name="map-outline" size={20} color="#fff" />
              <Text style={styles.statValue}>{districts.length}</Text>
              <Text style={styles.statLabel}>Districts</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons name="water-outline" size={20} color="#fff" />
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Water Bodies</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons name="people-outline" size={20} color="#fff" />
              <Text style={styles.statValue}>72.6M</Text>
              <Text style={styles.statLabel}>Population</Text>
            </View>
          </View>
        </View>

        {/* Body Section */}
        <View style={styles.bodyContainer}>
          {/* Search Bar */}
          <View style={styles.searchRow}>
            <TextInput
              placeholder="Search districts..."
              value={searchQuery}
              onChangeText={handleSearch}
              style={styles.searchInput}
            />
          </View>

          {/* District List */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0077b6" />
            </View>
          ) : (
            <FlatList
              data={filteredDistricts}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              renderItem={({ item }) => (
                <View style={styles.districtCard}>
                  <View style={styles.districtIcon}>
                    <Text style={styles.iconText}>
                      {item.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.districtName}>{item.name}</Text>
                  <Text style={styles.districtInfo}>
                    {item.waterBodies} water bodies
                  </Text>
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subTitle: {
    color: '#e0f7ff',
    fontSize: 14,
    marginTop: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  statLabel: {
    color: '#e0f7ff',
    fontSize: 12,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  searchRow: {
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    elevation: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  districtCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },
  districtIcon: {
    backgroundColor: '#0077b6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  districtName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  districtInfo: {
    color: '#777',
    marginBottom: 10,
    fontSize: 13,
  },
  detailsButton: {
    backgroundColor: '#0077b6',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  detailsText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
