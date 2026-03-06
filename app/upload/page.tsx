"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/components/AuthProvider";
import { AuthModal } from "@/components/AuthModal";

/* ─── Types ─── */
type AspectRatio = "free" | "1:1" | "4:3" | "16:9" | "3:2" | "9:16";
type Tab = "crop" | "edit" | "details";
type Visibility = "public" | "private";

const ASPECT_OPTIONS: { label: string; value: AspectRatio; icon: string }[] = [
    { label: "Free", value: "free", icon: "crop_free" },
    { label: "1 : 1", value: "1:1", icon: "crop_square" },
    { label: "4 : 3", value: "4:3", icon: "crop_landscape" },
    { label: "16: 9", value: "16:9", icon: "crop_16_9" },
    { label: "3 : 2", value: "3:2", icon: "crop_3_2" },
    { label: "9 :16", value: "9:16", icon: "crop_portrait" },
];

const EXIF_CAMERAS = ["Sony A7R IV", "Canon EOS R5", "Nikon Z7 II", "Fujifilm GFX 100S", "Leica Q2", "Custom"];
const EXIF_LENSES = ["24-70mm f/2.8", "85mm f/1.4", "35mm f/1.8", "100-400mm f/4.5", "16-35mm f/4", "Custom"];

const SUGGESTED_TAGS = [
    "Landscape", "Portrait", "Wildlife", "Architecture", "Street",
    "Macro", "Aerial", "Night", "Golden Hour", "Minimalist",
    "Documentary", "Fashion", "Travel", "Abstract", "Sport",
];

/* ─── Step indicator ─── */
function StepBadge({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) {
    return (
        <div className={`flex items-center gap-2 text-sm font-semibold transition-colors ${active || done ? "text-primary" : "text-white/30"}`}>
            <span className={`size-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${done ? "border-primary bg-primary text-white" : active ? "border-primary bg-primary/20" : "border-white/20"
                }`}>
                {done ? <span className="material-symbols-outlined text-sm">check</span> : n}
            </span>
            <span className="hidden sm:block">{label}</span>
        </div>
    );
}

/* ─── Toggle ─── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={`relative w-11 h-6 rounded-full transition-all ${checked ? "bg-primary" : "bg-white/10"}`}
        >
            <span className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : ""}`} />
        </button>
    );
}

/* ─── Slider ─── */
function AdjustSlider({ label, value, onChange, min = -100, max = 100 }: {
    label: string; value: number; onChange: (v: number) => void; min?: number; max?: number;
}) {
    return (
        <div>
            <div className="flex justify-between text-xs mb-1.5">
                <span className="text-white/50 font-medium">{label}</span>
                <span className={`font-bold tabular-nums ${value !== 0 ? "text-primary" : "text-white/40"}`}>{value > 0 ? "+" : ""}{value}</span>
            </div>
            <div className="relative h-4 flex items-center">
                <div className="absolute left-0 right-0 h-1 bg-white/10 rounded-full" />
                <div
                    className="absolute h-1 bg-primary rounded-full"
                    style={{
                        left: value >= 0 ? "50%" : `${((value - min) / (max - min)) * 100}%`,
                        width: `${(Math.abs(value) / (max - min)) * 100}%`,
                    }}
                />
                <input
                    type="range" min={min} max={max} value={value}
                    onChange={e => onChange(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-4"
                />
            </div>
        </div>
    );
}

/* ─── Published success overlay ─── */
function PublishedOverlay({ title, onClose }: { title: string; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-[#131920] border border-white/10 rounded-3xl p-10 max-w-sm w-full mx-4 text-center shadow-2xl">
                <div className="size-20 rounded-full bg-emerald-500/15 mx-auto flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-emerald-400 text-4xl">check_circle</span>
                </div>
                <h2 className="text-white font-extrabold text-2xl mb-2">Published! 🎉</h2>
                <p className="text-white/50 text-sm mb-2">
                    <span className="text-white font-semibold">"{title}"</span> is now live on your portfolio.
                </p>
                <p className="text-white/30 text-xs mb-8">It will appear in the discovery feed within a few minutes.</p>
                <div className="flex gap-3">
                    <Link href="/" onClick={onClose}
                        className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/85 transition-colors text-center">
                        View in Explore
                    </Link>
                    <button onClick={onClose}
                        className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 font-semibold text-sm hover:bg-white/5 transition-colors">
                        Upload More
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─── Main page ─── */
export default function UploadPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    // Step
    const [step, setStep] = useState<1 | 2>(1);
    const [published, setPublished] = useState(false);

    // File
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Editor tabs in step 2
    const [activeTab, setActiveTab] = useState<Tab>("crop");

    // Crop / Aspect
    const [aspect, setAspect] = useState<AspectRatio>("free");

    // Adjustments
    const [brightness, setBrightness] = useState(0);
    const [contrast, setContrast] = useState(0);
    const [saturation, setSaturation] = useState(0);
    const [sharpness, setSharpness] = useState(0);
    const [vignette, setVignette] = useState(0);
    const [temperature, setTemperature] = useState(0);

    // Device Details (EXIF)
    const [camera, setCamera] = useState("Sony A7R IV");
    const [lens, setLens] = useState("35mm f/1.4");
    const [aperture, setAperture] = useState("f/2.8");
    const [shutter, setShutter] = useState("1/250s");
    const [iso, setIso] = useState("100");
    const [focalLen, setFocalLen] = useState("35mm");
    const [location, setLocation] = useState("");

    // Metadata
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [tags, setTags] = useState<string[]>(["Landscape", "Golden Hour", "Mountains"]);
    const [tagInput, setTagInput] = useState("");
    const [visibility, setVisibility] = useState<Visibility>("public");
    const [watermark, setWatermark] = useState(false);
    const [rightsConfirmed, setRightsConfirmed] = useState(false);
    const [publishError, setPublishError] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    // Computed CSS filter for preview
    const filterStyle = {
        filter: [
            `brightness(${1 + brightness / 100})`,
            `contrast(${1 + contrast / 100})`,
            `saturate(${1 + saturation / 100})`,
        ].join(" "),
    };

    // ── File handling ──
    const handleFile = useCallback((f: File) => {
        setFile(f);
        setPreviewUrl(URL.createObjectURL(f));
        setTitle(f.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
    }, []);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    };

    // ── Tags ──
    const addTag = (t: string) => {
        const clean = t.trim().replace(/,/g, "");
        if (clean && !tags.includes(clean) && tags.length < 15) {
            setTags(prev => [...prev, clean]);
        }
        setTagInput("");
    };

    const removeTag = (t: string) => setTags(prev => prev.filter(x => x !== t));

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(tagInput);
        } else if (e.key === "Backspace" && !tagInput && tags.length) {
            setTags(prev => prev.slice(0, -1));
        }
    };

    // ── Publish ──
    const handlePublish = async () => {
        if (!title.trim()) { setPublishError("Please add a title for your work."); return; }
        if (!rightsConfirmed) { setPublishError("Please confirm you hold the rights to this work."); return; }
        if (!file) { setPublishError("Please upload an image first."); return; }

        setPublishError("");
        setIsUploading(true);

        try {
            // 1. Upload image to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
            const filePath = `public/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            // 3. Save photo data to Postgres Database
            const { error: dbError } = await supabase
                .from('photos')
                .insert([
                    {
                        title: title,
                        image_url: publicUrl,
                        tags: tags,
                        aspect_ratio: aspect,
                        user_name: user?.email?.split('@')[0] || 'Unknown Creator'
                    }
                ]);

            if (dbError) throw dbError;

            // 4. Show success screen
            setPublished(true);
        } catch (error: any) {
            console.error('Error uploading:', error);
            setPublishError(error.message || "Failed to upload. Make sure your 'images' bucket exists and is public.");
        } finally {
            setIsUploading(false);
        }
    };

    // ── Reset to upload more ──
    const handleReset = () => {
        setFile(null); setPreviewUrl(""); setStep(1); setPublished(false);
        setTitle(""); setDesc(""); setTags(["Landscape", "Golden Hour", "Mountains"]);
        setBrightness(0); setContrast(0); setSaturation(0); setSharpness(0); setVignette(0); setTemperature(0);
        setAspect("free"); setRightsConfirmed(false); setPublishError("");
    };

    /* ═══════════════════════════════════════ RENDER ═══════════════ */
    if (authLoading) return <div className="min-h-screen bg-[#0b0f14]" />;

    if (!user) {
        return (
            <div className="bg-[#0b0f14] text-white min-h-screen flex flex-col items-center justify-center p-6">
                <div className="size-20 bg-primary/20 text-primary rounded-3xl flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-4xl">lock</span>
                </div>
                <h1 className="text-3xl font-bold mb-4">Sign in to Upload</h1>
                <p className="text-white/50 text-center max-w-sm mb-8">You must be an authenticated creator to upload new work to the discovery feed.</p>
                <button onClick={() => setIsAuthOpen(true)} className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                    Sign In Now
                </button>
                <Link href="/" className="mt-6 text-white/40 hover:text-white font-semibold transition-colors">
                    Return to Explore
                </Link>
                <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            </div>
        );
    }

    return (
        <div className="bg-[#0b0f14] text-white min-h-screen flex flex-col font-display">

            {/* ── Header ── */}
            <header className="fixed top-0 inset-x-0 z-50 bg-[#0b0f14]/95 backdrop-blur border-b border-white/8 h-16 flex items-center px-6">
                <div className="flex items-center gap-4 flex-1">
                    <Link href="/" className="size-9 flex items-center justify-center rounded-xl hover:bg-white/8 text-white/40 hover:text-white transition-all">
                        <span className="material-symbols-outlined text-xl">close</span>
                    </Link>
                    <div className="h-5 w-px bg-white/10" />
                    <div className="flex items-center gap-2">
                        <div className="size-7 bg-primary rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-sm">camera</span>
                        </div>
                        <h1 className="font-bold tracking-tight">Studio Upload</h1>
                    </div>
                </div>

                {/* Steps */}
                <div className="flex items-center gap-4">
                    <StepBadge n={1} label="Upload Media" active={step === 1} done={step > 1} />
                    <div className="w-8 h-px bg-white/15 hidden sm:block" />
                    <StepBadge n={2} label="Edit & Publish" active={step === 2} done={published} />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-1 justify-end">
                    {step === 2 && (
                        <button
                            onClick={() => {/* save draft */ alert("Draft saved!"); }}
                            className="text-sm font-bold text-white/40 hover:text-white transition-colors px-3 py-2 hidden sm:block"
                        >
                            Save Draft
                        </button>
                    )}
                    {step === 1 ? (
                        <button
                            disabled={!file}
                            onClick={() => { if (file) setStep(2); }}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${file ? "bg-primary text-white hover:bg-primary/85 shadow-lg shadow-primary/20 active:scale-95" : "bg-white/5 text-white/25 cursor-not-allowed"
                                }`}
                        >
                            Continue <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </button>
                    ) : (
                        <button
                            onClick={handlePublish}
                            disabled={isUploading}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all ${isUploading ? 'opacity-70 cursor-wait' : 'hover:bg-primary/85 active:scale-95'}`}
                        >
                            {isUploading ? "Uploading..." : "Publish Work"} <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </button>
                    )}
                </div>
            </header>

            {/* ── STEP 1: Upload ── */}
            {step === 1 && (
                <main className="flex-1 flex flex-col items-center justify-center pt-16 px-6 py-12">
                    <div className="w-full max-w-2xl text-center mb-10">
                        <h2 className="text-4xl font-extrabold tracking-tight mb-3">Start your creative upload</h2>
                        <p className="text-white/40 text-lg">Drag & drop RAW, JPEG, PNG or WEBP. EXIF data is extracted automatically.</p>
                    </div>

                    <div
                        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={handleDrop}
                        onClick={() => !file && fileInputRef.current?.click()}
                        className={`w-full max-w-2xl aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-5 transition-all relative overflow-hidden cursor-pointer group ${dragActive ? "border-primary bg-primary/5" : "border-white/10 hover:border-white/25 hover:bg-white/[0.02]"
                            }`}
                    >
                        <input ref={fileInputRef} type="file" className="hidden" accept="image/*"
                            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

                        {!file ? (
                            <>
                                <div className="size-20 rounded-2xl bg-white/5 group-hover:bg-primary/10 flex items-center justify-center text-white/25 group-hover:text-primary transition-all">
                                    <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                                </div>
                                <div className="text-center">
                                    <p className="text-xl font-bold mb-1">Drop your photo here</p>
                                    <p className="text-white/40 text-sm">or click to browse</p>
                                </div>
                                <div className="flex gap-3">
                                    {["RAW", "JPEG", "PNG", "WEBP"].map(f => (
                                        <span key={f} className="px-3 py-1.5 bg-white/5 border border-white/8 rounded-lg text-xs font-bold text-white/30 uppercase tracking-widest">{f}</span>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <img src={previewUrl} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="relative z-10 flex flex-col items-center gap-4 bg-black/60 rounded-2xl px-8 py-6 backdrop-blur-sm">
                                    <span className="material-symbols-outlined text-5xl text-emerald-400">check_circle</span>
                                    <p className="font-bold text-white text-lg">{file.name}</p>
                                    <p className="text-white/50 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    <button onClick={e => { e.stopPropagation(); setFile(null); setPreviewUrl(""); }}
                                        className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold transition-colors">
                                        Remove & re-upload
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            )}

            {/* ── STEP 2: Edit & Publish ── */}
            {step === 2 && (
                <main className="flex-1 flex pt-16 overflow-hidden h-screen">

                    {/* LEFT: Image preview */}
                    <div className="w-72 xl:w-80 shrink-0 bg-[#0f1318] border-r border-white/8 flex flex-col overflow-hidden">
                        {/* Preview */}
                        <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
                            <div className={`relative overflow-hidden rounded-2xl bg-black shadow-2xl w-full ${aspect === "1:1" ? "aspect-square" :
                                aspect === "4:3" ? "aspect-[4/3]" :
                                    aspect === "16:9" ? "aspect-video" :
                                        aspect === "3:2" ? "aspect-[3/2]" :
                                            aspect === "9:16" ? "aspect-[9/16] max-w-[140px] mx-auto" : "aspect-auto"
                                }`}>
                                <img
                                    src={previewUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDcCBBXhr-PUJSmYCCSjrkUDzMUjulrzIzEJH8fO5cKRZbqe069zsiIm2piuyYqo-wcuV2AsiVNrOyRSIcxJncautHAb3WIbL4nsPw8e985ZuF8UUFZSpe3rC3jXlyAhYwMQmlChkGg0T9ZQy7P4grS5WhMYLVTdSzqPMcHemKy8jzLaTW5eyoLBhORPqYl4WkTTm1ZiO6BRkse_zmRZJpxCY0vNZ2RV3inpxeIiydiEEyxiMayC-mJ-lWvzpm3F4eIUcqGkRQb7fs"}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    style={filterStyle}
                                />
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="border-t border-white/8 flex">
                            {([
                                { id: "crop", icon: "crop", label: "Crop" },
                                { id: "edit", icon: "tune", label: "Edit" },
                                { id: "details", icon: "info", label: "Details" },
                            ] as { id: Tab; icon: string; label: string }[]).map(tab => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-all border-t-2 ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-white/30 hover:text-white"
                                        }`}>
                                    <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab panels */}
                        <div className="border-t border-white/8 overflow-y-auto no-scrollbar bg-[#0b0f14]" style={{ maxHeight: "280px" }}>

                            {/* ── CROP tab ── */}
                            {activeTab === "crop" && (
                                <div className="p-4 space-y-4">
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Aspect Ratio</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {ASPECT_OPTIONS.map(opt => (
                                            <button key={opt.value} onClick={() => setAspect(opt.value)}
                                                className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border transition-all text-xs font-bold ${aspect === opt.value
                                                    ? "border-primary bg-primary/10 text-primary"
                                                    : "border-white/10 text-white/40 hover:border-white/25 hover:text-white"
                                                    }`}>
                                                <span className="material-symbols-outlined text-lg">{opt.icon}</span>
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="pt-2 border-t border-white/8 space-y-2">
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Flip & Rotate</p>
                                        <div className="flex gap-2">
                                            {[
                                                { icon: "flip", label: "Flip H" },
                                                { icon: "flip", label: "Flip V" },
                                                { icon: "rotate_left", label: "Left" },
                                                { icon: "rotate_right", label: "Right" },
                                            ].map(({ icon, label }) => (
                                                <button key={label} title={label}
                                                    className="flex-1 py-2.5 rounded-xl border border-white/10 hover:border-white/25 text-white/40 hover:text-white transition-all flex flex-col items-center gap-0.5">
                                                    <span className="material-symbols-outlined text-base">{icon}</span>
                                                    <span className="text-[9px] font-bold">{label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── EDIT tab ── */}
                            {activeTab === "edit" && (
                                <div className="p-4 space-y-4">
                                    {[
                                        { label: "Brightness", value: brightness, set: setBrightness },
                                        { label: "Contrast", value: contrast, set: setContrast },
                                        { label: "Saturation", value: saturation, set: setSaturation },
                                        { label: "Sharpness", value: sharpness, set: setSharpness },
                                        { label: "Vignette", value: vignette, set: setVignette, min: 0, max: 100 },
                                        { label: "Temperature", value: temperature, set: setTemperature },
                                    ].map(item => (
                                        <AdjustSlider key={item.label} label={item.label} value={item.value}
                                            onChange={item.set} min={item.min} max={item.max} />
                                    ))}
                                    <button
                                        onClick={() => { setBrightness(0); setContrast(0); setSaturation(0); setSharpness(0); setVignette(0); setTemperature(0); }}
                                        className="w-full py-2 rounded-lg border border-white/10 text-white/40 hover:text-white text-xs font-bold transition-colors"
                                    >
                                        Reset All Adjustments
                                    </button>
                                </div>
                            )}

                            {/* ── DETAILS (EXIF) tab ── */}
                            {activeTab === "details" && (
                                <div className="p-4 space-y-3">
                                    {[
                                        { label: "Camera", value: camera, set: setCamera, options: EXIF_CAMERAS, type: "select" },
                                        { label: "Lens", value: lens, set: setLens, options: EXIF_LENSES, type: "select" },
                                        { label: "Aperture", value: aperture, set: setAperture, placeholder: "f/2.8" },
                                        { label: "Shutter", value: shutter, set: setShutter, placeholder: "1/250s" },
                                        { label: "ISO", value: iso, set: setIso, placeholder: "100" },
                                        { label: "Focal", value: focalLen, set: setFocalLen, placeholder: "35mm" },
                                        { label: "Location", value: location, set: setLocation, placeholder: "City, Country" },
                                    ].map(field => (
                                        <div key={field.label}>
                                            <label className="text-white/35 text-[10px] font-bold uppercase tracking-wider block mb-1">{field.label}</label>
                                            {field.type === "select" ? (
                                                <select value={field.value} onChange={e => (field.set as (v: string) => void)(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary/60 appearance-none">
                                                    {(field.options ?? []).map(o => <option key={o} value={o}>{o}</option>)}
                                                </select>
                                            ) : (
                                                <input value={field.value} onChange={e => (field.set as (v: string) => void)(e.target.value)}
                                                    placeholder={field.placeholder}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 transition-colors" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Metadata form */}
                    <div className="flex-1 overflow-y-auto px-8 py-8 no-scrollbar">
                        <div className="max-w-2xl mx-auto space-y-8 pb-16">

                            {/* Title */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Project Title <span className="text-red-400">*</span></label>
                                <input
                                    value={title} onChange={e => setTitle(e.target.value)}
                                    placeholder="Give your work a compelling title…"
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-4 text-xl font-semibold text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 transition-all"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Story & Description</label>
                                <textarea
                                    value={desc} onChange={e => setDesc(e.target.value.slice(0, 500))}
                                    placeholder="Tell the story behind the shot. What inspired you? What challenges did you overcome?"
                                    rows={4}
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 transition-all resize-none"
                                />
                                <p className="mt-1.5 text-xs text-white/25 text-right">{desc.length} / 500</p>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Tags & Keywords</label>

                                {/* Tag chips */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {tags.map(tag => (
                                        <span key={tag}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/30 text-primary rounded-lg text-sm font-semibold">
                                            {tag}
                                            <button onClick={() => removeTag(tag)}
                                                className="hover:text-red-400 transition-colors leading-none">
                                                <span className="material-symbols-outlined text-base">close</span>
                                            </button>
                                        </span>
                                    ))}
                                </div>

                                {/* Input */}
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/25 text-lg">sell</span>
                                    <input
                                        value={tagInput}
                                        onChange={e => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        placeholder={tags.length < 15 ? "Type tag and press Enter or comma…" : "Max 15 tags reached"}
                                        disabled={tags.length >= 15}
                                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 transition-all disabled:opacity-40"
                                    />
                                </div>

                                {/* Suggestions */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    <span className="text-xs text-white/30 font-semibold py-1">Suggestions:</span>
                                    {SUGGESTED_TAGS.filter(t => !tags.includes(t)).slice(0, 8).map(t => (
                                        <button key={t} onClick={() => addTag(t)}
                                            className="px-2.5 py-1 text-xs font-semibold border border-white/10 rounded-full text-white/40 hover:text-primary hover:border-primary/40 transition-all">
                                            + {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Advanced Settings */}
                            <div className="pt-4 border-t border-white/8">
                                <h3 className="text-lg font-bold mb-5">Advanced Settings</h3>
                                <div className="bg-white/[0.03] border border-white/8 rounded-2xl divide-y divide-white/8 overflow-hidden">
                                    {/* Visibility */}
                                    <label className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 shrink-0">
                                                <span className="material-symbols-outlined">public</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">Public Portfolio</p>
                                                <p className="text-xs text-white/40">Visible to anyone searching the platform.</p>
                                            </div>
                                        </div>
                                        <Toggle checked={visibility === "public"} onChange={v => setVisibility(v ? "public" : "private")} />
                                    </label>
                                    <label className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 shrink-0">
                                                <span className="material-symbols-outlined">lock</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">Watermark Protection</p>
                                                <p className="text-xs text-white/40">Adds your signature to shared previews.</p>
                                            </div>
                                        </div>
                                        <Toggle checked={watermark} onChange={setWatermark} />
                                    </label>
                                </div>
                            </div>

                            {/* Rights confirmation */}
                            <div>
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div
                                        onClick={() => setRightsConfirmed(v => !v)}
                                        className={`mt-0.5 size-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${rightsConfirmed ? "bg-primary border-primary" : "border-white/25 hover:border-white/50"
                                            }`}
                                    >
                                        {rightsConfirmed && <span className="material-symbols-outlined text-white text-sm">check</span>}
                                    </div>
                                    <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors leading-relaxed">
                                        I confirm I hold all necessary rights and model releases for this work, and agree to the LensView <a href="#" className="text-primary hover:underline">Terms of Service</a>.
                                    </span>
                                </label>
                            </div>

                            {/* Error */}
                            {publishError && (
                                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-sm font-semibold">
                                    <span className="material-symbols-outlined text-xl shrink-0">error</span>
                                    {publishError}
                                </div>
                            )}

                            {/* Publish button (mobile/bottom) */}
                            <button onClick={handlePublish} disabled={isUploading}
                                className={`w-full py-4 rounded-2xl bg-primary text-white font-bold text-base transition-all shadow-xl shadow-primary/20 ${isUploading ? 'opacity-70 cursor-wait' : 'hover:bg-primary/85 active:scale-[.98]'}`}>
                                {isUploading ? "Publishing to Cloud..." : "Publish Work →"}
                            </button>

                        </div>
                    </div>
                </main>
            )}

            {/* ── Published overlay ── */}
            {published && (
                <PublishedOverlay title={title || "Untitled"} onClose={handleReset} />
            )}
        </div>
    );
}
