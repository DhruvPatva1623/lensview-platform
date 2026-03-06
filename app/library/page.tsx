"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

/* ──────────────────────────────────────────
   DATA
────────────────────────────────────────── */
const COLLECTIONS = ["Landscapes", "Portraits", "Urban", "Wildlife", "Travel"];

const ALL_PHOTOS = [
    {
        id: 1, title: "Desert Spires",
        author: "Alex Chen", status: "Published",
        category: "Landscapes",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuj8KPTSmW03CdTlKlyJlFtjjyO-lIC776eJBQONqXYN5CXpcSRtL9gDfuwoQHTUxQ1UmNl4ysy2ESmBTpeEqFTXe_WVElloI9QFeRTH9vRH7NQi5XF9nn8L8MriIxiJ921T9AsBSc5queFelf9m8wdQLKPcaXO86e_sVaL8v4Z0S1IJ2upz0J8WIULNm-xX4ejG1kE5UteN6Bfn2JkLSX8iS7TIXm3s9mNmUWR9eDt7WHKtWk8FQXqq75xSYMn_BCj8DKo6sZ3_w",
        views: "3.2k", likes: 148, date: "Mar 1, 2026",
    },
    {
        id: 2, title: "Stone Hands",
        author: "Emily Davis", status: "Published",
        category: "Portraits",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwfBFdT13HjOL9uIDWX93kjUgq5wobxCe7KJczGxj69BXxHZt9l2R0fJX1e6kYj-KdyxuBoU13VSZMt94BIlcwJQlDRE8RM9rsyU667jbyPNvtqdT-0GSUV3LjQaB4XQT1CcjkwPqAuNBRFRwKt-Ll2z_Gez1zBcWcjKH-5SXVszE-m5Zz3TbTu7z0j8m2K4rs6QqPbuelhsvH52yMmujlSsYSkx3UA-FOuCvyJ_b1vfRChUtPq8uGFhLnZ-E-A1yO0cRuoaCVzjE",
        views: "1.8k", likes: 94, date: "Mar 2, 2026",
    },
    {
        id: 3, title: "Golden Hour",
        author: "James Park", status: "Published",
        category: "Landscapes",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVtRBkVoktNBeBDHo6mW9xdXu_Eias-hf6E4BDZeldfDIb2GxUYmQ7Odwf3W21toQ29-dsA_0HJ_wew-eyebHuuT-9bqg0DwE5z2YyWGJxI7eITOLqb1qvSheCaZO-GXqMkSP7DqGkQWy8v-DLFUFc-lIhavM3etJPcmjadDA-edg-KM91Go-dsca9ds_57DR20GIthzz_t5iI5LbM_kCZtUrlxcrvfqj4ZWIa9cakYNwI_af8wTOIyUKhxqE5LJNnbIsRw2hLRzs",
        views: "5.1k", likes: 312, date: "Mar 3, 2026",
    },
    {
        id: 4, title: "Deep Dive",
        author: "Lisa Ray", status: "Published",
        category: "Wildlife",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGACEe4JgwSluEDv6w0Q_aO-eAdx4T4e4n1V1SdTT4Oh9kYf_BIR8vb-vkTChfbfRQbi8JGocICZYd8idrYfwfuZiPqoqfzsDUuOiQqO8CXfsalzhVd0cCHdyWNuUiRNU65h3WDiGdFu4fwMXEGC-Dd0hiApypWvkAX3BAcWpnkZLz_BHH2lS_2r4rB_9Ou8ZhlquFa9Vy1y7qr2vyNrlh1ZDpKquYfbr1Crh2DBTQSUEPtkd4_fXwli6T8C3TPOAnqTgt4ZUpvJY",
        views: "2.4k", likes: 201, date: "Mar 3, 2026",
    },
    {
        id: 5, title: "Nordic Silence",
        author: "Jane Smith", status: "Draft",
        category: "Landscapes",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjB9oSgr6pqU-YuSgZyffM88IliyIG5mvzczVO6maHHApOPGeDbGv3TTcdqX2olj3NtOTavUOnIQgJgy6NTfuyPQNeIpgMrdyjZ2y65H05c3evTj1zlC3fvojCx8ILtGkRigyvHZ-tJWba-vMVEoR4PXRHcxPUzhM_aCA6oxMb8hk58jQfRXcz9h_TDJFAVvZaqA-XURej759-xq8lMw4k2M0MQp3ieaby2G7pkxMpqd2izpNVRnJxSPVMUdL_HpgdbgxMuGsXmww",
        views: "720", likes: 45, date: "Mar 4, 2026",
    },
    {
        id: 6, title: "Night City",
        author: "Marcus T.", status: "Published",
        category: "Urban",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPInDQeQCXFIps3qudMCYryhISxDA5cWH85OkBKaevjzmkFm76gy9HpZZXR82TnjTJy6ysu75Qk79XdwrY_N48-zwtF77IbU8Ki2Kw9kl4zWCMd8w0agega73GzHurwZRXq-DxmASdLSTpffl8XpjVFeMS_tyPDwOeAqFQkTy0H50l_wO-XpgjDA7nL6Nj5yj8o1yK7yn_WR7Kwp7_ZsRIfrhxCU3W-ouTgVO9RuLsqRAcN1d0O9IVA9bj-S6qJgl1o3E7mlG8DzY",
        views: "6.7k", likes: 445, date: "Mar 4, 2026",
    },
    {
        id: 7, title: "Mountain Peak",
        author: "Chris Evans", status: "Published",
        category: "Landscapes",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-Ivr1-E8jRUyfRUNyI6RMjzRSlyCWjmHdCiloEjyrNH_cAWvI1-6ahZT5FOcjLyoL2aVheJ53KarUhmEveAhbChyarr7AmkXtv5DTDfhv5fPudf8iVGK8i4jeXZHfjiwQW6YAkc2QoAXoSQWNTNT12OfRkKdjpclqRaqLlZzScqTqRLf9Vq4YilP_v3QYLPYIyU4VzVFjwE6y-NvlLLt_kM168bhei-_nNSvCCY5YUUAryvFp4g7fCdf3Em4VYnzmPkDYcNn1ggk",
        views: "4.3k", likes: 318, date: "Mar 5, 2026",
    },
    {
        id: 8, title: "Urban Maze",
        author: "Sarah Lee", status: "Draft",
        category: "Urban",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZfCexmNHlT_Oay_QrleOYjTwNXeBayCR7UKbAPeN7AbzKxeZAZ-bW2ZY5v4sMRIKK94DWaiz_ROncgd9EYGwZMClWT0MKEUgzJ0eLqdovHCV1_76IM_mKzon8VL_rG_OYBtOD0__43iTnKxGB15b5MDhzArA_C9ROwEC25QJdoKFDaMBTBCkl3cO6jYn5SG1-eABC5iKcWnF43GAZRMac6_FMyleQHVayFTFgwLrb40Os1lWYr7cuHnFSN4z-hv6cCKHqm9RsvEc",
        views: "980", likes: 77, date: "Mar 5, 2026",
    },
];

const SORT_OPTIONS = ["Date Uploaded", "Most Liked", "Most Viewed", "Title A–Z"];

/* ──────────────────────────────────────────
   QUICK EDIT PANEL
────────────────────────────────────────── */
function QuickEditPanel({ photo, onClose }: { photo: typeof ALL_PHOTOS[0]; onClose: () => void }) {
    const [title, setTitle] = useState(photo.title);
    const [status, setStatus] = useState(photo.status);

    return (
        <div className="w-80 shrink-0 bg-[#0f1318] border-l border-white/8 flex flex-col h-full overflow-y-auto">
            {/* header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                <span className="text-white font-bold text-sm">Quick Edit</span>
                <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
            </div>
            {/* thumb */}
            <div className="p-5">
                <div className="rounded-xl overflow-hidden aspect-video bg-white/5 mb-5">
                    <img src={photo.img} alt={photo.title} className="w-full h-full object-cover" />
                </div>
                {/* fields */}
                <div className="space-y-4">
                    <div>
                        <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-1.5">Title</label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/60 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-1.5">Status</label>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/60 transition-colors appearance-none"
                        >
                            <option value="Published">Published</option>
                            <option value="Draft">Draft</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-1.5">Author</label>
                        <input
                            defaultValue={photo.author}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/60 transition-colors"
                        />
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="bg-white/5 rounded-lg p-3 text-center">
                            <span className="material-symbols-outlined text-primary text-sm block mb-1">visibility</span>
                            <span className="text-white font-bold text-sm block">{photo.views}</span>
                            <span className="text-white/40 text-[10px]">Views</span>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 text-center">
                            <span className="material-symbols-outlined text-red-400 text-sm block mb-1">favorite</span>
                            <span className="text-white font-bold text-sm block">{photo.likes}</span>
                            <span className="text-white/40 text-[10px]">Likes</span>
                        </div>
                    </div>
                    {/* adjustments */}
                    <div className="pt-2 border-t border-white/8">
                        <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-3">Adjustments</label>
                        {[
                            { label: "Brightness", defaultVal: 50 },
                            { label: "Contrast", defaultVal: 50 },
                            { label: "Saturation", defaultVal: 55 },
                            { label: "Sharpness", defaultVal: 30 },
                        ].map(({ label, defaultVal }) => (
                            <div key={label} className="mb-3">
                                <div className="flex justify-between text-xs text-white/50 mb-1">
                                    <span>{label}</span>
                                    <span>{defaultVal}</span>
                                </div>
                                <input type="range" min="0" max="100" defaultValue={defaultVal}
                                    className="w-full h-1 accent-primary rounded-full cursor-pointer" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* actions */}
            <div className="mt-auto px-5 py-4 border-t border-white/8 flex gap-3">
                <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5 transition-colors">
                    Cancel
                </button>
                <button className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────
   PHOTO CARD
────────────────────────────────────────── */
function PhotoCard({
    photo, selected, onSelect, onEdit,
}: {
    photo: typeof ALL_PHOTOS[0];
    selected: boolean;
    onSelect: () => void;
    onEdit: () => void;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={`relative rounded-xl overflow-hidden group cursor-pointer border-2 transition-all duration-200 ${selected ? "border-primary shadow-lg shadow-primary/20" : "border-transparent"}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Image */}
            <div className="aspect-[4/3] bg-white/5 overflow-hidden">
                <img
                    src={photo.img}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Hover overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 transition-opacity duration-200 ${hovered || selected ? "opacity-100" : "opacity-0"}`}>
                {/* Top controls */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <button
                        onClick={(e) => { e.stopPropagation(); onSelect(); }}
                        className={`size-6 rounded border-2 transition-all flex items-center justify-center ${selected ? "bg-primary border-primary" : "border-white/60 bg-black/30 hover:border-white"}`}
                    >
                        {selected && <span className="material-symbols-outlined text-white text-sm">check</span>}
                    </button>
                    <div className="flex gap-1.5">
                        <button onClick={(e) => { e.stopPropagation(); onEdit(); }}
                            className="size-7 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary/80 transition-colors">
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <Link href="/photo" onClick={(e) => e.stopPropagation()}
                            className="size-7 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </Link>
                    </div>
                </div>
                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-bold text-sm truncate">{photo.title}</p>
                    <p className="text-white/60 text-xs">{photo.author}</p>
                </div>
            </div>

            {/* Status badge */}
            <div className={`absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-md ${photo.status === "Published"
                    ? "bg-emerald-500/90 text-white"
                    : "bg-amber-500/90 text-white"
                }`}>
                <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {photo.status === "Published" ? "check_circle" : "edit_note"}
                </span>
                {photo.status}
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────
   MAIN PAGE
────────────────────────────────────────── */
export default function LibraryPage() {
    const { theme, toggle } = useTheme();
    const [activeSection, setActiveSection] = useState<"All Photos" | "Recent" | string>("All Photos");
    const [activeCollection, setActiveCollection] = useState<string | null>(null);
    const [collections, setCollections] = useState(COLLECTIONS);
    const [selected, setSelected] = useState<number[]>([]);
    const [editingPhoto, setEditingPhoto] = useState<typeof ALL_PHOTOS[0] | null>(null);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("Date Uploaded");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showNewCollection, setShowNewCollection] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    /* Filter & sort */
    const filtered = useMemo(() => {
        let arr = [...ALL_PHOTOS];
        if (activeSection === "Recent") arr = arr.slice(-4).reverse();
        if (activeCollection) arr = arr.filter(p => p.category === activeCollection);
        if (search.trim()) arr = arr.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.author.toLowerCase().includes(search.toLowerCase())
        );
        if (sortBy === "Most Liked") arr.sort((a, b) => b.likes - a.likes);
        if (sortBy === "Most Viewed") arr.sort((a, b) => parseInt(b.views) - parseInt(a.views));
        if (sortBy === "Title A–Z") arr.sort((a, b) => a.title.localeCompare(b.title));
        return arr;
    }, [activeSection, activeCollection, search, sortBy]);

    const allSelected = filtered.length > 0 && selected.length === filtered.length;

    const toggleSelect = (id: number) =>
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

    const toggleAll = () =>
        setSelected(allSelected ? [] : filtered.map(p => p.id));

    const handleAddCollection = () => {
        if (newCollectionName.trim()) {
            setCollections(prev => [...prev, newCollectionName.trim()]);
            setNewCollectionName("");
            setShowNewCollection(false);
        }
    };

    const sectionTitle = activeCollection ?? activeSection;

    return (
        <div className="flex h-screen bg-[#0b0f14] text-white overflow-hidden font-display">

            {/* ── SIDEBAR ── */}
            <aside className="w-56 shrink-0 bg-[#0f1318] border-r border-white/8 flex flex-col select-none">
                {/* Logo */}
                <div className="px-5 py-5 flex items-center gap-3">
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-primary/30">
                        <span className="material-symbols-outlined text-white text-lg">camera</span>
                    </div>
                    <span className="text-white font-bold text-base tracking-tight">LensView</span>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 pt-1 overflow-y-auto no-scrollbar">
                    {/* Library section */}
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-2 mb-2">Library</p>
                    {(["All Photos", "Recent"] as const).map(sec => (
                        <button
                            key={sec}
                            onClick={() => { setActiveSection(sec); setActiveCollection(null); }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold mb-1 transition-all ${activeSection === sec && !activeCollection
                                    ? "bg-primary/15 text-primary"
                                    : "text-white/50 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: activeSection === sec && !activeCollection ? "'FILL' 1" : "'FILL' 0" }}>
                                {sec === "All Photos" ? "photo_library" : "schedule"}
                            </span>
                            {sec}
                        </button>
                    ))}

                    {/* Collections */}
                    <div className="mt-5 mb-2 flex items-center justify-between px-2">
                        <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Collections</p>
                        <button
                            onClick={() => setShowNewCollection(true)}
                            className="text-white/30 hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined text-base">add</span>
                        </button>
                    </div>
                    {showNewCollection && (
                        <div className="px-2 mb-2 flex gap-1">
                            <input
                                autoFocus
                                value={newCollectionName}
                                onChange={e => setNewCollectionName(e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter") handleAddCollection(); if (e.key === "Escape") setShowNewCollection(false); }}
                                placeholder="Name…"
                                className="flex-1 bg-white/5 border border-white/15 rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:border-primary/60"
                            />
                            <button onClick={handleAddCollection} className="px-2 py-1 bg-primary rounded-md text-white text-xs font-bold hover:bg-primary/80">
                                OK
                            </button>
                        </div>
                    )}
                    {collections.map(col => (
                        <button
                            key={col}
                            onClick={() => { setActiveCollection(col); setActiveSection(""); }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium mb-0.5 transition-all ${activeCollection === col
                                    ? "bg-primary/15 text-primary"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <span className="material-symbols-outlined text-[16px]">folder</span>
                            {col}
                        </button>
                    ))}
                </nav>

                {/* User footer */}
                <div className="border-t border-white/8 px-4 py-4 flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">N</div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-bold truncate">LensView</p>
                        <p className="text-white/30 text-[10px]">Pro Plan</p>
                    </div>
                    <Link href="/settings">
                        <span className="material-symbols-outlined text-white/30 hover:text-white transition-colors text-lg cursor-pointer">settings</span>
                    </Link>
                </div>
            </aside>

            {/* ── MAIN ── */}
            <div className="flex flex-1 min-w-0 flex-col">

                {/* Top bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 shrink-0">
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-bold text-white">{sectionTitle}</h1>
                        <span className="text-primary text-sm font-semibold bg-primary/10 px-2.5 py-0.5 rounded-full">
                            {filtered.length} items
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Theme toggle */}
                        <button onClick={toggle} className="p-2 rounded-lg hover:bg-white/8 text-white/40 hover:text-white transition-all" title="Toggle theme">
                            <span className="material-symbols-outlined text-lg">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
                        </button>
                        {selected.length > 0 && (
                            <>
                                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 text-sm font-semibold transition-colors border border-white/10">
                                    <span className="material-symbols-outlined text-sm">edit</span> Bulk Edit
                                </button>
                                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 text-sm font-semibold transition-colors border border-white/10">
                                    <span className="material-symbols-outlined text-sm">drive_file_move</span> Move
                                </button>
                                <button
                                    onClick={() => setDeleteConfirm(true)}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-semibold transition-colors border border-red-500/20">
                                    <span className="material-symbols-outlined text-sm">delete</span> Delete
                                </button>
                            </>
                        )}
                        <Link href="/upload"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 ml-1">
                            <span className="material-symbols-outlined text-base">cloud_upload</span> Upload New
                        </Link>
                    </div>
                </div>

                {/* Filter bar */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-white/8 shrink-0 bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div
                                onClick={toggleAll}
                                className={`size-5 rounded border-2 transition-all flex items-center justify-center cursor-pointer ${allSelected ? "bg-primary border-primary" : "border-white/25 hover:border-white/50"}`}
                            >
                                {allSelected && <span className="material-symbols-outlined text-white text-sm">check</span>}
                            </div>
                            <span className="text-white/50 text-sm group-hover:text-white transition-colors">Select All</span>
                        </label>
                        {selected.length > 0 && (
                            <span className="text-primary text-xs font-semibold">{selected.length} selected</span>
                        )}
                        <div className="flex items-center gap-2">
                            <span className="text-white/30 text-sm">Sort by</span>
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary/60 transition-colors appearance-none pr-7 cursor-pointer"
                            >
                                {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* View toggle */}
                        <div className="flex items-center bg-white/5 rounded-lg p-0.5 border border-white/8">
                            <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white/10 text-white" : "text-white/30 hover:text-white"}`}>
                                <span className="material-symbols-outlined text-base">grid_view</span>
                            </button>
                            <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-white/10 text-white" : "text-white/30 hover:text-white"}`}>
                                <span className="material-symbols-outlined text-base">view_list</span>
                            </button>
                        </div>
                        {/* Search */}
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 material-symbols-outlined text-base">search</span>
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search library…"
                                className="w-52 pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                            {search && (
                                <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                                    <span className="material-symbols-outlined text-base">close</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content area */}
                <div className="flex flex-1 min-h-0">
                    {/* Photo grid / list */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-white/30">
                                <span className="material-symbols-outlined text-6xl mb-4">photo_library</span>
                                <p className="text-lg font-semibold">No photos found</p>
                                <p className="text-sm mt-1">Try a different filter or upload something new.</p>
                            </div>
                        ) : viewMode === "grid" ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {filtered.map(photo => (
                                    <PhotoCard
                                        key={photo.id}
                                        photo={photo}
                                        selected={selected.includes(photo.id)}
                                        onSelect={() => toggleSelect(photo.id)}
                                        onEdit={() => setEditingPhoto(photo)}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* LIST VIEW */
                            <div className="space-y-2">
                                {filtered.map(photo => (
                                    <div key={photo.id} className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer hover:bg-white/5 ${selected.includes(photo.id) ? "border-primary/40 bg-primary/5" : "border-white/8"}`}>
                                        <button
                                            onClick={() => toggleSelect(photo.id)}
                                            className={`size-5 rounded border-2 transition-all flex items-center justify-center shrink-0 ${selected.includes(photo.id) ? "bg-primary border-primary" : "border-white/25 hover:border-white/50"}`}
                                        >
                                            {selected.includes(photo.id) && <span className="material-symbols-outlined text-white text-sm">check</span>}
                                        </button>
                                        <div className="size-12 rounded-lg overflow-hidden shrink-0">
                                            <img src={photo.img} alt={photo.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-semibold text-sm truncate">{photo.title}</p>
                                            <p className="text-white/40 text-xs">{photo.author} • {photo.date}</p>
                                        </div>
                                        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${photo.status === "Published" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>
                                            {photo.status}
                                        </span>
                                        <div className="flex gap-2 text-white/30 text-xs shrink-0">
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">visibility</span>{photo.views}</span>
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">favorite</span>{photo.likes}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <button onClick={() => setEditingPhoto(photo)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/30 hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined text-base">edit</span>
                                            </button>
                                            <Link href="/photo" className="p-1.5 rounded-lg hover:bg-white/10 text-white/30 hover:text-white transition-colors">
                                                <span className="material-symbols-outlined text-base">open_in_new</span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Edit Panel */}
                    {editingPhoto && (
                        <QuickEditPanel photo={editingPhoto} onClose={() => setEditingPhoto(null)} />
                    )}
                </div>
            </div>

            {/* Delete confirm dialog */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#161b22] border border-white/10 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
                        <div className="size-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 mb-5">
                            <span className="material-symbols-outlined text-3xl">delete</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">Delete {selected.length} photo{selected.length > 1 ? "s" : ""}?</h3>
                        <p className="text-white/50 text-sm mb-6">This action cannot be undone. These photos will be permanently removed from your library.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 font-semibold hover:bg-white/5 transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => { setSelected([]); setDeleteConfirm(false); }} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
