export interface Attraction {
  id: string;
  name: string;
  category: 'restaurant' | 'museum' | 'historical' | 'park' | 'entertainment' | 'shopping';
  description: string;
  address: string;
  rating: number;
  distance: number;
  imageUrl: string;
  latitude: number;
  longitude: number;
  hasQrCode: boolean;
  isBookmarked: boolean;
  pointsReward: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  level: number;
  scannedQrCodes: string[];
  bookmarkedPlaces: string[];
  unlockedAudioTours: string[];
}

export interface AudioTour {
  id: string;
  title: string;
  description: string;
  duration: string;
  pointsCost: number;
  isUnlocked: boolean;
  imageUrl: string;
  previewUrl?: string;
  fullUrl?: string;
}

export interface QrCodeReward {
  id: string;
  attractionId: string;
  title: string;
  description: string;
  pointsAwarded: number;
  discountPercentage?: number;
  validUntil: string;
}