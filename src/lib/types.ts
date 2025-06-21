export interface Artwork {
  id: string;
  title: string;
  year: number;
  imageUrl: string;
  description: string;
  'data-ai-hint': string;
}

export interface Artist {
  id: string;
  name: string;
  email: string;
  phone: string;
  disciplines: string[];
  bio: string;
  artworks: Artwork[];
  profilePictureUrl: string;
}

export interface Minute {
  id: string;
  date: string;
  title: string;
  content: string;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  description: string;
}
