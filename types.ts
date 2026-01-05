
export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  category: string;
  url: string;
  coverUrl: string;
}

export interface CarouselImage {
  id: string;
  url: string;
  title: string;
  subtitle: string;
}

export enum ViewMode {
  Public = 'public',
  Admin = 'admin'
}
