import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Star, MapPin, Navigation, X } from 'lucide-react-native';
import { useAppContext } from '@/contexts/AppContext';

interface AttractionBottomSheetProps {
  attractionId: string;
  onClose: () => void;
}

export function AttractionBottomSheet({ attractionId, onClose }: AttractionBottomSheetProps) {
  const { attractions } = useAppContext();
  const attraction = attractions.find(a => a.id === attractionId);

  if (!attraction) return null;

  return (
    <View style={styles.container}>
      <View style={styles.sheet}>
        <View style={styles.handle} />
        
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={20} color="#64748B" strokeWidth={2} />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={{ uri: attraction.imageUrl }} style={styles.image} />
          
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.name}>{attraction.name}</Text>
              <View style={styles.rating}>
                <Star size={16} color="#D97706" fill="#D97706" strokeWidth={0} />
                <Text style={styles.ratingText}>{attraction.rating}</Text>
              </View>
            </View>

            <Text style={styles.description}>{attraction.description}</Text>

            <View style={styles.location}>
              <MapPin size={16} color="#64748B" strokeWidth={2} />
              <Text style={styles.address}>{attraction.address}</Text>
            </View>

            <TouchableOpacity style={styles.directionsButton}>
              <Navigation size={20} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.directionsText}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    flex: 1,
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginRight: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 24,
    marginBottom: 16,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  address: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  directionsButton: {
    backgroundColor: '#0F766E',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  directionsText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});