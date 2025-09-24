import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, MapPin, Navigation, ListFilter as Filter } from 'lucide-react-native';
import { AppProvider, useAppContext } from '@/contexts/AppContext';

function BookmarksScreen() {
  const { attractions, user } = useAppContext();
  const [sortBy, setSortBy] = useState<'name' | 'distance' | 'rating'>('name');

  const bookmarkedAttractions = attractions.filter(attraction =>
    user.bookmarkedPlaces.includes(attraction.id)
  );

  const sortedAttractions = [...bookmarkedAttractions].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return a.distance - b.distance;
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const getSortLabel = () => {
    switch (sortBy) {
      case 'distance': return 'Distance';
      case 'rating': return 'Rating';
      default: return 'Name';
    }
  };

  const cycleSortBy = () => {
    const sortOptions: ('name' | 'distance' | 'rating')[] = ['name', 'distance', 'rating'];
    const currentIndex = sortOptions.indexOf(sortBy);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    setSortBy(sortOptions[nextIndex]);
  };

  if (bookmarkedAttractions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Saved Places</Text>
        </View>
        
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No saved places yet</Text>
          <Text style={styles.emptySubtitle}>
            Start exploring and bookmark your favorite attractions to see them here
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Saved Places</Text>
        <TouchableOpacity style={styles.sortButton} onPress={cycleSortBy}>
          <Filter size={16} color="#0F766E" strokeWidth={2} />
          <Text style={styles.sortText}>Sort by {getSortLabel()}</Text>
        </TouchableOpacity>
      </View>

      {/* Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{bookmarkedAttractions.length}</Text>
          <Text style={styles.statLabel}>Saved Places</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {bookmarkedAttractions.filter(a => a.category === 'restaurant').length}
          </Text>
          <Text style={styles.statLabel}>Restaurants</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {bookmarkedAttractions.filter(a => a.hasQrCode).length}
          </Text>
          <Text style={styles.statLabel}>With QR Codes</Text>
        </View>
      </View>

      {/* Bookmarked Attractions List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.listContainer}>
          {sortedAttractions.map((attraction) => (
            <TouchableOpacity key={attraction.id} style={styles.attractionCard}>
              <Image source={{ uri: attraction.imageUrl }} style={styles.attractionImage} />
              
              <View style={styles.attractionContent}>
                <View style={styles.attractionHeader}>
                  <Text style={styles.attractionName} numberOfLines={1}>
                    {attraction.name}
                  </Text>
                  <View style={styles.rating}>
                    <Star size={14} color="#D97706" fill="#D97706" strokeWidth={0} />
                    <Text style={styles.ratingText}>{attraction.rating}</Text>
                  </View>
                </View>

                <Text style={styles.attractionDescription} numberOfLines={2}>
                  {attraction.description}
                </Text>

                <View style={styles.attractionFooter}>
                  <View style={styles.location}>
                    <MapPin size={12} color="#64748B" strokeWidth={2} />
                    <Text style={styles.distanceText}>{attraction.distance} km</Text>
                  </View>
                  
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>
                      {attraction.category}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.directionsButton}>
                  <Navigation size={16} color="#0F766E" strokeWidth={2} />
                  <Text style={styles.directionsText}>Get Directions</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function BookmarksTab() {
  return (
    <AppProvider>
      <BookmarksScreen />
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
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sortText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#0F766E',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
    gap: 16,
  },
  attractionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  attractionImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  attractionContent: {
    padding: 16,
  },
  attractionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  attractionName: {
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
  attractionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 12,
  },
  attractionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
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
  directionsButton: {
    backgroundColor: '#F0FDFA',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  directionsText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#0F766E',
  },
});