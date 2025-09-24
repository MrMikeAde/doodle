import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trophy, Zap, Target } from 'lucide-react-native';
import { useAppContext } from '@/contexts/AppContext';

export function HeaderStats() {
  const { user } = useAppContext();

  return (
    <View style={styles.container}>
      <View style={styles.statCard}>
        <Zap size={16} color="#EA580C" strokeWidth={2} />
        <Text style={styles.statValue}>{user.points}</Text>
        <Text style={styles.statLabel}>Points</Text>
      </View>
      
      <View style={styles.statCard}>
        <Trophy size={16} color="#D97706" strokeWidth={2} />
        <Text style={styles.statValue}>Level {user.level}</Text>
        <Text style={styles.statLabel}>Explorer</Text>
      </View>
      
      <View style={styles.statCard}>
        <Target size={16} color="#0F766E" strokeWidth={2} />
        <Text style={styles.statValue}>{user.scannedQrCodes.length}</Text>
        <Text style={styles.statLabel}>Scanned</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginTop: 2,
  },
});