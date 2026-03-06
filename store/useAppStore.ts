import { create } from 'zustand';

interface Photo {
    id: string;
    url: string;
    likes: number;
    likedByMe: boolean;
    savedByMe: boolean;
    author: string;
    avatar: string;
    category: string;
}

interface AppState {
    photos: Photo[];
    toggleLike: (id: string) => void;
    toggleSave: (id: string) => void;
    setPhotos: (photos: Photo[]) => void;
}

// Mock initial data
const MOCK_PHOTOS = [
    { id: '1', url: 'https://images.unsplash.com/photo-1682687982501-1e58f813f2f8?q=80&w=600&auto=format&fit=crop', likes: 124, likedByMe: false, savedByMe: false, author: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?u=1', category: 'Cinematic' },
    { id: '2', url: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=600&auto=format&fit=crop', likes: 89, likedByMe: true, savedByMe: false, author: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=2', category: 'Landscape' },
    { id: '3', url: 'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=600&auto=format&fit=crop', likes: 256, likedByMe: false, savedByMe: true, author: 'Mike Ross', avatar: 'https://i.pravatar.cc/150?u=3', category: 'Architectural' },
    { id: '4', url: 'https://images.unsplash.com/photo-1707305316315-0f04f86d8c47?q=80&w=600&auto=format&fit=crop', likes: 45, likedByMe: false, savedByMe: false, author: 'Emily Davis', avatar: 'https://i.pravatar.cc/150?u=4', category: 'Portrait' },
    { id: '5', url: 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=600&auto=format&fit=crop', likes: 1024, likedByMe: true, savedByMe: true, author: 'David Kim', avatar: 'https://i.pravatar.cc/150?u=5', category: 'Nature' },
    { id: '6', url: 'https://images.unsplash.com/photo-1707343844152-5d33a18a5989?q=80&w=600&auto=format&fit=crop', likes: 78, likedByMe: false, savedByMe: false, author: 'Lisa Ray', avatar: 'https://i.pravatar.cc/150?u=6', category: 'Cinematic' },
    { id: '7', url: 'https://images.unsplash.com/photo-1682687982185-531d09ec56fc?q=80&w=600&auto=format&fit=crop', likes: 12, likedByMe: false, savedByMe: false, author: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=7', category: 'Architectural' },
    { id: '8', url: 'https://images.unsplash.com/photo-1682685796184-2e7bb0810aa7?q=80&w=600&auto=format&fit=crop', likes: 412, likedByMe: false, savedByMe: false, author: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=8', category: 'Portrait' },
];

export const useAppStore = create<AppState>((set) => ({
    photos: MOCK_PHOTOS,
    setPhotos: (photos) => set({ photos }),

    toggleLike: (id) => set((state) => ({
        photos: state.photos.map(p => {
            if (p.id === id) {
                return { ...p, likedByMe: !p.likedByMe, likes: p.likedByMe ? p.likes - 1 : p.likes + 1 };
            }
            return p;
        })
    })),

    toggleSave: (id) => set((state) => ({
        photos: state.photos.map(p => {
            if (p.id === id) {
                return { ...p, savedByMe: !p.savedByMe };
            }
            return p;
        })
    }))
}));
