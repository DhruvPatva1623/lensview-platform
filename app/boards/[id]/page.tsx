"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

/* ─── All boards data (same as boards/page.tsx) ─── */
const ALL_BOARDS = [
    {
        id: 1, title: "Golden Hour Inspiration", visibility: "Public", items: 42,
        desc: "A curated selection of golden hour photography from around the world — warm tones, dramatic shadows, and breathtaking light.",
        covers: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDTcxfpAgZe0qKXxfbFaD5KV2KpF7TYQ0FKAv84L2Pf_6KuN5luzNX0FQCPzn8dCL8WMzMICt-Qas_USXbH0vI4vhQraVi-27F5jXC5OdALZFi2Y1UDIKQgzErjfrWtQ1G1BL4E8AiitUcbxE-OWH-aKL9j-Y24tvqRFGCVzzL_0EcCfTgNbsx0TbI24c9-1pX-RkuCFVTFlA5z5IjY9Fo5UmsaYIBhm8j2YIiAq2zzbNGthgDGoQY7AgWMj4ehepnB-V13WYXF5Yg",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAZnS8bbErO1XqH5yOUUSpcCtaJBNz2L08UIU4vxzlIgHbeCJVxS4LJvUVRo9BO3o5qzKNMf1NxlvBRo8F8zt9f7pUFDlLU7-07NUJJsrZ1l7qDvjBWCYsEkq2XXn9id2Ux121Ofe2tgg13i1jOsAvFMWoOQfwzFHWoFuKK4ozg_3LxdM9PBQosk1O7kB_-qYthjF9hbv5OQEbXx2SAW8XB_E3Jp84oZLNmgJXHjQAx_qwUQrhSZNO55d2To92mqbZSQfM6Vpr0rLM",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDcCBBXhr-PUJSmYCCSjrkUDzMUjulrzIzEJH8fO5cKRZbqe069zsiIm2piuyYqo-wcuV2AsiVNrOyRSIcxJncautHAb3WIbL4nsPw8e985ZuF8UUFZSpe3rC3jXlyAhYwMQmlChkGg0T9ZQy7P4grS5WhMYLVTdSzqPMcHemKy8jzLaTW5eyoLBhORPqYl4WkTTm1ZiO6BRkse_zmRZJpxCY0vNZ2RV3inpxeIiydiEEyxiMayC-mJ-lWvzpm3F4eIUcqGkRQb7fs",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAVtRBkVoktNBeBDHo6mW9xdXu_Eias-hf6E4BDZeldfDIb2GxUYmQ7Odwf3W21toQ29-dsA_0HJ_wew-eyebHuuT-9bqg0DwE5z2YyWGJxI7eITOLqb1qvSheCaZO-GXqMkSP7DqGkQWy8v-DLFUFc-lIhavM3etJPcmjadDA-edg-KM91Go-dsca9ds_57DR20GIthzz_t5iI5LbM_kCZtUrlxcrvfqj4ZWIa9cakYNwI_af8wTOIyUKhxqE5LJNnbIsRw2hLRzs",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDjB9oSgr6pqU-YuSgZyffM88IliyIG5mvzczVO6maHHApOPGeDbGv3TTcdqX2olj3NtOTavUOnIQgJgy6NTfuyPQNeIpgMrdyjZ2y65H05c3evTj1zlC3fvojCx8ILtGkRigyvHZ-tJWba-vMVEoR4PXRHcxPUzhM_aCA6oxMb8hk58jQfRXcz9h_TDJFAVvZaqA-XURej759-xq8lMw4k2M0MQp3ieaby2G7pkxMpqd2izpNVRnJxSPVMUdL_HpgdbgxMuGsXmww",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBGACEe4JgwSluEDv6w0Q_aO-eAdx4T4e4n1V1SdTT4Oh9kYf_BIR8vb-vkTChfbfRQbi8JGocICZYd8idrYfwfuZiPqoqfzsDUuOiQqO8CXfsalzhVd0cCHdyWNuUiRNU65h3WDiGdFu4fwMXEGC-Dd0hiApypWvkAX3BAcWpnkZLz_BHH2lS_2r4rB_9Ou8ZhlquFa9Vy1y7qr2vyNrlh1ZDpKquYfbr1Crh2DBTQSUEPtkd4_fXwli6T8C3TPOAnqTgt4ZUpvJY",
        ],
    },
    {
        id: 2, title: "Urban Architecture", visibility: "Private", items: 15,
        desc: "Bold concrete structures, minimalist facades, and the geometric beauty of modern urban design.",
        covers: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCbmeMwGQiMYruvkXMFJmE85k83iO80FI-ceKv0zbMaAWJIJIqGZ0P0Dgexv3wShymQRzC4zXf_zFUB8vDL3XR0DSGc-fLQwCKLiXXIzqbt-gc7Rh-7ngLjinbqk8PuhjfgQQLiyZKqESkYXVhwZc1W7NSUmH85CCwpCcCHe6EgKEvPouXp1-tIx77ggDyneYXZyxTMt9LnQ_NrhFx6qOaXnI1aS_nmP_Rf6NxpIbz7OuZCpxMsxzSLy_wpdBoDy5fVFPEVchdb7Vw",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCZfCexmNHlT_Oay_QrleOYjTwNXeBayCR7UKbAPeN7AbzKxeZAZ-bW2ZY5v4sMRIKK94DWaiz_ROncgd9EYGwZMClWT0MKEUgzJ0eLqdovHCV1_76IM_mKzon8VL_rG_OYBtOD0__43iTnKxGB15b5MDhzArA_C9ROwEC25QJdoKFDaMBTBCkl3cO6jYn5SG1-eABC5iKcWnF43GAZRMac6_FMyleQHVayFTFgwLrb40Os1lWYr7cuHnFSN4z-hv6cCKHqm9RsvEc",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAPInDQeQCXFIps3qudMCYryhISxDA5cWH85OkBKaevjzmkFm76gy9HpZZXR82TnjTJy6ysu75Qk79XdwrY_N48-zwtF77IbU8Ki2Kw9kl4zWCMd8w0agega73GzHurwZRXq-DxmASdLSTpffl8XpjVFeMS_tyPDwOeAqFQkTy0H50l_wO-XpgjDA7nL6Nj5yj8o1yK7yn_WR7Kwp7_ZsRIfrhxCU3W-ouTgVO9RuLsqRAcN1d0O9IVA9bj-S6qJgl1o3E7mlG8DzY",
        ],
    },
    {
        id: 3, title: "Cinematic Portraits", visibility: "Public", items: 28,
        desc: "Story-driven portraiture inspired by cinema — emotion, light, and character captured in a single frame.",
        covers: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCwfBFdT13HjOL9uIDWX93kjUgq5wobxCe7KJczGxj69BXxHZt9l2R0fJX1e6kYj-KdyxuBoU13VSZMt94BIlcwJQlDRE8RM9rsyU667jbyPNvtqdT-0GSUV3LjQaB4XQT1CcjkwPqAuNBRFRwKt-Ll2z_Gez1zBcWcjKH-5SXVszE-m5Zz3TbTu7z0j8m2K4rs6QqPbuelhsvH52yMmujlSsYSkx3UA-FOuCvyJ_b1vfRChUtPq8uGFhLnZ-E-A1yO0cRuoaCVzjE",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAVtRBkVoktNBeBDHo6mW9xdXu_Eias-hf6E4BDZeldfDIb2GxUYmQ7Odwf3W21toQ29-dsA_0HJ_wew-eyebHuuT-9bqg0DwE5z2YyWGJxI7eITOLqb1qvSheCaZO-GXqMkSP7DqGkQWy8v-DLFUFc-lIhavM3etJPcmjadDA-edg-KM91Go-dsca9ds_57DR20GIthzz_t5iI5LbM_kCZtUrlxcrvfqj4ZWIa9cakYNwI_af8wTOIyUKhxqE5LJNnbIsRw2hLRzs",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDjB9oSgr6pqU-YuSgZyffM88IliyIG5mvzczVO6maHHApOPGeDbGv3TTcdqX2olj3NtOTavUOnIQgJgy6NTfuyPQNeIpgMrdyjZ2y65H05c3evTj1zlC3fvojCx8ILtGkRigyvHZ-tJWba-vMVEoR4PXRHcxPUzhM_aCA6oxMb8hk58jQfRXcz9h_TDJFAVvZaqA-XURej759-xq8lMw4k2M0MQp3ieaby2G7pkxMpqd2izpNVRnJxSPVMUdL_HpgdbgxMuGsXmww",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBGACEe4JgwSluEDv6w0Q_aO-eAdx4T4e4n1V1SdTT4Oh9kYf_BIR8vb-vkTChfbfRQbi8JGocICZYd8idrYfwfuZiPqoqfzsDUuOiQqO8CXfsalzhVd0cCHdyWNuUiRNU65h3WDiGdFu4fwMXEGC-Dd0hiApypWvkAX3BAcWpnkZLz_BHH2lS_2r4rB_9Ou8ZhlquFa9Vy1y7qr2vyNrlh1ZDpKquYfbr1Crh2DBTQSUEPtkd4_fXwli6T8C3TPOAnqTgt4ZUpvJY",
        ],
    },
    {
        id: 4, title: "Night Street Edit", visibility: "Private", items: 9,
        desc: "Gritty, moody night street photography — neon reflections, wet pavement, and the city that never sleeps.",
        covers: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAPInDQeQCXFIps3qudMCYryhISxDA5cWH85OkBKaevjzmkFm76gy9HpZZXR82TnjTJy6ysu75Qk79XdwrY_N48-zwtF77IbU8Ki2Kw9kl4zWCMd8w0agega73GzHurwZRXq-DxmASdLSTpffl8XpjVFeMS_tyPDwOeAqFQkTy0H50l_wO-XpgjDA7nL6Nj5yj8o1yK7yn_WR7Kwp7_ZsRIfrhxCU3W-ouTgVO9RuLsqRAcN1d0O9IVA9bj-S6qJgl1o3E7mlG8DzY",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCZfCexmNHlT_Oay_QrleOYjTwNXeBayCR7UKbAPeN7AbzKxeZAZ-bW2ZY5v4sMRIKK94DWaiz_ROncgd9EYGwZMClWT0MKEUgzJ0eLqdovHCV1_76IM_mKzon8VL_rG_OYBtOD0__43iTnKxGB15b5MDhzArA_C9ROwEC25QJdoKFDaMBTBCkl3cO6jYn5SG1-eABC5iKcWnF43GAZRMac6_FMyleQHVayFTFgwLrb40Os1lWYr7cuHnFSN4z-hv6cCKHqm9RsvEc",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD-Ivr1-E8jRUyfRUNyI6RMjzRSlyCWjmHdCiloEjyrNH_cAWvI1-6ahZT5FOcjLyoL2aVheJ53KarUhmEveAhbChyarr7AmkXtv5DTDfhv5fPudf8iVGK8i4jeXZHfjiwQW6YAkc2QoAXoSQWNTNT12OfRkKdjpclqRaqLlZzScqTqRLf9Vq4YilP_v3QYLPYIyU4VzVFjwE6y-NvlLLt_kM168bhei-_nNSvCCY5YUUAryvFp4g7fCdf3Em4VYnzmPkDYcNn1ggk",
        ],
    },
];

/* ─── Photo data for boards ─── */
const PHOTO_POOL = [
    { id: 1, title: "Desert Spires", author: "Alex Chen", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuj8KPTSmW03CdTlKlyJlFtjjyO-lIC776eJBQONqXYN5CXpcSRtL9gDfuwoQHTUxQ1UmNl4ysy2ESmBTpeEqFTXe_WVElloI9QFeRTH9vRH7NQi5XF9nn8L8MriIxiJ921T9AsBSc5queFelf9m8wdQLKPcaXO86e_sVaL8v4Z0S1IJ2upz0J8WIULNm-xX4ejG1kE5UteN6Bfn2JkLSX8iS7TIXm3s9mNmUWR9eDt7WHKtWk8FQXqq75xSYMn_BCj8DKo6sZ3_w", likes: 148 },
    { id: 2, title: "Stone Hands", author: "Emily Davis", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwfBFdT13HjOL9uIDWX93kjUgq5wobxCe7KJczGxj69BXxHZt9l2R0fJX1e6kYj-KdyxuBoU13VSZMt94BIlcwJQlDRE8RM9rsyU667jbyPNvtqdT-0GSUV3LjQaB4XQT1CcjkwPqAuNBRFRwKt-Ll2z_Gez1zBcWcjKH-5SXVszE-m5Zz3TbTu7z0j8m2K4rs6QqPbuelhsvH52yMmujlSsYSkx3UA-FOuCvyJ_b1vfRChUtPq8uGFhLnZ-E-A1yO0cRuoaCVzjE", likes: 94 },
    { id: 3, title: "Golden Hour", author: "James Park", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVtRBkVoktNBeBDHo6mW9xdXu_Eias-hf6E4BDZeldfDIb2GxUYmQ7Odwf3W21toQ29-dsA_0HJ_wew-eyebHuuT-9bqg0DwE5z2YyWGJxI7eITOLqb1qvSheCaZO-GXqMkSP7DqGkQWy8v-DLFUFc-lIhavM3etJPcmjadDA-edg-KM91Go-dsca9ds_57DR20GIthzz_t5iI5LbM_kCZtUrlxcrvfqj4ZWIa9cakYNwI_af8wTOIyUKhxqE5LJNnbIsRw2hLRzs", likes: 312 },
    { id: 4, title: "Deep Dive", author: "Lisa Ray", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGACEe4JgwSluEDv6w0Q_aO-eAdx4T4e4n1V1SdTT4Oh9kYf_BIR8vb-vkTChfbfRQbi8JGocICZYd8idrYfwfuZiPqoqfzsDUuOiQqO8CXfsalzhVd0cCHdyWNuUiRNU65h3WDiGdFu4fwMXEGC-Dd0hiApypWvkAX3BAcWpnkZLz_BHH2lS_2r4rB_9Ou8ZhlquFa9Vy1y7qr2vyNrlh1ZDpKquYfbr1Crh2DBTQSUEPtkd4_fXwli6T8C3TPOAnqTgt4ZUpvJY", likes: 201 },
    { id: 5, title: "Nordic Silence", author: "Jane Smith", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjB9oSgr6pqU-YuSgZyffM88IliyIG5mvzczVO6maHHApOPGeDbGv3TTcdqX2olj3NtOTavUOnIQgJgy6NTfuyPQNeIpgMrdyjZ2y65H05c3evTj1zlC3fvojCx8ILtGkRigyvHZ-tJWba-vMVEoR4PXRHcxPUzhM_aCA6oxMb8hk58jQfRXcz9h_TDJFAVvZaqA-XURej759-xq8lMw4k2M0MQp3ieaby2G7pkxMpqd2izpNVRnJxSPVMUdL_HpgdbgxMuGsXmww", likes: 45 },
    { id: 6, title: "Night City", author: "Marcus T.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPInDQeQCXFIps3qudMCYryhISxDA5cWH85OkBKaevjzmkFm76gy9HpZZXR82TnjTJy6ysu75Qk79XdwrY_N48-zwtF77IbU8Ki2Kw9kl4zWCMd8w0agega73GzHurwZRXq-DxmASdLSTpffl8XpjVFeMS_tyPDwOeAqFQkTy0H50l_wO-XpgjDA7nL6Nj5yj8o1yK7yn_WR7Kwp7_ZsRIfrhxCU3W-ouTgVO9RuLsqRAcN1d0O9IVA9bj-S6qJgl1o3E7mlG8DzY", likes: 445 },
    { id: 7, title: "Mountain Peak", author: "Chris E.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-Ivr1-E8jRUyfRUNyI6RMjzRSlyCWjmHdCiloEjyrNH_cAWvI1-6ahZT5FOcjLyoL2aVheJ53KarUhmEveAhbChyarr7AmkXtv5DTDfhv5fPudf8iVGK8i4jeXZHfjiwQW6YAkc2QoAXoSQWNTNT12OfRkKdjpclqRaqLlZzScqTqRLf9Vq4YilP_v3QYLPYIyU4VzVFjwE6y-NvlLLt_kM168bhei-_nNSvCCY5YUUAryvFp4g7fCdf3Em4VYnzmPkDYcNn1ggk", likes: 318 },
    { id: 8, title: "Urban Maze", author: "Sarah Lee", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZfCexmNHlT_Oay_QrleOYjTwNXeBayCR7UKbAPeN7AbzKxeZAZ-bW2ZY5v4sMRIKK94DWaiz_ROncgd9EYGwZMClWT0MKEUgzJ0eLqdovHCV1_76IM_mKzon8VL_rG_OYBtOD0__43iTnKxGB15b5MDhzArA_C9ROwEC25QJdoKFDaMBTBCkl3cO6jYn5SG1-eABC5iKcWnF43GAZRMac6_FMyleQHVayFTFgwLrb40Os1lWYr7cuHnFSN4z-hv6cCKHqm9RsvEc", likes: 77 },
];

export default function BoardDetailPage() {
    const params = useParams();
    const id = Number(params.id);

    const board = ALL_BOARDS.find(b => b.id === id);

    // Pin a subset of photos to each board based on id
    const [photos, setPhotos] = useState(() =>
        PHOTO_POOL.filter((_, i) => i % Math.max(1, id) !== 0 || i < 4)
            .slice(0, board?.items ?? 6)
    );
    const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);

    const handleRemovePhoto = (photoId: number) => {
        setPhotos(prev => prev.filter(p => p.id !== photoId));
    };

    const handleAddPhoto = (photo: typeof PHOTO_POOL[0]) => {
        if (!photos.find(p => p.id === photo.id)) {
            setPhotos(prev => [...prev, photo]);
        }
        setShowAddModal(false);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).catch(() => { });
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    if (!board) {
        return (
            <div className="min-h-screen bg-[#0b0f14] flex items-center justify-center text-white">
                <div className="text-center">
                    <span className="material-symbols-outlined text-6xl text-white/20 block mb-4">folder_off</span>
                    <h1 className="text-2xl font-bold mb-2">Board not found</h1>
                    <p className="text-white/40 mb-6">This board doesn't exist or may have been deleted.</p>
                    <Link href="/boards" className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/85 transition-colors">
                        Back to Boards
                    </Link>
                </div>
            </div>
        );
    }

    const availableToAdd = PHOTO_POOL.filter(p => !photos.find(ph => ph.id === p.id));

    return (
        <div className="min-h-screen bg-[#0b0f14] text-white font-display">

            {/* ── Navbar ── */}
            <header className="glass-nav sticky top-0 z-40 px-6 lg:px-10 py-4">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/boards" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
                            <span className="material-symbols-outlined text-xl group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                            <span className="text-sm font-semibold hidden sm:block">Boards</span>
                        </Link>
                        <span className="text-white/20">/</span>
                        <span className="text-white font-bold truncate max-w-xs">{board.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setShowShareModal(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5 hover:text-white transition-all">
                            <span className="material-symbols-outlined text-base">share</span>
                            Share
                        </button>
                        <button onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/85 transition-all shadow-lg shadow-primary/20 active:scale-95">
                            <span className="material-symbols-outlined text-base">add_photo_alternate</span>
                            Add Photos
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">

                {/* ── Board Hero ── */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-10">
                    {/* Cover strip */}
                    <div className="flex gap-2 shrink-0">
                        {board.covers.slice(0, 3).map((src, i) => (
                            <div key={i} className={`rounded-2xl overflow-hidden bg-white/5 ${i === 0 ? "w-28 h-28" : "w-16 h-28"}`}>
                                <img src={src} alt="" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <nav className="flex items-center gap-2 text-sm text-white/35 mb-3">
                            <Link href="/profile" className="hover:text-primary transition-colors">Profile</Link>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <Link href="/boards" className="hover:text-primary transition-colors">Mood Boards</Link>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span className="text-white/60">{board.title}</span>
                        </nav>
                        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">{board.title}</h1>
                        {board.desc && (
                            <p className="text-white/45 max-w-xl leading-relaxed mb-4">{board.desc}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-white/50">
                                <span className="material-symbols-outlined text-base">photo_library</span>
                                {photos.length} photos
                            </span>
                            <span className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider"
                                style={{ color: board.visibility === "Private" ? "#13a4ec" : "rgba(255,255,255,0.4)" }}>
                                <span className="material-symbols-outlined text-base">{board.visibility === "Public" ? "public" : "lock"}</span>
                                {board.visibility}
                            </span>
                            <span className="flex items-center gap-1.5 text-sm text-white/35">
                                <span className="material-symbols-outlined text-base">schedule</span>
                                Updated today
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Toolbar ── */}
                {photos.length > 0 && (
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            {selectedPhotos.length > 0 && (
                                <>
                                    <span className="text-primary text-sm font-semibold">{selectedPhotos.length} selected</span>
                                    <button
                                        onClick={() => {
                                            setPhotos(prev => prev.filter(p => !selectedPhotos.includes(p.id)));
                                            setSelectedPhotos([]);
                                        }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-colors border border-red-500/20">
                                        <span className="material-symbols-outlined text-sm">delete</span> Remove selected
                                    </button>
                                    <button onClick={() => setSelectedPhotos([])}
                                        className="text-white/40 hover:text-white text-sm transition-colors">Deselect all</button>
                                </>
                            )}
                        </div>
                        <button
                            onClick={() => setSelectedPhotos(selectedPhotos.length === photos.length ? [] : photos.map(p => p.id))}
                            className="text-sm text-white/40 hover:text-white transition-colors font-medium">
                            {selectedPhotos.length === photos.length ? "Deselect all" : "Select all"}
                        </button>
                    </div>
                )}

                {/* ── Photo Grid ── */}
                {photos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-white/25">
                        <span className="material-symbols-outlined text-7xl mb-5">add_photo_alternate</span>
                        <h2 className="text-xl font-bold mb-2 text-white/40">This board is empty</h2>
                        <p className="text-sm mb-6">Add photos to start curating your inspiration.</p>
                        <button onClick={() => setShowAddModal(true)}
                            className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/85 transition-colors active:scale-95">
                            Add First Photo
                        </button>
                    </div>
                ) : (
                    <div className="masonry-grid">
                        {photos.map(photo => {
                            const isSelected = selectedPhotos.includes(photo.id);
                            return (
                                <div key={photo.id} className="masonry-item relative group">
                                    <div className={`rounded-2xl overflow-hidden border-2 transition-all duration-200 ${isSelected ? "border-primary shadow-lg shadow-primary/20" : "border-transparent"}`}>
                                        <Link href={`/photo/${photo.id}`}>
                                            <img src={photo.img} alt={photo.title}
                                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 block" />
                                        </Link>
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-between p-4 pointer-events-none group-hover:pointer-events-auto">
                                            {/* Top: select + remove */}
                                            <div className="flex items-center justify-between">
                                                <button
                                                    onClick={() => setSelectedPhotos(prev => prev.includes(photo.id) ? prev.filter(i => i !== photo.id) : [...prev, photo.id])}
                                                    className={`size-6 rounded border-2 flex items-center justify-center transition-all ${isSelected ? "bg-primary border-primary" : "border-white/60 bg-black/30 hover:border-white"}`}>
                                                    {isSelected && <span className="material-symbols-outlined text-white text-xs">check</span>}
                                                </button>
                                                <button
                                                    onClick={() => handleRemovePhoto(photo.id)}
                                                    className="size-7 rounded-lg bg-red-500/80 flex items-center justify-center text-white hover:bg-red-500 transition-colors">
                                                    <span className="material-symbols-outlined text-sm">close</span>
                                                </button>
                                            </div>
                                            {/* Bottom: info */}
                                            <div>
                                                <p className="text-white font-bold text-sm truncate">{photo.title}</p>
                                                <div className="flex items-center justify-between mt-1">
                                                    <p className="text-white/60 text-xs">{photo.author}</p>
                                                    <span className="flex items-center gap-1 text-white/60 text-xs">
                                                        <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                                        {photo.likes}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ── Add Photos Modal ── */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={e => e.target === e.currentTarget && setShowAddModal(false)}>
                    <div className="w-full max-w-2xl bg-[#131920] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
                            <div>
                                <h2 className="text-white font-bold text-base">Add Photos to Board</h2>
                                <p className="text-white/40 text-xs mt-0.5">Click a photo to add it to "{board.title}"</p>
                            </div>
                            <button onClick={() => setShowAddModal(false)} className="size-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>
                        <div className="p-5 max-h-[60vh] overflow-y-auto">
                            {availableToAdd.length === 0 ? (
                                <div className="text-center py-12 text-white/30">
                                    <span className="material-symbols-outlined text-5xl block mb-3">check_circle</span>
                                    <p className="font-semibold">All photos are already in this board!</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {availableToAdd.map(photo => (
                                        <button key={photo.id} onClick={() => handleAddPhoto(photo)}
                                            className="relative group aspect-[4/3] rounded-xl overflow-hidden bg-white/5 hover:ring-2 hover:ring-primary/60 transition-all">
                                            <img src={photo.img} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                                <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity text-2xl bg-primary/80 rounded-full p-1">add</span>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                <p className="text-white text-[10px] font-semibold truncate">{photo.title}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Share Modal ── */}
            {showShareModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={e => e.target === e.currentTarget && setShowShareModal(false)}>
                    <div className="w-full max-w-sm bg-[#131920] border border-white/10 rounded-2xl shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-white font-bold text-base">Share Board</h2>
                            <button onClick={() => setShowShareModal(false)} className="size-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white">
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>
                        <div className="flex gap-2 mb-4">
                            <input readOnly value={typeof window !== "undefined" ? window.location.href : ""}
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white/60 focus:outline-none truncate" />
                            <button onClick={handleCopyLink}
                                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${copiedLink ? "bg-emerald-500 text-white" : "bg-primary text-white hover:bg-primary/85"}`}>
                                {copiedLink ? "Copied!" : "Copy"}
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: "mail", label: "Email" },
                                { icon: "public", label: "Twitter" },
                                { icon: "share", label: "More" },
                            ].map(({ icon, label }) => (
                                <button key={label} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                                    <span className="material-symbols-outlined">{icon}</span>
                                    <span className="text-xs font-semibold">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
