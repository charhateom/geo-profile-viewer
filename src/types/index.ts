export interface Profile {
  id: number;
  name: string;
  photo: string;
  description: string;
  address: string;
  position: {
    lat: number;
    lng: number;
  };
  email: string;
  phone: string;
  interests: string[];
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface MapPosition {
  lat: number;
  lng: number;
}

export interface SearchFilters {
  query: string;
  location: string;
}