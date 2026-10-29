export type ItemType = 'project' | 'experience' | 'award';

export interface PortfolioItem {
  id: string;
  type: ItemType;
  title: string;
  org?: string;
  category?: string; // topic used for filtering within a folder
  start: string; // YYYY-MM
  end?: string; // YYYY-MM, or "present"; omit for a single month
  description?: string; // one short paragraph
  highlights?: string[]; // bullet points
  tags?: string[];
  images?: string[];
  github?: string;
  links?: { label: string; url: string }[];
}

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  links: { flickr: string; linkedin: string; github: string };
}

export interface Photo {
  id: string;
  title: string;
  width: number;
  height: number;
  small: string;
  large: string;
}

export type Mode = 'live' | 'playback' | 'menu' | 'info' | 'about';
