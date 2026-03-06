"use client";

import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/utils/supabase';
import { useEffect, useState } from 'react';
import { EditProfileModal, ProfileData } from '@/components/EditProfileModal';

export default function ProfilePage() {
    const { user, refreshProfile, loading: authLoading } = useAuth();
    const [userPhotos, setUserPhotos] = useState<any[]>([]);
    const [likedPhotos, setLikedPhotos] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'portfolio' | 'liked'>('portfolio');
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [realTotalLikes, setRealTotalLikes] = useState(0);

    const handleDeletePhoto = async (e: React.MouseEvent, photoId: string) => {
        e.preventDefault(); // Stop Link navigation
        if (!confirm("Are you sure you want to permanently delete this photo?")) return;

        try {
            const { error } = await supabase.from('photos').delete().eq('id', photoId);
            if (error) throw error;

            setUserPhotos(prev => prev.filter(p => p.id !== photoId));
            // Just refresh data to update counts accurately
            fetchAllData();
        } catch (error) {
            console.error("Error deleting photo:", error);
            alert("Failed to delete photo. Check your connection or permissions.");
        }
    };

    const fetchAllData = async () => {
        try {
            if (!user) {
                setLoading(false);
                return;
            }

            // Fetch User profile logic
            const { data: profile, error: profileErr } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profile) setProfileData(profile);

            try { await refreshProfile(); } catch (e) { console.error('refresh error', e); }

            // Fetch Photos uploaded by user
            const baseUserName = user.email?.split('@')[0] || "";
            const { data: photosData, error } = await supabase
                .from('photos')
                .select('*')
                .eq('user_name', baseUserName)
                .order('created_at', { ascending: false });

            if (!error && photosData) {
                setUserPhotos(photosData);

                // Get real sum of likes from DB for these photos
                if (photosData.length > 0) {
                    const photoIds = photosData.map(p => p.id);
                    const { count: likesCount } = await supabase
                        .from('likes')
                        .select('id', { count: 'exact', head: true })
                        .in('photo_id', photoIds);

                    setRealTotalLikes(likesCount || 0);
                }
            }

            // Fetch Liked Photos
            const { data: likesData } = await supabase
                .from('likes')
                .select('photo_id')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (likesData && likesData.length > 0) {
                // Ensure we only look for valid UUID format photos (since test photos have numbers as IDs)
                const realPhotoIds = likesData.map(l => l.photo_id).filter(id => id.length > 10);

                if (realPhotoIds.length > 0) {
                    const { data: likedPhotosData } = await supabase
                        .from('photos')
                        .select('*')
                        .in('id', realPhotoIds);

                    if (likedPhotosData) {
                        // Order liked photos chronologically by the time they liked it (since 'in' query mixes up order)
                        const sortedLikedPhotos = realPhotoIds
                            .map(id => likedPhotosData.find(p => p.id === id))
                            .filter(Boolean);

                        setLikedPhotos(sortedLikedPhotos as any[]);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!authLoading) fetchAllData();
    }, [user, authLoading]);

    if (authLoading || loading) {
        return (
            <div className="bg-[#0b0f14] min-h-screen flex items-center justify-center">
                <div className="size-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="bg-[#0b0f14] min-h-screen flex flex-col items-center justify-center text-white">
                <span className="material-symbols-outlined text-6xl text-white/20 mb-4">account_circle</span>
                <h1 className="text-2xl font-bold">Please sign in</h1>
                <p className="text-white/50 mb-6 mt-2">You must be logged in to view your profile.</p>
                <Link href="/" className="px-6 py-2 bg-primary rounded-xl font-bold">Return Home</Link>
            </div>
        );
    }

    const userName = profileData?.full_name || user.email?.split('@')[0] || "Photographer";

    return (
        <div className="bg-background-dark text-slate-100 font-display min-h-screen antialiased">
            <EditProfileModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                initialData={profileData}
                onSave={fetchAllData}
            />
            {/* Navigation */}
            <header className="fixed top-0 inset-x-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
                <Link href="/" className="pointer-events-auto bg-black/40 backdrop-blur-md rounded-full px-5 py-2 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2 font-bold text-sm">
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span>Explore</span>
                </Link>
                <div className="pointer-events-auto flex gap-3">
                    <button className="size-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                        <span className="material-symbols-outlined text-sm">share</span>
                    </button>
                    <button className="size-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                        <span className="material-symbols-outlined text-sm">more_horiz</span>
                    </button>
                </div>
            </header>

            {/* Hero Header */}
            <section className="relative w-full h-[50vh] min-h-[400px] animate-fade-in-up">
                {/* Cover Photo */}
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        alt="Cover"
                        src="https://images.unsplash.com/photo-1542051812-ba32e18ce6a3?q=80&w=2000&auto=format&fit=crop"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
                </div>

                {/* Profile Info overlaying the gradient */}
                <div className="absolute bottom-0 inset-x-0 px-6 lg:px-20 pb-12 translate-y-16">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end gap-6 justify-between">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                            <div className="size-32 md:size-40 rounded-full overflow-hidden border-4 border-background-dark bg-slate-800 shrink-0">
                                {profileData?.avatar_url ? (
                                    <img className="w-full h-full object-cover" alt="User Avatar" src={profileData.avatar_url} />
                                ) : (
                                    <img className="w-full h-full object-cover" alt="User Avatar" src={`https://www.gravatar.com/avatar/${user.id}?d=retro&s=200`} />
                                )}
                            </div>
                            <div className="mb-2">
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center justify-center md:justify-start gap-3">
                                    {userName}
                                    <span className="material-symbols-outlined text-primary text-2xl" title="Verified Creator">verified</span>
                                </h1>
                                <p className="text-slate-400 mt-2 font-medium max-w-lg">
                                    {profileData?.description || "No bio added yet. Click 'Edit Profile' to add your story."}
                                </p>

                                {profileData?.skills && profileData.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                                        {profileData.skills.map((skill, index) => (
                                            <span key={index} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-semibold text-white/50">{skill}</span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-sm font-bold">
                                    {profileData?.location && (
                                        <span className="flex items-center gap-1.5 text-slate-300">
                                            <span className="material-symbols-outlined text-slate-500 text-[18px]">location_on</span>
                                            {profileData.location}
                                        </span>
                                    )}
                                    {profileData?.website && (
                                        <a href={profileData.website.startsWith('http') ? profileData.website : `https://${profileData.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
                                            <span className="material-symbols-outlined text-[18px]">link</span>
                                            {profileData.website.replace(/^https?:\/\//, '')}
                                        </a>
                                    )}
                                    <span className="flex items-center gap-1.5 text-slate-300">
                                        <span className="material-symbols-outlined text-slate-500 text-[18px]">mail</span>
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center md:justify-end gap-4 shrink-0 px-6 md:px-0">
                            <button
                                onClick={() => setIsEditOpen(true)}
                                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur border border-white/10 px-8 py-3 rounded-full font-bold transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats & Nav */}
            <section className="mt-28 mb-12 px-6 lg:px-20 animate-fade-in-up delay-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/10 pb-6">
                    <div className="flex gap-8 md:gap-12">
                        <div className="text-center md:text-left">
                            <p className="text-3xl font-black">{userPhotos.length}</p>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Uploaded</p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-3xl font-black">
                                {realTotalLikes > 0 ? realTotalLikes : userPhotos.reduce((total, p) => total + (p.likes || 0), 0)}
                            </p>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Total Likes</p>
                        </div>
                    </div>

                    <nav className="flex items-center gap-6 text-sm font-bold overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        <button onClick={() => setActiveTab('portfolio')} className={`py-2 px-1 relative transition-colors ${activeTab === 'portfolio' ? 'text-white border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300'}`}>Portfolio</button>
                        <button onClick={() => setActiveTab('liked')} className={`py-2 px-1 relative transition-colors ${activeTab === 'liked' ? 'text-white border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300'}`}>Liked <span className="text-xs text-slate-500 ml-1">({likedPhotos.length})</span></button>
                        <button className="text-slate-500 hover:text-slate-300 py-2 px-1 transition-colors">Collections</button>
                        <button className="text-slate-500 hover:text-slate-300 py-2 px-1 transition-colors">About</button>
                    </nav>
                </div>
            </section>

            {/* Portfolio Grid */}
            <main className="px-6 lg:px-20 pb-20 animate-fade-in-up delay-200">
                <div className="max-w-7xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                    {(() => {
                        const photosToRender = activeTab === 'portfolio' ? userPhotos : likedPhotos;

                        if (photosToRender.length === 0) {
                            return (
                                <div className="col-span-full py-20 text-center text-white/40">
                                    <span className="material-symbols-outlined text-6xl mb-4">{activeTab === 'portfolio' ? 'photo_library' : 'favorite_border'}</span>
                                    <p className="text-lg">{activeTab === 'portfolio' ? "You haven't uploaded any photos yet." : "You haven't liked any photos yet."}</p>
                                    <Link href={activeTab === 'portfolio' ? "/upload" : "/"} className="inline-block mt-4 text-primary font-bold hover:underline">
                                        {activeTab === 'portfolio' ? "Upload your first shot" : "Discover photos to like"}
                                    </Link>
                                </div>
                            );
                        }

                        return photosToRender.map((photo: any) => (
                            <Link href={`/photo/${photo.id}`} key={photo.id} className="break-inside-avoid relative group cursor-zoom-in block">
                                <div className="rounded-xl overflow-hidden bg-slate-800">
                                    <img
                                        className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                                        alt={photo.title || "Photo"}
                                        src={photo.image_url}
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-bold truncate text-sm">{photo.title || "Untitled"}</p>
                                                <p className="text-xs text-slate-300 capitalize">{photo.aspect_ratio || "Image"}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                {activeTab === 'portfolio' && (
                                                    <button onClick={(e) => handleDeletePhoto(e, photo.id)} className="bg-red-500/20 hover:bg-red-500/80 px-2 py-1 rounded-full flex items-center justify-center backdrop-blur transition-colors text-white mt-2">
                                                        <span className="material-symbols-outlined text-sm">delete</span>
                                                    </button>
                                                )}
                                                <div className="bg-white/20 px-3 py-1 rounded-full flex items-center justify-center backdrop-blur transition-colors text-xs font-bold gap-1 mt-2">
                                                    <span className="material-symbols-outlined text-sm text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ));
                    })()}
                </div>
            </main>
        </div>
    );
}
