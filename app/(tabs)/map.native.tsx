import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Navigation, List, Filter } from 'lucide-react-native';
import { AppProvider } from '@/contexts/AppContext';
import { MapControls } from '@/components/MapControls';
import { AttractionBottomSheet } from '@/components/AttractionBottomSheet';

function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'We need location access to show nearby attractions.');
        return;
      }

      // Mock location for demo (NYC)
      setLocation({
        coords: {
          latitude: 40.7128,
          longitude: -74.0060,
          altitude: null,
          accuracy: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: Date.now(),
      });
    })();
  }, []);

  const region = {
    latitude: location?.coords.latitude || 40.7128,
    longitude: location?.coords.longitude || -74.0060,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore Map</Text>
        <View style={styles.headerControls}>
          <TouchableOpacity style={styles.controlButton}>
            <Filter size={20} color="#0F766E" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
          >
            {viewMode === 'map' ? (
              <List size={20} color="#0F766E" strokeWidth={2} />
            ) : (
              <Navigation size={20} color="#0F766E" strokeWidth={2} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Map View */}
      {Platform.OS === 'web' ? (
        <View style={styles.webMapContainer}>
          <Text style={styles.webMapText}>
            Map view is available on mobile devices
          </Text>
          <Text style={styles.webMapSubtext}>
            This demo shows how the map interface would appear
          </Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          region={region}
          provider={PROVIDER_GOOGLE}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
              pinColor="#0F766E"
            />
          )}
        </MapView>
      )}

      {/* Map Controls */}
      <MapControls />
      
      {/* Bottom Sheet */}
      {selectedAttraction && (
        <AttractionBottomSheet
          attractionId={selectedAttraction}
          onClose={() => setSelectedAttraction(null)}
        />
      )}
    </SafeAreaView>
  );
}

export default function MapTab() {
  return (
    <AppProvider>
      <MapScreen />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
  },
  headerControls: {
    flexDirection: 'row',
    gap: 8,
  },
  controlButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 8,
  },
  map: {
    flex: 1,
  },
  webMapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    margin: 20,
    borderRadius: 16,
  },
  webMapText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  webMapSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
  },
});