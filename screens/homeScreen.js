import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Persist the animated value across renders so it isn't recreated every render
  const drawerAnimation = useRef(new Animated.Value(-width * 0.8)).current;
  
  const toggleDrawer = () => {
    const toValue = drawerVisible ? -width * 0.8 : 0;
    // use functional update to avoid stale closures
    setDrawerVisible((prev) => !prev);

    Animated.timing(drawerAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const navigateToPage = (page) => {
    console.log(`Navigate to ${page}`);
    toggleDrawer();
    
    // Add navigation logic here
    if (page === 'Home') {
      // Already on home, just close drawer
      return;
    } else if (page === 'About') {
      // Navigate to about page when implemented
      console.log('About page not implemented yet');
    } else if (page === 'Contact') {
      // Navigate to contact page when implemented
      console.log('Contact page not implemented yet');
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % 3); // Assuming 3 images
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <LinearGradient colors={['#0F76B1', '#21A395']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Ionicons name="water-outline" size={26} color="#fff" />
            <Text style={styles.logoText}>Central India Water Portal</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* --- Main Content --- */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* --- Image with Rings and Navigation --- */}
          <View style={styles.imageOuterContainer}>
            <TouchableOpacity onPress={prevImage} style={styles.imageNavButton}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            
            <View style={styles.ring3}>
              <View style={styles.ring2}>
                <View style={styles.ring1}>
                  <Image
                    source={{
                      uri: 'https://placehold.co/300x300/e8e4d8/635f52?text=Sunrise+Placeholder',
                    }}
                    style={styles.image}
                  />
                </View>
              </View>
            </View>
            
            <TouchableOpacity onPress={nextImage} style={styles.imageNavButton}>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* --- Text Content --- */}
          <View style={styles.textContent}>
            <Text style={styles.subtitle}>CENTRAL INDIA WATER PORTAL</Text>
            <Text style={styles.title}>Water Conservation Initiatives</Text>
            <Text style={styles.description}>
              Discover our latest projects to preserve Central India's water
              resources for future generations.
            </Text>
          </View>

          {/* --- Buttons --- */}
          <TouchableOpacity style={styles.button} onPress={() => { /* Handle button press */ }}>
            <Text style={styles.buttonText}>Learn More</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.exploreButton} onPress={() => { 
            try {
              navigation.navigate('ExploreWater');
            } catch (error) {
              console.error('Navigation error:', error);
            }
          }}>
            <Ionicons name="map-outline" size={20} color="#0F76B1" style={styles.buttonIcon} />
            <Text style={styles.exploreButtonText}>Explore Water Research by State</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* --- Drawer Navigation --- */}
        <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerAnimation }] }]}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>Navigation</Text>
            <TouchableOpacity onPress={toggleDrawer} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.drawerContent}>
            <TouchableOpacity 
              style={styles.drawerItem} 
              onPress={() => navigateToPage('Home')}
            >
              <Ionicons name="home-outline" size={24} color="#fff" />
              <Text style={styles.drawerItemText}>Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.drawerItem} 
              onPress={() => navigateToPage('About')}
            >
              <Ionicons name="information-circle-outline" size={24} color="#fff" />
              <Text style={styles.drawerItemText}>About</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.drawerItem} 
              onPress={() => navigateToPage('Contact')}
            >
              <Ionicons name="mail-outline" size={24} color="#fff" />
              <Text style={styles.drawerItemText}>Contact</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        {/* --- Drawer Overlay --- */}
        {drawerVisible && (
          <TouchableOpacity 
            style={styles.drawerOverlay} 
            onPress={toggleDrawer}
            activeOpacity={0.9}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  menuButton: {
    padding: 8,
  },
  headerSpacer: {
    width: 44, // Same width as menu button for balance
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  navContainer: {
    flexDirection: 'row',
    display: 'none', // Hide nav links on mobile by default
  },
  navText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 15,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40, // Space for the button
    paddingTop: 20,
  },
  imageOuterContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  imageNavButton: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  // Concentric rings for the image
  ring3: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 200, // Large enough to be a circle
  },
  ring2: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 180,
  },
  ring1: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 160,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125, // Half of width/height
    borderWidth: 3,
    borderColor: '#fff',
  },
  textContent: {
    alignItems: 'center',
    marginVertical: 20,
  },
  subtitle: {
    color: '#E0F7FA',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  description: {
    color: '#E0F7FA',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '90%',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // Shadow for Android
    elevation: 8,
  },
  buttonText: {
    color: '#0F76B1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exploreButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // Shadow for Android
    elevation: 8,
  },
  exploreButtonText: {
    color: '#0F76B1',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 4,
  },
  // Drawer Styles
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    height: '100%',
    backgroundColor: 'rgba(15, 118, 177, 0.95)',
    zIndex: 1000,
    paddingTop: 50,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  drawerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  drawerContent: {
    paddingTop: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  drawerItemText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
});

export default HomeScreen;


