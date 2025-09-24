import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Trophy, 
  Zap, 
  Target, 
  Settings, 
  Headphones,
  Play,
  Lock,
  Star
} from 'lucide-react-native';
import { AppProvider, useAppContext } from '@/contexts/AppContext';

function ProfileScreen() {
  const { user, audioTours, unlockAudioTour } = useAppContext();
  const [selectedTour, setSelectedTour] = useState<string | null>(null);

  const handleUnlockTour = (tourId: string, pointsCost: number) => {
    const success = unlockAudioTour(tourId, pointsCost);
    if (success) {
      setSelectedTour(null);
    }
  };

  const selectedTourData = audioTours.find(tour => tour.id === selectedTour);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <User size={32} color="#FFFFFF" strokeWidth={2} />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
          
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color="#64748B" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Zap size={20} color="#EA580C" strokeWidth={2} />
            </View>
            <Text style={styles.statValue}>{user.points}</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Trophy size={20} color="#D97706" strokeWidth={2} />
            </View>
            <Text style={styles.statValue}>Level {user.level}</Text>
            <Text style={styles.statLabel}>Explorer Level</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Target size={20} color="#0F766E" strokeWidth={2} />
            </View>
            <Text style={styles.statValue}>{user.scannedQrCodes.length}</Text>
            <Text style={styles.statLabel}>QR Codes Scanned</Text>
          </View>
        </View>

        {/* Level Progress */}
        <View style={styles.levelSection}>
          <Text style={styles.sectionTitle}>Level Progress</Text>
          <View style={styles.levelCard}>
            <View style={styles.levelHeader}>
              <Text style={styles.currentLevel}>Level {user.level}</Text>
              <Text style={styles.nextLevel}>Level {user.level + 1}</Text>
            </View>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${(user.points % 100)}%` }
                ]}
              />
            </View>
            
            <Text style={styles.progressText}>
              {user.points % 100}/100 points to next level
            </Text>
          </View>
        </View>

        {/* Audio Tours */}
        <View style={styles.audioSection}>
          <Text style={styles.sectionTitle}>Audio Tours</Text>
          <View style={styles.audioTours}>
            {audioTours.map((tour) => (
              <TouchableOpacity
                key={tour.id}
                style={styles.audioTourCard}
                onPress={() => tour.isUnlocked ? null : setSelectedTour(tour.id)}
                disabled={tour.isUnlocked}
              >
                <Image source={{ uri: tour.imageUrl }} style={styles.tourImage} />
                
                {!tour.isUnlocked && (
                  <View style={styles.lockOverlay}>
                    <Lock size={24} color="#FFFFFF" strokeWidth={2} />
                  </View>
                )}
                
                <View style={styles.tourContent}>
                  <View style={styles.tourHeader}>
                    <Headphones size={16} color="#0F766E" strokeWidth={2} />
                    <Text style={styles.tourDuration}>{tour.duration}</Text>
                  </View>
                  
                  <Text style={styles.tourTitle} numberOfLines={1}>
                    {tour.title}
                  </Text>
                  
                  <Text style={styles.tourDescription} numberOfLines={2}>
                    {tour.description}
                  </Text>
                  
                  <View style={styles.tourFooter}>
                    {tour.isUnlocked ? (
                      <TouchableOpacity style={styles.playButton}>
                        <Play size={14} color="#FFFFFF" strokeWidth={2} />
                        <Text style={styles.playText}>Play Tour</Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.costContainer}>
                        <Zap size={14} color="#EA580C" strokeWidth={2} />
                        <Text style={styles.costText}>{tour.pointsCost} points</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievements}>
            <View style={[styles.achievementCard, user.scannedQrCodes.length >= 1 && styles.achievementUnlocked]}>
              <Star size={20} color={user.scannedQrCodes.length >= 1 ? "#D97706" : "#94A3B8"} strokeWidth={2} />
              <Text style={[styles.achievementText, user.scannedQrCodes.length >= 1 && styles.achievementTextUnlocked]}>
                First Scan
              </Text>
            </View>
            
            <View style={[styles.achievementCard, user.points >= 100 && styles.achievementUnlocked]}>
              <Trophy size={20} color={user.points >= 100 ? "#D97706" : "#94A3B8"} strokeWidth={2} />
              <Text style={[styles.achievementText, user.points >= 100 && styles.achievementTextUnlocked]}>
                Point Collector
              </Text>
            </View>
            
            <View style={[styles.achievementCard, user.bookmarkedPlaces.length >= 3 && styles.achievementUnlocked]}>
              <Target size={20} color={user.bookmarkedPlaces.length >= 3 ? "#D97706" : "#94A3B8"} strokeWidth={2} />
              <Text style={[styles.achievementText, user.bookmarkedPlaces.length >= 3 && styles.achievementTextUnlocked]}>
                Explorer
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Tour Unlock Modal */}
      {selectedTour && selectedTourData && (
        <Modal visible={true} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Image source={{ uri: selectedTourData.imageUrl }} style={styles.modalImage} />
              
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedTourData.title}</Text>
                <Text style={styles.modalDescription}>{selectedTourData.description}</Text>
                
                <View style={styles.tourDetails}>
                  <View style={styles.tourDetailItem}>
                    <Headphones size={16} color="#64748B" strokeWidth={2} />
                    <Text style={styles.tourDetailText}>{selectedTourData.duration}</Text>
                  </View>
                  
                  <View style={styles.tourDetailItem}>
                    <Zap size={16} color="#EA580C" strokeWidth={2} />
                    <Text style={styles.tourDetailText}>{selectedTourData.pointsCost} points</Text>
                  </View>
                </View>
                
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setSelectedTour(null)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.unlockButton,
                      user.points < selectedTourData.pointsCost && styles.unlockButtonDisabled
                    ]}
                    onPress={() => handleUnlockTour(selectedTour, selectedTourData.pointsCost)}
                    disabled={user.points < selectedTourData.pointsCost}
                  >
                    <Text style={[
                      styles.unlockButtonText,
                      user.points < selectedTourData.pointsCost && styles.unlockButtonTextDisabled
                    ]}>
                      {user.points < selectedTourData.pointsCost ? 'Not Enough Points' : 'Unlock Tour'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

export default function ProfileTab() {
  return (
    <AppProvider>
      <ProfileScreen />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0F766E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  settingsButton: {
    padding: 8,
  },
  statsSection: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
  },
  levelSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  levelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  currentLevel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  nextLevel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#64748B',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0F766E',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    textAlign: 'center',
  },
  audioSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  audioTours: {
    gap: 16,
  },
  audioTourCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  tourImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tourContent: {
    padding: 16,
  },
  tourHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  tourDuration: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  tourTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  tourDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 16,
  },
  tourFooter: {
    alignItems: 'flex-start',
  },
  playButton: {
    backgroundColor: '#0F766E',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
  },
  playText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF3E2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  costText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#EA580C',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  achievements: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  achievementUnlocked: {
    backgroundColor: '#FFFBEB',
    borderColor: '#D97706',
  },
  achievementText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#94A3B8',
    marginTop: 8,
    textAlign: 'center',
  },
  achievementTextUnlocked: {
    color: '#D97706',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  modalContent: {
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 16,
  },
  tourDetails: {
    gap: 8,
    marginBottom: 24,
  },
  tourDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tourDetailText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#64748B',
  },
  unlockButton: {
    flex: 2,
    backgroundColor: '#0F766E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  unlockButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  unlockButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  unlockButtonTextDisabled: {
    color: '#F1F5F9',
  },
});