"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── types ─── */
interface Board {
    id: number;
    title: string;
    visibility: "Public" | "Private";
    items: number;
    covers: string[];
}

/* ─── seed data ─── */
const SEED_BOARDS: Board[] = [
    {
        id: 1, title: "Golden Hour Inspiration", visibility: "Public", items: 42,
        covers: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDTcxfpAgZe0qKXxfbFaD5KV2KpF7TYQ0FKAv84L2Pf_6KuN5luzNX0FQCPzn8dCL8WMzMICt-Qas_USXbH0vI4vhQraVi-27F5jXC5OdALZFi2Y1UDIKQgzErjfrWtQ1G1BL4E8AiitUcbxE-OWH-aKL9j-Y24tvqRFGCVzzL_0EcCfTgNbsx0TbI24c9-1pX-RkuCFVTFlA5z5IjY9Fo5UmsaYIBhm8j2YIiAq2zzbNGthgDGoQY7AgWMj4ehepnB-V13WYXF5Yg",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAZnS8bbErO1XqH5yOUUSpcCtaJBNz2L08UIU4vxzlIgHbeCJVxS4LJvUVRo9BO3o5qzKNMf1NxlvBRo8F8zt9f7pUFDlLU7-07NUJJsrZ1l7qDvjBWCYsEkq2XXn9id2Ux121Ofe2tgg13i1jOsAvFMWoOQfwzFHWoFuKK4ozg_3LxdM9PBQosk1O7kB_-qYthjF9hbv5OQEbXx2SAW8XB_E3Jp84oZLNmgJXHjQAx_qwUQrhSZNO55d2To92mqbZSQfM6Vpr0rLM",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDcCBBXhr-PUJSmYCCSjrkUDzMUjulrzIzEJH8fO5cKRZbqe069zsiIm2piuyYqo-wcuV2AsiVNrOyRSIcxJncautHAb3WIbL4nsPw8e985ZuF8UUFZSpe3rC3jXlyAhYwMQmlChkGg0T9ZQy7P4grS5WhMYLVTdSzqPMcHemKy8jzLaTW5eyoLBhORPqYl4WkTTm1ZiO6BRkse_zmRZJpxCY0vNZ2RV3inpxeIiydiEEyxiMayC-mJ-lWvzpm3F4eIUcqGkRQb7fs",
        ],
    },
    {
        id: 2, title: "Urban Architecture", visibility: "Private", items: 15,
        covers: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCbmeMwGQiMYruvkXMFJmE85k83iO80FI-ceKv0zbMaAWJIJIqGZ0P0Dgexv3wShymQRzC4zXf_zFUB8vDL3XR0DSGc-fLQwCKLiXXIzqbt-gc7Rh-7ngLjinbqk8PuhjfgQQLiyZKqESkYXVhwZc1W7NSUmH85CCwpCcCHe6EgKEvPouXp1-tIx77ggDyneYXZyxTMt9LnQ_NrhFx6qOaXnI1aS_nmP_Rf6NxpIbz7OuZCpxMsxzSLy_wpdBoDy5fVFPEVchdb7Vw",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBXjLSJopsCs-vaSHHMuWJqvaNQmkdlorG5I9PRIa_2NFsJ5faVwDw_72oHGdmIiOIn4G6S-S6Va5J6OJlJKFz3mL6EiERd3GYcYHxCCqCcz0vHx_eMRBJm2X3ss41qCn1eKVNXs8dxF5cFQuN7mgqBPOpqAzeE9S8n6V2eCAnkLQDkJViiANQTOvsrcm16VpSM2FA3sCShDtf483uAFLN3H1gKejUYMoyqMwF2NS_Z4j18ubr-noQfz-UkwxjH-p_CVSB7_KzH1Oc",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCWM1kKT2BiHg6jbTWLM_e23xVnSCnstSML7ybbvmeMH5SZTiRKwIi9t9HdW2likQnZpHWNY3SWkr83DNVkqlXAva2Nj-roGjQ1UdQ6TO-GV6r3LKe3C4JfybS55-cpJjP0UPE3TqJ3_KlCC75tazY-YTmaC3E7KGc-zK--haqdEKMi-OA9FmrzbaD30_1pb4s4q1WcCJe5dsQinBrh3Ak2MUtfs7FC2TkFdUZfi35IjXmD5qMST4koQcK9sCksZOJ4p62W54TKkeg",
        ],
    },
    {
        id: 3, title: "Cinematic Portraits", visibility: "Public", items: 28,
        covers: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCwfBFdT13HjOL9uIDWX93kjUgq5wobxCe7KJczGxj69BXxHZt9l2R0fJX1e6kYj-KdyxuBoU13VSZMt94BIlcwJQlDRE8RM9rsyU667jbyPNvtqdT-0GSUV3LjQaB4XQT1CcjkwPqAuNBRFRwKt-Ll2z_Gez1zBcWcjKH-5SXVszE-m5Zz3TbTu7z0j8m2K4rs6QqPbuelhsvH52yMmujlSsYSkx3UA-FOuCvyJ_b1vfRChUtPq8uGFhLnZ-E-A1yO0cRuoaCVzjE",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAVtRBkVoktNBeBDHo6mW9xdXu_Eias-hf6E4BDZeldfDIb2GxUYmQ7Odwf3W21toQ29-dsA_0HJ_wew-eyebHuuT-9bqg0DwE5z2YyWGJxI7eITOLqb1qvSheCaZO-GXqMkSP7DqGkQWy8v-DLFUFc-lIhavM3etJPcmjadDA-edg-KM91Go-dsca9ds_57DR20GIthzz_t5iI5LbM_kCZtUrlxcrvfqj4ZWIa9cakYNwI_af8wTOIyUKhxqE5LJNnbIsRw2hLRzs",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDjB9oSgr6pqU-YuSgZyffM88IliyIG5mvzczVO6maHHApOPGeDbGv3TTcdqX2olj3NtOTavUOnIQgJgy6NTfuyPQNeIpgMrdyjZ2y65H05c3evTj1zlC3fvojCx8ILtGkRigyvHZ-tJWba-vMVEoR4PXRHcxPUzhM_aCA6oxMb8hk58jQfRXcz9h_TDJFAVvZaqA-XURej759-xq8lMw4k2M0MQp3ieaby2G7pkxMpqd2izpNVRnJxSPVMUdL_HpgdbgxMuGsXmww",
        ],
    },
    {
        id: 4, title: "Night Street Edit", visibility: "Private", items: 9,
        covers: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAPInDQeQCXFIps3qudMCYryhISxDA5cWH85OkBKaevjzmkFm76gy9HpZZXR82TnjTJy6ysu75Qk79XdwrY_N48-zwtF77IbU8Ki2Kw9kl4zWCMd8w0agega73GzHurwZRXq-DxmASdLSTpffl8XpjVFeMS_tyPDwOeAqFQkTy0H50l_wO-XpgjDA7nL6Nj5yj8o1yK7yn_WR7Kwp7_ZsRIfrhxCU3W-ouTgVO9RuLsqRAcN1d0O9IVA9bj-S6qJgl1o3E7mlG8DzY",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCZfCexmNHlT_Oay_QrleOYjTwNXeBayCR7UKbAPeN7AbzKxeZAZ-bW2ZY5v4sMRIKK94DWaiz_ROncgd9EYGwZMClWT0MKEUgzJ0eLqdovHCV1_76IM_mKzon8VL_rG_OYBtOD0__43iTnKxGB15b5MDhzArA_C9ROwEC25QJdoKFDaMBTBCkl3cO6jYn5SG1-eABC5iKcWnF43GAZRMac6_FMyleQHVayFTFgwLrb40Os1lWYr7cuHnFSN4z-hv6cCKHqm9RsvEc",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD-Ivr1-E8jRUyfRUNyI6RMjzRSlyCWjmHdCiloEjyrNH_cAWvI1-6ahZT5FOcjLyoL2aVheJ53KarUhmEveAhbChyarr7AmkXtv5DTDfhv5fPudf8iVGK8i4jeXZHfjiwQW6YAkc2QoAXoSQWNTNT12OfRkKdjpclqRaqLlZzScqTqRLf9Vq4YilP_v3QYLPYIyU4VzVFjwE6y-NvlLLt_kM168bhei-_nNSvCCY5YUUAryvFp4g7fCdf3Em4VYnzmPkDYcNn1ggk",
        ],
    },
];

/* ─── Cover mosaic ─── */
function BoardCover({ covers, extra = 0 }: { covers: string[]; extra?: number }) {
    return (
        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 flex gap-1 p-1 group-hover:p-0 transition-all duration-300">
            <div className="w-2/3 h-full rounded-l-xl overflow-hidden">
                <img src={covers[0]} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="w-1/3 flex flex-col gap-1">
                <div className="h-1/2 rounded-tr-xl overflow-hidden">
                    <img src={covers[1]} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="h-1/2 rounded-br-xl overflow-hidden relative">
                    <img src={covers[2]} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {extra > 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">+{extra}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─── Context menu ─── */
function BoardMenu({ onRename, onToggleVis, onDelete, vis }: {
    onRename: () => void; onToggleVis: () => void; onDelete: () => void; vis: string;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setOpen(v => !v); }}
                className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all">
                <span className="material-symbols-outlined">more_horiz</span>
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 w-44 bg-[#1a2030] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden">
                        {[
                            { icon: "edit", label: "Rename", action: onRename },
                            { icon: vis === "Public" ? "lock" : "public", label: vis === "Public" ? "Make Private" : "Make Public", action: onToggleVis },
                            { icon: "delete", label: "Delete Board", action: onDelete, danger: true },
                        ].map(item => (
                            <button key={item.label} onClick={(e) => { e.stopPropagation(); setOpen(false); item.action(); }}
                                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors ${item.danger ? "text-red-400 hover:bg-red-500/10" : "text-white/70 hover:bg-white/5 hover:text-white"}`}>
                                <span className="material-symbols-outlined text-base">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

/* ─── Create Board Modal ─── */
function CreateBoardModal({ onClose, onCreate }: {
    onClose: () => void;
    onCreate: (name: string, vis: "Public" | "Private", desc: string) => void;
}) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [vis, setVis] = useState<"Public" | "Private">("Public");
    const [error, setError] = useState("");

    const handleCreate = () => {
        if (!name.trim()) { setError("Board name is required."); return; }
        onCreate(name.trim(), vis, desc.trim());
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="w-full max-w-md bg-[#131920] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-xl">view_quilt</span>
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-base">Create New Board</h2>
                            <p className="text-white/40 text-xs">Curate and organise your inspirations</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="size-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-4">
                    {/* Name */}
                    <div>
                        <label className="text-white/50 text-xs font-bold uppercase tracking-wider block mb-1.5">
                            Board Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            autoFocus
                            value={name}
                            onChange={e => { setName(e.target.value); setError(""); }}
                            onKeyDown={e => e.key === "Enter" && handleCreate()}
                            placeholder="e.g. Nordic Landscapes, Film Noir…"
                            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors ${error ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-primary/60"}`}
                        />
                        {error && (
                            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">error</span>{error}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-white/50 text-xs font-bold uppercase tracking-wider block mb-1.5">Description <span className="text-white/20">(optional)</span></label>
                        <textarea
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            placeholder="What's this board about?"
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-primary/60 transition-colors resize-none"
                        />
                    </div>

                    {/* Visibility */}
                    <div>
                        <label className="text-white/50 text-xs font-bold uppercase tracking-wider block mb-2">Visibility</label>
                        <div className="grid grid-cols-2 gap-3">
                            {(["Public", "Private"] as const).map(v => (
                                <button key={v} onClick={() => setVis(v)}
                                    className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${vis === v ? "border-primary bg-primary/10 text-white" : "border-white/10 hover:border-white/25 text-white/50 hover:text-white"}`}>
                                    <span className="material-symbols-outlined text-xl shrink-0" style={{ fontVariationSettings: `'FILL' ${vis === v ? 1 : 0}` }}>
                                        {v === "Public" ? "public" : "lock"}
                                    </span>
                                    <div>
                                        <p className="font-bold text-sm">{v}</p>
                                        <p className="text-[10px] opacity-60">{v === "Public" ? "Anyone can view" : "Only you"}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/8 flex gap-3">
                    <button onClick={onClose}
                        className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5 hover:text-white transition-all">
                        Cancel
                    </button>
                    <button onClick={handleCreate}
                        className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/85 active:scale-95 transition-all shadow-lg shadow-primary/20">
                        Create Board
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─── Rename Modal ─── */
function RenameModal({ board, onClose, onRename }: {
    board: Board; onClose: () => void; onRename: (id: number, name: string) => void;
}) {
    const [name, setName] = useState(board.title);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="w-full max-w-sm bg-[#131920] border border-white/10 rounded-2xl shadow-2xl p-6">
                <h2 className="text-white font-bold text-base mb-4">Rename Board</h2>
                <input autoFocus value={name} onChange={e => setName(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { onRename(board.id, name); onClose(); } }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/60 transition-colors mb-4" />
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5 transition-colors">Cancel</button>
                    <button onClick={() => { onRename(board.id, name); onClose(); }} className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/85 transition-colors">Save</button>
                </div>
            </div>
        </div>
    );
}

/* ─── Main Page ─── */
export default function BoardsPage() {
    const [boards, setBoards] = useState<Board[]>(SEED_BOARDS);
    const [showCreate, setShowCreate] = useState(false);
    const [renaming, setRenaming] = useState<Board | null>(null);
    const [deleting, setDeleting] = useState<Board | null>(null);
    const [sortBy, setSortBy] = useState<"name" | "items">("name");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const sorted = [...boards].sort((a, b) =>
        sortBy === "items" ? b.items - a.items : a.title.localeCompare(b.title)
    );

    const handleCreate = (name: string, vis: "Public" | "Private", desc: string) => {
        const newBoard: Board = {
            id: Date.now(), title: name, visibility: vis, items: 0,
            covers: [
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDjB9oSgr6pqU-YuSgZyffM88IliyIG5mvzczVO6maHHApOPGeDbGv3TTcdqX2olj3NtOTavUOnIQgJgy6NTfuyPQNeIpgMrdyjZ2y65H05c3evTj1zlC3fvojCx8ILtGkRigyvHZ-tJWba-vMVEoR4PXRHcxPUzhM_aCA6oxMb8hk58jQfRXcz9h_TDJFAVvZaqA-XURej759-xq8lMw4k2M0MQp3ieaby2G7pkxMpqd2izpNVRnJxSPVMUdL_HpgdbgxMuGsXmww",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCwfBFdT13HjOL9uIDWX93kjUgq5wobxCe7KJczGxj69BXxHZt9l2R0fJX1e6kYj-KdyxuBoU13VSZMt94BIlcwJQlDRE8RM9rsyU667jbyPNvtqdT-0GSUV3LjQaB4XQT1CcjkwPqAuNBRFRwKt-Ll2z_Gez1zBcWcjKH-5SXVszE-m5Zz3TbTu7z0j8m2K4rs6QqPbuelhsvH52yMmujlSsYSkx3UA-FOuCvyJ_b1vfRChUtPq8uGFhLnZ-E-A1yO0cRuoaCVzjE",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBGACEe4JgwSluEDv6w0Q_aO-eAdx4T4e4n1V1SdTT4Oh9kYf_BIR8vb-vkTChfbfRQbi8JGocICZYd8idrYfwfuZiPqoqfzsDUuOiQqO8CXfsalzhVd0cCHdyWNuUiRNU65h3WDiGdFu4fwMXEGC-Dd0hiApypWvkAX3BAcWpnkZLz_BHH2lS_2r4rB_9Ou8ZhlquFa9Vy1y7qr2vyNrlh1ZDpKquYfbr1Crh2DBTQSUEPtkd4_fXwli6T8C3TPOAnqTgt4ZUpvJY",
            ],
        };
        setBoards(prev => [newBoard, ...prev]);
    };

    const handleRename = (id: number, name: string) =>
        setBoards(prev => prev.map(b => b.id === id ? { ...b, title: name } : b));

    const handleToggleVis = (id: number) =>
        setBoards(prev => prev.map(b => b.id === id ? { ...b, visibility: b.visibility === "Public" ? "Private" : "Public" } : b));

    const handleDelete = (id: number) =>
        setBoards(prev => prev.filter(b => b.id !== id));

    return (
        <div className="min-h-screen bg-[#0b0f14] text-white font-display">
            {/* Top Nav */}
            <header className="glass-nav sticky top-0 z-40 px-6 lg:px-10 py-4">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="size-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
                                <span className="material-symbols-outlined text-white text-lg">camera</span>
                            </div>
                            <span className="text-white font-bold hidden sm:block">LensView</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
                            {[["Explore", "/"], ["Library", "/library"], ["Community", "/community"], ["Analytics", "/dashboard"]].map(([label, href]) => (
                                <Link key={label} href={href} className="text-white/50 hover:text-white transition-colors">{label}</Link>
                            ))}
                            <Link href="/boards" className="text-primary">Boards</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setShowCreate(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/85 transition-all shadow-lg shadow-primary/20 active:scale-95">
                            <span className="material-symbols-outlined text-base">add</span>
                            New Board
                        </button>
                        <Link href="/profile" className="size-9 rounded-full overflow-hidden border-2 border-white/10 hover:border-primary transition-all">
                            <img src="https://ui-avatars.com/api/?name=LensView&background=13a4ec&color=fff" alt="Profile" className="w-full h-full object-cover" />
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
                {/* Page header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                    <div>
                        <nav className="flex items-center gap-2 text-sm text-white/40 mb-3">
                            <Link href="/profile" className="hover:text-primary transition-colors">Profile</Link>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span className="text-white/70">Mood Boards</span>
                        </nav>
                        <h1 className="text-4xl font-extrabold tracking-tight">Inspiration Mood Boards</h1>
                        <p className="mt-2 text-white/40 max-w-lg">
                            Curate and organize your visual references, aesthetic directions, and project mood boards in one place.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="text-white/30 text-sm">{boards.length} boards</span>
                        <div className="h-4 w-px bg-white/10" />
                        {/* Sort */}
                        <select value={sortBy} onChange={e => setSortBy(e.target.value as "name" | "items")}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none appearance-none cursor-pointer">
                            <option value="name">Name A–Z</option>
                            <option value="items">Most Items</option>
                        </select>
                        {/* View toggle */}
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                            <button onClick={() => setViewMode("grid")} className={`p-2 transition-colors ${viewMode === "grid" ? "bg-white/10 text-white" : "text-white/30 hover:text-white"}`}>
                                <span className="material-symbols-outlined text-base">grid_view</span>
                            </button>
                            <button onClick={() => setViewMode("list")} className={`p-2 transition-colors ${viewMode === "list" ? "bg-white/10 text-white" : "text-white/30 hover:text-white"}`}>
                                <span className="material-symbols-outlined text-base">view_list</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Board grid */}
                {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Create card */}
                        <button onClick={() => setShowCreate(true)}
                            className="group relative flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-primary/60 rounded-2xl p-10 transition-all bg-transparent hover:bg-primary/5 aspect-[4/3] cursor-pointer active:scale-98">
                            <div className="size-16 rounded-2xl bg-white/5 group-hover:bg-primary/15 flex items-center justify-center text-white/30 group-hover:text-primary transition-all mb-4">
                                <span className="material-symbols-outlined text-3xl">add</span>
                            </div>
                            <span className="font-bold text-lg text-white/60 group-hover:text-white transition-colors">Create New Board</span>
                            <span className="mt-1 text-sm text-white/30">Start a new curation</span>
                        </button>

                        {/* Board cards */}
                        {sorted.map(board => (
                            <div key={board.id} className="group">
                                <Link href={`/boards/${board.id}`} className="block cursor-pointer">
                                    <BoardCover covers={board.covers} extra={board.items > 3 ? board.items - 3 : 0} />
                                </Link>
                                <div className="mt-4 flex items-start justify-between">
                                    <Link href={`/boards/${board.id}`} className="min-w-0 flex-1">
                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors truncate pr-2">
                                            {board.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className="text-sm font-semibold text-white/40">{board.items} Items</span>
                                            <span className="size-1 bg-white/20 rounded-full" />
                                            <div className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${board.visibility === "Private" ? "text-primary" : "text-white/40"}`}>
                                                <span className="material-symbols-outlined text-sm">{board.visibility === "Public" ? "public" : "lock"}</span>
                                                {board.visibility}
                                            </div>
                                        </div>
                                    </Link>
                                    <BoardMenu
                                        vis={board.visibility}
                                        onRename={() => setRenaming(board)}
                                        onToggleVis={() => handleToggleVis(board.id)}
                                        onDelete={() => setDeleting(board)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* LIST VIEW */
                    <div className="space-y-2">
                        <button onClick={() => setShowCreate(true)}
                            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                            <div className="size-10 rounded-xl bg-white/5 group-hover:bg-primary/15 flex items-center justify-center text-white/30 group-hover:text-primary transition-all">
                                <span className="material-symbols-outlined">add</span>
                            </div>
                            <span className="font-bold text-white/50 group-hover:text-primary transition-colors">Create New Board</span>
                        </button>
                        {sorted.map(board => (
                            <div key={board.id} className="flex items-center gap-4 p-4 rounded-xl border border-white/8 hover:bg-white/5 hover:border-white/15 transition-all group">
                                <Link href={`/boards/${board.id}`} className="size-14 rounded-xl overflow-hidden shrink-0 block">
                                    <img src={board.covers[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                </Link>
                                <Link href={`/boards/${board.id}`} className="flex-1 min-w-0 block">
                                    <h3 className="font-bold text-white group-hover:text-primary transition-colors truncate">{board.title}</h3>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs text-white/40">{board.items} items</span>
                                        <span className="size-1 bg-white/15 rounded-full" />
                                        <span className={`text-xs font-bold flex items-center gap-0.5 ${board.visibility === "Private" ? "text-primary" : "text-white/40"}`}>
                                            <span className="material-symbols-outlined text-xs">{board.visibility === "Public" ? "public" : "lock"}</span>
                                            {board.visibility}
                                        </span>
                                    </div>
                                </Link>
                                <BoardMenu
                                    vis={board.visibility}
                                    onRename={() => setRenaming(board)}
                                    onToggleVis={() => handleToggleVis(board.id)}
                                    onDelete={() => setDeleting(board)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Load more */}
                <div className="mt-16 flex flex-col items-center gap-2">
                    <button className="px-10 py-3.5 rounded-full border border-white/10 hover:bg-white/5 text-white/70 font-bold transition-all hover:border-white/25 text-sm">
                        Load More Boards
                    </button>
                    <p className="text-xs text-white/25">Showing {boards.length} boards</p>
                </div>
            </div>

            {/* Modals */}
            {showCreate && <CreateBoardModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />}
            {renaming && <RenameModal board={renaming} onClose={() => setRenaming(null)} onRename={handleRename} />}

            {/* Delete confirm */}
            {deleting && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={(e) => e.target === e.currentTarget && setDeleting(null)}>
                    <div className="w-full max-w-sm bg-[#131920] border border-white/10 rounded-2xl p-7 shadow-2xl">
                        <div className="size-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 mb-5">
                            <span className="material-symbols-outlined text-3xl">delete</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">Delete "{deleting.title}"?</h3>
                        <p className="text-white/40 text-sm mb-6">This will permanently delete the board and all its saved references. This cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleting(null)} className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 font-semibold hover:bg-white/5 transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => { handleDelete(deleting.id); setDeleting(null); }}
                                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors active:scale-95">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
