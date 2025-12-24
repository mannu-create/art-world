
export type Role = 'ADMIN' | 'USER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  assignedEventIds: string[];
}

export interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  description?: string;
  eventId: string;
  uploadDate: string;
  tags?: string[];
  dimensions: { width: number; height: number };
}

export interface Event {
  id: string;
  name: string;
  date: string;
  type: string; // Wedding, Birthday, Corporate, etc.
  coverPhotoId?: string;
  assignedUserIds: string[];
  isLocked: boolean;
  password?: string;
  expiryDate?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  category: string;
  readTime: string;
}

export interface DownloadStat {
  id: string;
  photoId: string;
  userId: string;
  timestamp: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
