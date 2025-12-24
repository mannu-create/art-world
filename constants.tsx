
import { User, Event, Photo, BlogPost } from './types';

export const INITIAL_USERS: User[] = [
  {
    id: 'u-1',
    email: 'admin@Artworld Photography.com',
    name: 'Sarah Artworld Photography',
    role: 'ADMIN',
    assignedEventIds: [],
  },
  {
    id: 'u-2',
    email: 'client@example.com',
    name: 'John Doe',
    role: 'USER',
    assignedEventIds: ['e-1', 'e-2'],
  }
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'e-1',
    name: 'Eternal Bliss Wedding',
    date: '2024-05-15',
    type: 'Wedding',
    assignedUserIds: ['u-2'],
    isLocked: false,
    coverPhotoId: 'p-1',
  },
  {
    id: 'e-2',
    name: 'TechCorp Summit 2024',
    date: '2024-06-20',
    type: 'Corporate',
    assignedUserIds: ['u-2'],
    isLocked: true,
    password: 'password123',
  }
];

export const INITIAL_PHOTOS: Photo[] = [
  // Wedding Event (e-1)
  {
    id: 'p-1',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400',
    title: 'The Grand Entrance',
    eventId: 'e-1',
    uploadDate: '2024-05-16',
    dimensions: { width: 1200, height: 800 }
  },
  {
    id: 'p-2',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400',
    title: 'Exchange of Rings',
    eventId: 'e-1',
    uploadDate: '2024-05-16',
    dimensions: { width: 1200, height: 1800 }
  },
  {
    id: 'p-3',
    url: 'https://images.unsplash.com/photo-1465495910483-4c56a45a6c57?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1465495910483-4c56a45a6c57?auto=format&fit=crop&q=80&w=400',
    title: 'First Dance',
    eventId: 'e-1',
    uploadDate: '2024-05-16',
    dimensions: { width: 1200, height: 800 }
  },
  {
    id: 'p-4',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400',
    title: 'Bridal Portrait',
    eventId: 'e-1',
    uploadDate: '2024-05-16',
    dimensions: { width: 1200, height: 1600 }
  },
  {
    id: 'p-5',
    url: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&q=80&w=400',
    title: 'The Bouquet',
    eventId: 'e-1',
    uploadDate: '2024-05-16',
    dimensions: { width: 1200, height: 800 }
  },
  {
    id: 'p-6',
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=400',
    title: 'Sunset Toast',
    eventId: 'e-1',
    uploadDate: '2024-05-16',
    dimensions: { width: 1200, height: 800 }
  },

  // Corporate Event (e-2)
  {
    id: 'p-7',
    url: 'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?auto=format&fit=crop&q=80&w=400',
    title: 'Keynote Speaker',
    eventId: 'e-2',
    uploadDate: '2024-06-21',
    dimensions: { width: 1200, height: 800 }
  },
  {
    id: 'p-8',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400',
    title: 'Networking Session',
    eventId: 'e-2',
    uploadDate: '2024-06-21',
    dimensions: { width: 1200, height: 800 }
  },
  {
    id: 'p-9',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=400',
    title: 'Main Stage View',
    eventId: 'e-2',
    uploadDate: '2024-06-21',
    dimensions: { width: 1200, height: 800 }
  },
  {
    id: 'p-10',
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=400',
    title: 'Technical Panel',
    eventId: 'e-2',
    uploadDate: '2024-06-21',
    dimensions: { width: 1200, height: 800 }
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b-1',
    title: 'The Art of Natural Light in Wedding Photography',
    excerpt: 'Discover how we harness the golden hour to create ethereal, timeless memories for our couples.',
    date: 'March 12, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800',
    category: 'Technique',
    readTime: '5 min read'
  },
  {
    id: 'b-2',
    title: 'Top 5 Corporate Event Venues in Los Angeles',
    excerpt: 'Planning your next summit? We\'ve shot at every major venue and these are our absolute favorites.',
    date: 'February 28, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=800',
    category: 'Planning',
    readTime: '8 min read'
  },
  {
    id: 'b-3',
    title: 'What to Wear to Your Professional Portrait Session',
    excerpt: 'Expert advice on colors, textures, and styles that translate beautifully to the lens.',
    date: 'February 15, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    category: 'Guide',
    readTime: '4 min read'
  }
];
