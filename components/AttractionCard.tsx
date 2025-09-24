import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Star, MapPin, Bookmark, QrCode } from 'lucide-react-native';
import { useAppContext } from '@/contexts/AppContext';

interface AttractionCardProps {
  searchQuery: string;
  selectedCategory: string;
}

const { width } = Dimensions.get('window');

export function AttractionCard({ searchQuery, selectedCategory }: AttractionCardProps) {
  const { attractions, toggleBookmark } = useAppContext();

  const filteredAttractions = attractions.filter((attraction) => {
    const matchesSearch = attraction.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || attraction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      {filteredAttractions.map((attraction) => (
        <TouchableOpacity key={attraction.id} style={styles.card}>
          <Image source={{ uri: attraction.imageUrl }} style={styles.image} />
          
          {attraction.hasQrCode && (
            <View style={styles.qrBadge}>
              <QrCode size={14} color="#FFFFFF" strokeWidth={2} />
            </View>
          )}
          
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => toggleBookmark(attraction.id)}
          >
            <Bookmark
              size={20}
              color={attraction.isBookmarked ? '#EA580C' : '#64748B'}
              fill={attraction.isBookmarked ? '#EA580C' : 'transparent'}
              strokeWidth={2}
            />
          </TouchableOpacity>

          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.name} numberOfLines={1}>
                {attraction.name}
              </Text>
              <View style={styles.rating}>
                <Star size={14} color="#D97706" fill="#D97706" strokeWidth={0} />
                <Text style={styles.ratingText}>{attraction.rating}</Text>
              </View>
            </View>

            <Text style={styles.description} numberOfLines={2}>
              {attraction.description}
            </Text>

            <View style={styles.footer}>
              <View style={styles.location}>
                <MapPin size={14} color="#64748B" strokeWidth={2} />
                <Text style={styles.distance}>{attraction.distance} km away</Text>
              </View>
              
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>
                  {attraction.category}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  qrBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#0F766E',
    borderRadius: 8,
    padding: 6,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginRight: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distance: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  categoryBadge: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#475569',
    textTransform: 'capitalize',
  },
});