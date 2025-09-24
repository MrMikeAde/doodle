import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Navigation, List, ListFilter as Filter } from 'lucide-react-native';
import { AppProvider } from '@/contexts/AppContext';
import { MapControls } from '@/components/MapControls';
import { AttractionBottomSheet } from '@/components/AttractionBottomSheet';

function MapScreen() {
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

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

      {/* Web Map Placeholder */}
      <View style={styles.webMapContainer}>
        <Text style={styles.webMapText}>
          Map view is available on mobile devices
        </Text>
        <Text style={styles.webMapSubtext}>
          This demo shows how the map interface would appear
        </Text>
      </View>

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