import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import { Gift, Star, X, CheckCircle } from 'lucide-react-native';
import { useAppContext } from '@/contexts/AppContext';
import { mockQrRewards } from '@/data/mockData';

interface QrScanResultProps {
  data: string;
  onClose: () => void;
}

export function QrScanResult({ data, onClose }: QrScanResultProps) {
  const { addScannedQrCode, attractions } = useAppContext();

  // Mock QR code processing
  const getRewardFromQrData = (qrData: string) => {
    if (qrData.includes('attraction_1') || qrData === 'mock_qr_code_attraction_1') {
      return { reward: mockQrRewards[0], attractionId: '1' };
    }
    return { reward: mockQrRewards[0], attractionId: '1' }; // Default for demo
  };

  const { reward, attractionId } = getRewardFromQrData(data);
  const attraction = attractions.find(a => a.id === attractionId);

  const handleClaimReward = () => {
    addScannedQrCode(attractionId, reward.pointsAwarded);
    onClose();
  };

  return (
    <Modal visible={true} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={20} color="#64748B" strokeWidth={2} />
          </TouchableOpacity>

          <View style={styles.iconContainer}>
            <CheckCircle size={48} color="#16A34A" strokeWidth={2} />
          </View>

          <Text style={styles.title}>QR Code Scanned!</Text>
          <Text style={styles.subtitle}>
            You found a reward at {attraction?.name}
          </Text>

          {attraction && (
            <Image source={{ uri: attraction.imageUrl }} style={styles.image} />
          )}

          <View style={styles.rewardCard}>
            <View style={styles.rewardHeader}>
              <Gift size={20} color="#EA580C" strokeWidth={2} />
              <Text style={styles.rewardTitle}>{reward.title}</Text>
            </View>
            
            <Text style={styles.rewardDescription}>{reward.description}</Text>
            
            <View style={styles.pointsContainer}>
              <Star size={16} color="#D97706" fill="#D97706" strokeWidth={0} />
              <Text style={styles.pointsText}>
                +{reward.pointsAwarded} points earned!
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.claimButton} onPress={handleClaimReward}>
            <Text style={styles.claimButtonText}>Claim Reward</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    padding: 8,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  rewardCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 20,
  },
  rewardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  rewardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
  rewardDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 12,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pointsText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#D97706',
  },
  claimButton: {
    backgroundColor: '#0F766E',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
  },
  claimButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});