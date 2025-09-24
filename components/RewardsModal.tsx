import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { Gift, Clock, Percent, X } from 'lucide-react-native';
import { QrCodeReward } from '@/types';

interface RewardsModalProps {
  rewards: QrCodeReward[];
  isVisible: boolean;
  onClose: () => void;
}

export function RewardsModal({ rewards, isVisible, onClose }: RewardsModalProps) {
  const activeRewards = rewards.filter(reward => 
    new Date(reward.validUntil) > new Date()
  );

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Your Rewards</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={20} color="#64748B" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {activeRewards.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Gift size={48} color="#94A3B8" strokeWidth={2} />
                <Text style={styles.emptyTitle}>No active rewards</Text>
                <Text style={styles.emptySubtitle}>
                  Scan QR codes at participating locations to unlock exclusive rewards!
                </Text>
              </View>
            ) : (
              <View style={styles.rewardsList}>
                {activeRewards.map((reward) => (
                  <View key={reward.id} style={styles.rewardCard}>
                    <View style={styles.rewardHeader}>
                      <View style={styles.rewardIcon}>
                        {reward.discountPercentage ? (
                          <Percent size={20} color="#EA580C" strokeWidth={2} />
                        ) : (
                          <Gift size={20} color="#EA580C" strokeWidth={2} />
                        )}
                      </View>
                      <Text style={styles.rewardTitle}>{reward.title}</Text>
                    </View>
                    
                    <Text style={styles.rewardDescription}>
                      {reward.description}
                    </Text>
                    
                    <View style={styles.rewardFooter}>
                      <View style={styles.validUntil}>
                        <Clock size={14} color="#64748B" strokeWidth={2} />
                        <Text style={styles.validText}>
                          Valid until {new Date(reward.validUntil).toLocaleDateString()}
                        </Text>
                      </View>
                      
                      {reward.discountPercentage && (
                        <View style={styles.discountBadge}>
                          <Text style={styles.discountText}>
                            {reward.discountPercentage}% OFF
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
  },
  closeButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  rewardsList: {
    padding: 20,
    gap: 16,
  },
  rewardCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#EA580C',
  },
  rewardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rewardIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rewardTitle: {
    flex: 1,
    fontSize: 16,
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
  rewardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  validUntil: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  validText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  discountBadge: {
    backgroundColor: '#EA580C',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});