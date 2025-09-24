import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Navigation, Plus, Minus } from 'lucide-react-native';

export function MapControls() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.controlButton}>
        <Navigation size={20} color="#0F766E" strokeWidth={2} />
      </TouchableOpacity>
      
      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomButton}>
          <Plus size={18} color="#0F766E" strokeWidth={2} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton}>
          <Minus size={18} color="#0F766E" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    gap: 12,
  },
  controlButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  zoomControls: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  zoomButton: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Map() {
  return <div>Map is not available on web.</div>;
}