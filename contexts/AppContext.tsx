import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Attraction, User, AudioTour } from '@/types';
import { mockAttractions, mockUser, mockAudioTours } from '@/data/mockData';

interface AppContextType {
  user: User;
  attractions: Attraction[];
  audioTours: AudioTour[];
  updateUserPoints: (points: number) => void;
  toggleBookmark: (attractionId: string) => void;
  unlockAudioTour: (tourId: string, pointsCost: number) => boolean;
  addScannedQrCode: (attractionId: string, pointsAwarded: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(mockUser);
  const [attractions, setAttractions] = useState<Attraction[]>(mockAttractions);
  const [audioTours, setAudioTours] = useState<AudioTour[]>(mockAudioTours);

  const updateUserPoints = (points: number) => {
    setUser(prev => ({
      ...prev,
      points: prev.points + points,
      level: Math.floor((prev.points + points) / 100) + 1,
    }));
  };

  const toggleBookmark = (attractionId: string) => {
    setAttractions(prev =>
      prev.map(attraction =>
        attraction.id === attractionId
          ? { ...attraction, isBookmarked: !attraction.isBookmarked }
          : attraction
      )
    );

    setUser(prev => ({
      ...prev,
      bookmarkedPlaces: prev.bookmarkedPlaces.includes(attractionId)
        ? prev.bookmarkedPlaces.filter(id => id !== attractionId)
        : [...prev.bookmarkedPlaces, attractionId],
    }));
  };

  const unlockAudioTour = (tourId: string, pointsCost: number): boolean => {
    if (user.points >= pointsCost) {
      setUser(prev => ({
        ...prev,
        points: prev.points - pointsCost,
        unlockedAudioTours: [...prev.unlockedAudioTours, tourId],
      }));

      setAudioTours(prev =>
        prev.map(tour =>
          tour.id === tourId ? { ...tour, isUnlocked: true } : tour
        )
      );

      return true;
    }
    return false;
  };

  const addScannedQrCode = (attractionId: string, pointsAwarded: number) => {
    if (!user.scannedQrCodes.includes(attractionId)) {
      setUser(prev => ({
        ...prev,
        points: prev.points + pointsAwarded,
        level: Math.floor((prev.points + pointsAwarded) / 100) + 1,
        scannedQrCodes: [...prev.scannedQrCodes, attractionId],
      }));
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        attractions,
        audioTours,
        updateUserPoints,
        toggleBookmark,
        unlockAudioTour,
        addScannedQrCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}