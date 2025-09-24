import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import { Play, Pause, SkipBack, SkipForward, X, Volume2 } from 'lucide-react-native';
import { AudioTour } from '@/types';

interface AudioTourPlayerProps {
  tour: AudioTour;
  isVisible: boolean;
  onClose: () => void;
}

export function AudioTourPlayer({ tour, isVisible, onClose }: AudioTourPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime] = useState(2700); // 45 minutes in seconds

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control actual audio playback
  };

  const skipForward = () => {
    setCurrentTime(Math.min(currentTime + 30, totalTime));
  };

  const skipBackward = () => {
    setCurrentTime(Math.max(currentTime - 30, 0));
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.player}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={20} color="#64748B" strokeWidth={2} />
          </TouchableOpacity>

          <Image source={{ uri: tour.imageUrl }} style={styles.albumArt} />
          
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{tour.title}</Text>
            <Text style={styles.trackDescription}>{tour.description}</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${(currentTime / totalTime) * 100}%` }
                ]}
              />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(totalTime)}</Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={skipBackward}>
              <SkipBack size={24} color="#1E293B" strokeWidth={2} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
              {isPlaying ? (
                <Pause size={32} color="#FFFFFF" strokeWidth={2} />
              ) : (
                <Play size={32} color="#FFFFFF" strokeWidth={2} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton} onPress={skipForward}>
              <SkipForward size={24} color="#1E293B" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Volume */}
          <View style={styles.volumeContainer}>
            <Volume2 size={16} color="#64748B" strokeWidth={2} />
            <View style={styles.volumeBar}>
              <View style={[styles.volumeFill, { width: '70%' }]} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  player: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
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
  albumArt: {
    width: 200,
    height: 200,
    borderRadius: 16,
    marginBottom: 24,
    resizeMode: 'cover',
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 32,
  },
  trackTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  trackDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 32,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0F766E',
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    marginBottom: 24,
  },
  controlButton: {
    padding: 8,
  },
  playButton: {
    backgroundColor: '#0F766E',
    borderRadius: 50,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  volumeBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
  },
  volumeFill: {
    height: '100%',
    backgroundColor: '#64748B',
    borderRadius: 2,
  },
});