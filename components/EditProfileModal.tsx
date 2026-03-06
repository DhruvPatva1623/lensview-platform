"use client";

import { useState, useRef } from "react";
import { supabase } from "@/utils/supabase";

export type ProfileData = {
    full_name?: string;
    description?: string;
    website?: string;
    location?: string;
    skills?: string[];
    avatar_url?: string;
};

export function EditProfileModal({
    isOpen,
    onClose,
    initialData,
    onSave
}: {
    isOpen: boolean;
    onClose: () => void;
    initialData?: ProfileData | null;
    onSave: () => void;
}) {
    const [fullName, setFullName] = useState(initialData?.full_name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [website, setWebsite] = useState(initialData?.website || "");
    const [location, setLocation] = useState(initialData?.location || "");
    const [skillsText, setSkillsText] = useState(initialData?.skills?.join(", ") || "");

    // Avatar logic
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>(initialData?.avatar_url || "");
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [saturation, setSaturation] = useState(100);
    const [vignette, setVignette] = useState(0); // 0 to 100
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setError("You must be logged in.");
            setLoading(false);
            return;
        }

        const skillsArray = skillsText.split(",").map(s => s.trim()).filter(Boolean);

        try {
            let finalAvatarUrl = initialData?.avatar_url || "";

            // If user selected a new image, draw it to canvas to crop and apply filters
            if (avatarFile && canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.src = avatarPreview;

                await new Promise((resolve, reject) => {
                    img.onload = async () => {
                        // Square crop
                        const size = Math.min(img.width, img.height);
                        canvas.width = size;
                        canvas.height = size;
                        const startX = (img.width - size) / 2;
                        const startY = (img.height - size) / 2;

                        if (ctx) {
                            ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
                            ctx.drawImage(img, startX, startY, size, size, 0, 0, size, size);

                            // Apply Vignette overlay (vintage edges) if set
                            if (vignette > 0) {
                                const gradient = ctx.createRadialGradient(
                                    size / 2, size / 2, size * (1 - vignette / 150), // Inner radius
                                    size / 2, size / 2, size / 1.1                   // Outer radius
                                );
                                gradient.addColorStop(0, 'rgba(0,0,0,0)');
                                gradient.addColorStop(1, `rgba(0,0,0,${vignette / 100})`);

                                ctx.filter = 'none'; // reset filter so gradient draws cleanly
                                ctx.fillStyle = gradient;
                                ctx.fillRect(0, 0, size, size);
                            }

                            canvas.toBlob(async (blob) => {
                                if (!blob) return reject("Canvas generated empty blob");

                                const fileName = `avatars/${user.id}_${Date.now()}.jpg`;
                                const { error: uploadError } = await supabase.storage
                                    .from('images')
                                    .upload(fileName, blob, { contentType: 'image/jpeg' });

                                if (uploadError) return reject(uploadError);

                                const { data: { publicUrl } } = supabase.storage
                                    .from('images')
                                    .getPublicUrl(fileName);

                                finalAvatarUrl = publicUrl;
                                resolve(true);
                            }, 'image/jpeg', 0.9);
                        } else {
                            resolve(true);
                        }
                    };
                    img.onerror = () => reject("Image failed to load");
                });
            }

            const { error: upsertError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id, // Primary key links to auth.users
                    full_name: fullName,
                    description: description,
                    website: website,
                    location: location,
                    skills: skillsArray,
                    avatar_url: finalAvatarUrl,
                    updated_at: new Date().toISOString(),
                });

            if (upsertError) throw upsertError;

            onSave();
            onClose();
        } catch (err: any) {
            setError(err.message || "Failed to update profile. Did you run the SQL query to create the profiles table in Supabase?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 pt-10 pb-10 overflow-y-auto">
            <div className="bg-[#131920] border border-white/10 rounded-3xl p-8 max-w-lg w-full relative shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)] my-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 size-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-black text-white mb-2">Edit Profile</h2>
                    <p className="text-white/50 text-sm">Customize how you appear to the community.</p>
                </div>

                <form onSubmit={handleSave} className="space-y-4 text-left">
                    {/* Avatar Upload Container */}
                    <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="relative size-24 shrink-0 rounded-full overflow-hidden border-2 border-white/10 bg-black">
                            {avatarPreview ? (
                                <>
                                    <img
                                        src={avatarPreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover relative z-10"
                                        style={{ filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)` }}
                                    />
                                    {/* CSS Vignette Overlay for Preview */}
                                    <div
                                        className="absolute inset-0 pointer-events-none z-20"
                                        style={{
                                            background: `radial-gradient(circle, rgba(0,0,0,0) ${100 - (vignette / 1.5)}%, rgba(0,0,0,${vignette / 100}) 100%)`
                                        }}
                                    />
                                </>
                            ) : (
                                <span className="material-symbols-outlined text-4xl text-white/30 absolute inset-0 flex items-center justify-center">person</span>
                            )}
                        </div>
                        <div className="flex-1 w-full space-y-3">
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-bold transition-colors">
                                    Choose Photo
                                </button>
                                <span className="text-xs text-white/40">Square auto-crop</span>
                                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                            </div>

                            {avatarFile && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-white/40 text-sm">light_mode</span>
                                        <input type="range" min="50" max="150" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-white/40 text-sm">contrast</span>
                                        <input type="range" min="50" max="150" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-white/40 text-sm">palette</span>
                                        <input type="range" min="0" max="200" value={saturation} onChange={(e) => setSaturation(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                                    </div>
                                    {/* Vignette slider */}
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-white/40 text-sm">blur_circular</span>
                                        <input type="range" min="0" max="100" value={vignette} onChange={(e) => setVignette(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <canvas ref={canvasRef} className="hidden" />

                    <div>
                        <label className="text-xs font-bold text-white/60 uppercase tracking-widest pl-1">Display Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Victor Kane"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-white/60 uppercase tracking-widest pl-1">Bio / Description</label>
                        <textarea
                            placeholder="Tell us about yourself and your photography..."
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 transition-colors resize-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest pl-1">Location</label>
                            <input
                                type="text"
                                placeholder="e.g. Tokyo, Japan"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest pl-1">Website</label>
                            <input
                                type="text"
                                placeholder="e.g. yoursite.com"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-white/60 uppercase tracking-widest pl-1">Skills / Focus (comma separated)</label>
                        <input
                            type="text"
                            placeholder="e.g. Portraits, Street, Canon"
                            value={skillsText}
                            onChange={(e) => setSkillsText(e.target.value)}
                            className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                    </div>

                    {error && <p className="text-sm text-red-400 p-3 bg-red-400/10 rounded-lg max-w-full break-words">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 transition-all ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/80 active:scale-[.98] mt-2"}`}
                    >
                        {loading ? "Saving..." : "Save Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}
