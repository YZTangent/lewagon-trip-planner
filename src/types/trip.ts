export type Mood = 'adventurous' | 'relaxed' | 'romantic' | 'cultural' | 'party';

export interface TripRequest {
  mood: Mood;
  budget: number;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  estimatedCost: number;
  imageUrl: string;
  activities: string[];
}

export interface TripResponse {
  destinations: Destination[];
}