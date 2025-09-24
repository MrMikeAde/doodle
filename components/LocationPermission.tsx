import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MapPin } from 'lucide-react-native';

interface LocationPermissionProps {
  onRequestPermission: () => void;
}

export function LocationPermission({ onRequestPermission }: LocationPermissionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MapPin size={48} color="#0F766E" strokeWidth={2} />
      </View>
      
      <Text style={styles.title}>Location Access Required</Text>
      <Text style={styles.subtitle}>
        We need access to your location to show nearby attractions and provide personalized recommendations.
      </Text>
      
      <TouchableOpacity style={styles.button} onPress={onRequestPermission}>
        <Text style={styles.buttonText}>Enable Location</Text>
      </TouchableOpacity>
      
      <Text style={styles.privacyNote}>
        Your location data is only used to enhance your experience and is never shared with third parties.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#F8FAFC',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0FDFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#0F766E',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  privacyNote: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
  },
});