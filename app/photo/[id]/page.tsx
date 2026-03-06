"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/components/AuthProvider";

/* ─── Full photo catalogue ─── */
const PHOTO_DB = [
    {
        id: 1,
        title: "Nordic Landscape",
        category: "Minimalist Landscape",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjB9oSgr6pqU-YuSgZyffM88IliyIG5mvzczVO6maHHApOPGeDbGv3TTcdqX2olj3NtOTavUOnIQgJgy6NTfuyPQNeIpgMrdyjZ2y65H05c3evTj1zlC3fvojCx8ILtGkRigyvHZ-tJWba-vMVEoR4PXRHcxPUzhM_aCA6oxMb8hk58jQfRXcz9h_TDJFAVvZaqA-XURej759-xq8lMw4k2M0MQp3ieaby2G7pkxMpqd2izpNVRnJxSPVMUdL_HpgdbgxMuGsXmww",
        user: "Julian Rivers", handle: "@julian_photo", followers: "12.4k",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0Rt6qL2sp48AOLLNuwOpvWbsOAZQk_0No6PwvWNLfaefHXtw5P7b3YcbFewZT0yEuGWoynOq9Rmr4bnsPJXczKg9ykEXIDWJdUhSF9Xk94OqnfySebw62m0N_bCvOBYpIs_CpIsZyd5lsuO4GgxtbkRSZ7BOvovu6CjGCIAvKhkW7DcaQnhdvlQWvtMAbYj_fSJz2MLMSx9y0TV-6hAl-rV3gv1inKxu9cOGAuYGYreooQksd8DXrxB0zaVkbdK9S_26SGBIKgEk",
        quote: "Drawn to silent places where sky meets earth and time slows down.",
        likes: 248, comments: 34,
        exif: { iso: "200", shutter: "1/500s", aperture: "f/5.6", focal: "50mm", camera: "Nikon Z7 II • 24-70mm f/2.8 S" },
        palette: ["#c8d8e0", "#7a9aab", "#3d6272", "#1a3040", "#0e1e28", "#4a6555"],
        tags: ["Nordic", "Landscape", "Minimalism", "Mountains", "Nikon"],
        location: "Norway, Scandinavia",
        featured: true,
    },
    {
        id: 2,
        title: "Urban Steel",
        category: "Architectural",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuj8KPTSmW03CdTlKlyJlFtjjyO-lIC776eJBQONqXYN5CXpcSRtL9gDfuwoQHTUxQ1UmNl4ysy2ESmBTpeEqFTXe_WVElloI9QFeRTH9vRH7NQi5XF9nn8L8MriIxiJ921T9AsBSc5queFelf9m8wdQLKPcaXO86e_sVaL8v4Z0S1IJ2upz0J8WIULNm-xX4ejG1kE5UteN6Bfn2JkLSX8iS7TIXm3s9mNmUWR9eDt7WHKtWk8FQXqq75xSYMn_BCj8DKo6sZ3_w",
        user: "Elena Vance", handle: "@elena_lens", followers: "8.1k",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtgEyxilLn6EOx1KJESyJ4l9scc-fWDCz-q2vsyEkaWLSThLqXrJDa78gSeH8eNPNevnuEuxQc5HxVNm91NjsrR5pBWAZfau778AWfgFvlceqpBwGQ8Bkz4jXviBcmWs_C1jlsbhbvCfwRDl_8PplouIDPrJNpclp9ilzY-9q-i9qCeifYXI2lOfZFlUdhp4bcyOj6eXxGP6NKaUy53fo54mdMcBBibueiyISOn5L8NtFjtv0ojyxmHQhcuCJ6KwHp-z7KBupGSTU",
        quote: "Architecture is frozen music — I just press the shutter.",
        likes: 134, comments: 18,
        exif: { iso: "400", shutter: "1/250s", aperture: "f/8.0", focal: "24mm", camera: "Sony A7R IV • 16-35mm f/2.8 GM" },
        palette: ["#c4a882", "#887053", "#4a3c2a", "#232018", "#616e78", "#93a0aa"],
        tags: ["Architecture", "Desert", "Sandstone", "Structure", "Sony"],
        location: "Wadi Rum, Jordan",
        featured: false,
    },
    {
        id: 3,
        title: "Stone Hands",
        category: "Cinematic Portrait",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwfBFdT13HjOL9uIDWX93kjUgq5wobxCe7KJczGxj69BXxHZt9l2R0fJX1e6kYj-KdyxuBoU13VSZMt94BIlcwJQlDRE8RM9rsyU667jbyPNvtqdT-0GSUV3LjQaB4XQT1CcjkwPqAuNBRFRwKt-Ll2z_Gez1zBcWcjKH-5SXVszE-m5Zz3TbTu7z0j8m2K4rs6QqPbuelhsvH52yMmujlSsYSkx3UA-FOuCvyJ_b1vfRChUtPq8uGFhLnZ-E-A1yO0cRuoaCVzjE",
        user: "Marcus Thorne", handle: "@marcusthorne", followers: "22.7k",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIdkBtXFO-klhxavvs3u3jZImP7hJgc3DdEtm3lu0f036lOXdPYHdQWQGDMCybkzaJwBq3nAzhSIp4IwuKWlQ_EUhLGtjJYk4ZISHH4LbaB8f151tjTlreV9S_-J6SfV7MX9hit3D5YR_wwdIhpVDvvLtkiGtzfKo6WsMQ4PJHdg_6ek1_MiEo3CGx-Kh6eQtS2zfiae_LF8T2vv7xvrAgdz-jTjV_EFjmhgbscBNLxNSBLx4jEzP5tLbphA6pgPQ_a3netH9Dq2w",
        quote: "Every rock holds a story older than memory itself.",
        likes: 390, comments: 61,
        exif: { iso: "100", shutter: "1/125s", aperture: "f/2.8", focal: "85mm", camera: "Fujifilm GFX 100S • 80mm f/1.7" },
        palette: ["#6e5c4a", "#a08060", "#c9a87c", "#8a9880", "#4a5442", "#2a2e28"],
        tags: ["Portrait", "Hands", "Macro", "Cinematic", "Fujifilm"],
        location: "Cappadocia, Turkey",
        featured: true,
    },
    {
        id: 4,
        title: "Circuit Depths",
        category: "Architectural",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZfCexmNHlT_Oay_QrleOYjTwNXeBayCR7UKbAPeN7AbzKxeZAZ-bW2ZY5v4sMRIKK94DWaiz_ROncgd9EYGwZMClWT0MKEUgzJ0eLqdovHCV1_76IM_mKzon8VL_rG_OYBtOD0__43iTnKxGB15b5MDhzArA_C9ROwEC25QJdoKFDaMBTBCkl3cO6jYn5SG1-eABC5iKcWnF43GAZRMac6_FMyleQHVayFTFgwLrb40Os1lWYr7cuHnFSN4z-hv6cCKHqm9RsvEc",
        user: "Sarah Lee", handle: "@sarahlee_vis", followers: "5.3k",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY_y2ciZWIyOlxprheLRfMP6jV7wt-xkhbvC5fElb7cPpYH6PwWaNOxOvfrFUkv_3vk3B_Ko6pnQPk2qzJdZhKqWxy_pPdVp2wdUQ6omtMMX5iY96b6mBRLoWhCOVzZxYdmce0Dy7OXMyfcVR2IWiJg-XIq5yO8aUDI0he3792CpfeoCYyehNwoklH5GZMYOgc90gE7nAt6Iw5NWYOy6tbjXw01tr5igowo5MxSIGSwKvYKwpJyo0oT5MRHCQCgAzXXiaPmx5WpoQ",
        quote: "The invisible world made visible — beauty in the circuits that power our lives.",
        likes: 77, comments: 9,
        exif: { iso: "800", shutter: "1/60s", aperture: "f/16", focal: "100mm", camera: "Canon R5 • 100mm f/2.8L Macro" },
        palette: ["#1a2830", "#0e7038", "#16a84c", "#2ed870", "#8c6a0e", "#d4a820"],
        tags: ["Macro", "Technology", "Circuit", "Abstract", "Canon"],
        location: "Studio, San Francisco",
        featured: false,
    },
    {
        id: 5,
        title: "Ocean Mist",
        category: "Minimalist Landscape",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGACEe4JgwSluEDv6w0Q_aO-eAdx4T4e4n1V1SdTT4Oh9kYf_BIR8vb-vkTChfbfRQbi8JGocICZYd8idrYfwfuZiPqoqfzsDUuOiQqO8CXfsalzhVd0cCHdyWNuUiRNU65h3WDiGdFu4fwMXEGC-Dd0hiApypWvkAX3BAcWpnkZLz_BHH2lS_2r4rB_9Ou8ZhlquFa9Vy1y7qr2vyNrlh1ZDpKquYfbr1Crh2DBTQSUEPtkd4_fXwli6T8C3TPOAnqTgt4ZUpvJY",
        user: "Luna Rose", handle: "@lunarose_photo", followers: "18.9k",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuANPP-sIcHfwcQzwCIIvHAzZ9fKbIjfzge9PNgB0UCFn0OsHScPVSCgcvTzgaVD_xR_3fyJT6USgqyRSouANqvS2qUrGTqhlQ_6mvuZ9auq_3UeM4H2h1FxE2sRHoSix7htNjsg7GdPRgwG_eeK7pv20ZWX2Jlxut__Yq-LsbMe4yHXwqadsT26pzQuCGEglqXH-Ov1hGDlAGaWncfcb0a3AhFxc5THi-XX6rfxVoRSqsjL8OkKFDTrDcJdThAs1eTlayvH-wflqwM",
        quote: "Oceans are the last untamed place on earth. I dive so others can see.",
        likes: 512, comments: 87,
        exif: { iso: "1600", shutter: "1/1000s", aperture: "f/4.0", focal: "15mm", camera: "GoPro Hero 11 + Housing • Wide" },
        palette: ["#063850", "#0a6080", "#1296b8", "#40c8e0", "#80d8e8", "#c0ecf4"],
        tags: ["Ocean", "Underwater", "Teal", "Marine", "GoPro"],
        location: "Great Barrier Reef, Australia",
        featured: true,
    },
    {
        id: 6,
        title: "Jungle Shadows",
        category: "Macro Wildlife",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVtRBkVoktNBeBDHo6mW9xdXu_Eias-hf6E4BDZeldfDIb2GxUYmQ7Odwf3W21toQ29-dsA_0HJ_wew-eyebHuuT-9bqg0DwE5z2YyWGJxI7eITOLqb1qvSheCaZO-GXqMkSP7DqGkQWy8v-DLFUFc-lIhavM3etJPcmjadDA-edg-KM91Go-dsca9ds_57DR20GIthzz_t5iI5LbM_kCZtUrlxcrvfqj4ZWIa9cakYNwI_af8wTOIyUKhxqE5LJNnbIsRw2hLRzs",
        user: "Victor Kane", handle: "@victorkane_wild", followers: "31.0k",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5NCpn40sRnqIaaA3R2p3_xz2ycSRpuPcqlUlZtfqxaJxxCmVZG0I9rFtpq6Visj6XnwAZdwWb2hmIXP-u_JmIcPVqe3uDr7DSg5WNbg_ytQPPToEpLRe_eoxr6gFCBZzaKpvLeJXKTtuG6Dh-SMM4s2qpWjcaUAKm-6JQ9ALF7DQE0uomOEBqooxlD-h8Hmz7tzuqRRKm3taOuqCRzz3JE0cyuib6JZs22N65OHdkBduZuz6sCKSH6Gq_o2am8Af6xPjR4dZSD7E",
        quote: "Wildlife doesn't pause for your settings. You pause for wildlife.",
        likes: 201, comments: 27,
        exif: { iso: "3200", shutter: "1/2000s", aperture: "f/6.3", focal: "600mm", camera: "Canon R3 • 600mm f/4L IS" },
        palette: ["#1c3014", "#2e5022", "#4a7838", "#7aaa60", "#b8d090", "#d4e8b8"],
        tags: ["Wildlife", "Jungle", "Forest", "Nature", "Telephoto"],
        location: "Borneo, Malaysia",
        featured: false,
    },
    {
        id: 7,
        title: "Night City",
        category: "Street Photography",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPInDQeQCXFIps3qudMCYryhISxDA5cWH85OkBKaevjzmkFm76gy9HpZZXR82TnjTJy6ysu75Qk79XdwrY_N48-zwtF77IbU8Ki2Kw9kl4zWCMd8w0agega73GzHurwZRXq-DxmASdLSTpffl8XpjVFeMS_tyPDwOeAqFQkTy0H50l_wO-XpgjDA7nL6Nj5yj8o1yK7yn_WR7Kwp7_ZsRIfrhxCU3W-ouTgVO9RuLsqRAcN1d0O9IVA9bj-S6qJgl1o3E7mlG8DzY",
        user: "Emma Stone", handle: "@emmaphoto", followers: "44.2k",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh9Huk4VFDFZqcPU0VJo-o14MZLVw1Gkmp15MDWRoI2bTMKLJ1Y64wpRzPEdU3SuO5FMOs9Wecj2sfAzF1UEW91twwua_PUc9VqQbDMoMMBOXoXj657_xvsVMmuJlABHuN2rEk3teHVsGL50cDbUgZFv7bWksaTfTm3vg9ZZK6C2orbNzs4Aotkj-2puc4UXHHhjRtIwFCzAqHBd_AxRAWhkKY1CQ8-hxH1lYQqU3EB4GdEdOsnj0WnDq35TyCbAvGul331LF7VMw",
        quote: "Cities never sleep. I just document the dreams they have standing up.",
        likes: 445, comments: 72,
        exif: { iso: "6400", shutter: "1/30s", aperture: "f/1.8", focal: "35mm", camera: "Leica Q2 • 28mm f/1.7 Summilux" },
        palette: ["#0a0a14", "#1a1a2e", "#3a1a4a", "#e0a020", "#f0c060", "#ff6a3a"],
        tags: ["Night", "Street", "Urban", "Neon", "Leica"],
        location: "Tokyo, Japan",
        featured: true,
    },
    {
        id: 8,
        title: "Mountain Ridge",
        category: "Minimalist Landscape",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-Ivr1-E8jRUyfRUNyI6RMjzRSlyCWjmHdCiloEjyrNH_cAWvI1-6ahZT5FOcjLyoL2aVheJ53KarUhmEveAhbChyarr7AmkXtv5DTDfhv5fPudf8iVGK8i4jeXZHfjiwQW6YAkc2QoAXoSQWNTNT12OfRkKdjpclqRaqLlZzScqTqRLf9Vq4YilP_v3QYLPYIyU4VzVFjwE6y-NvlLLt_kM168bhei-_nNSvCCY5YUUAryvFp4g7fCdf3Em4VYnzmPkDYcNn1ggk",
        user: "Chris Evans", handle: "@chrisevans_mt", followers: "9.6k",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv6OZVMfDPDzMEuSFcUKVkdNX5hZ2Tw1SxMFn8kZo7epWgFSgzlCE4Owu8C833I-TZuzNpwSqRSFGoNtF_sVhYuuHHIvXtDUYTIGu6J2XAVUaQVtTaTnW6dL_26MPyYDuwi-8hBde_uPyjHQVU-EkoLqGTz_2njfkTYIgR0jUwAAx2GrxND62kbZwKs_pQTGIrMtCvJBBivlykAVSxsC_FmI8SayZS7mZtbQKGrLFsKAtS-kKadTxFDd_iYseY9Hv4ku0zNADArZ0",
        quote: "The summit is what drives us, but the climb itself is what matters.",
        likes: 318, comments: 44,
        exif: { iso: "100", shutter: "1/800s", aperture: "f/11", focal: "16mm", camera: "Sony A7C II • 16-35mm f/4 G" },
        palette: ["#e8f0f8", "#a0b8c8", "#607888", "#384858", "#202830", "#102038"],
        tags: ["Mountains", "Landscape", "Alpine", "Snow", "Sony"],
        location: "Patagonia, Argentina",
        featured: false,
    },
];

export default function PhotoDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user, profile } = useAuth();

    const id = String(params.id);

    const [photo, setPhoto] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [saved, setSaved] = useState(false);
    const [showSaveMenu, setShowSaveMenu] = useState(false);
    const [following, setFollowing] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);

    // Comments
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        async function fetchPhoto() {
            setLoading(true);
            // If the ID is a long UUID, it belongs to our Supabase database!
            if (id.length > 10) {
                const { data, error } = await supabase
                    .from('photos')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (data && !error) {
                    setPhoto({
                        id: data.id,
                        title: data.title || "Untitled Work",
                        category: "Community Discovery",
                        img: data.image_url,
                        user: data.user_name || "Guest Photographer",
                        handle: "@guest_creator", followers: "New",
                        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYgxy2-sXzpEER0TwK0pc7X7kkUga7StH5pDzJ8TUI54tauK8eee3bXqA_qXOcheJtSRrt7zahb0HYLLPr75QigzctdYWYnoAUWKlbx-KyR0ZSgF37OzplYYSs3VXdD-HVdbDbl2tQs-GpDBugCTDa52T3IIAUtlrlBRhUKAAVwzX-3eKHz3NyNmnfrNbBTnoFVBHDXHdJDsk97VrBIc-cZmjz6Y4zf2uoa_vsHmLBAXt2xkUr5a576-QLLSUXbAF2o7Jl56zojlU",
                        quote: "A moment captured and preserved forever on LensView.",
                        likes: data.likes || 0, comments: 0,
                        exif: { iso: "Auto", shutter: "Auto", aperture: "Auto", focal: "-", camera: "Unknown Device" },
                        palette: ["#1e293b", "#334155", "#475569", "#64748b", "#94a3b8", "#cbd5e1"],
                        tags: data.tags || ["Photography", "Community"],
                        location: "Planet Earth",
                        featured: false,
                    });

                    // Fetch real likes count from DB
                    const { count: likeCount } = await supabase
                        .from('likes')
                        .select('*', { count: 'exact', head: true })
                        .eq('photo_id', id);

                    setLikes(likeCount || data.likes || 0);

                    // Check if *current user* has liked it
                    if (user) {
                        const { data: userLike } = await supabase
                            .from('likes')
                            .select('*')
                            .eq('photo_id', id)
                            .eq('user_id', user.id)
                            .single();

                        if (userLike) setLiked(true);
                    }

                    let photoUser = data.user_name || "Guest Photographer";

                    const { data: commentsData } = await supabase
                        .from('comments')
                        .select('*, profiles(full_name, avatar_url)')
                        .eq('photo_id', id)
                        .order('created_at', { ascending: false });

                    if (commentsData) setComments(commentsData);
                }
            } else {
                // Otherwise it's our short dummy IDs (1, 2, 3...)
                const dummy = PHOTO_DB.find(p => p.id === Number(id));
                if (dummy) {
                    setPhoto(dummy);
                    setLikes(dummy.likes);

                    // Check dummy likes too so the button works correctly on test data
                    if (user) {
                        const { data: userLike } = await supabase
                            .from('likes')
                            .select('*')
                            .eq('photo_id', id)
                            .eq('user_id', user.id)
                            .single();

                        if (userLike) setLiked(true);
                    }

                    let photoUser = dummy.user;

                    const { data: commentsData } = await supabase
                        .from('comments')
                        .select('*, profiles(full_name, avatar_url)')
                        .eq('photo_id', id)
                        .order('created_at', { ascending: false });

                    if (commentsData) setComments(commentsData);

                    // Check Follow Status based on the photo user
                    if (user && photoUser) {
                        const { data: followData } = await supabase
                            .from('follows')
                            .select('*')
                            .eq('follower_id', user.id)
                            .eq('following_id', photoUser)
                            .single();

                        if (followData) setFollowing(true);
                    }
                }
            }
            setLoading(false);
        }

        if (id) fetchPhoto();
    }, [id, user]);

    const others = PHOTO_DB.slice(0, 4);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0b0f14] flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="size-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white/50 font-bold tracking-widest uppercase text-sm">Loading Masterpiece...</p>
                </div>
            </div>
        );
    }

    if (!photo) {
        return (
            <div className="min-h-screen bg-[#0b0f14] flex items-center justify-center text-white">
                <div className="text-center">
                    <span className="material-symbols-outlined text-6xl text-white/20 block mb-4">image_not_supported</span>
                    <h1 className="text-2xl font-bold mb-2">Photo not found</h1>
                    <p className="text-white/40 mb-6">This photo may have been removed or the link is incorrect.</p>
                    <Link href="/" className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/85 transition-colors">
                        Back to Explore
                    </Link>
                </div>
            </div>
        );
    }

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert("You must be signed in to comment!");
            return;
        }
        if (!newComment.trim()) return;

        try {
            const { data, error } = await supabase
                .from('comments')
                .insert([{ user_id: user.id, photo_id: id, content: newComment.trim() }])
                .select('*')
                .single();

            if (error) throw error;

            // Optimistic update
            setComments(prev => [
                {
                    ...data,
                    profiles: {
                        full_name: profile?.full_name || user.email?.split('@')[0],
                        avatar_url: profile?.avatar_url
                    }
                },
                ...prev
            ]);
            setNewComment("");
        } catch (error) {
            console.error("Error posting comment:", error);
            alert("Failed to post comment.");
        }
    };

    const handleLike = async () => {
        if (!user) {
            alert("You must be signed in to like photos!");
            return;
        }

        const newLikedState = !liked;
        // Optimistic UI update
        setLiked(newLikedState);
        setLikes(n => newLikedState ? n + 1 : Math.max(0, n - 1));

        try {
            if (newLikedState) {
                // Insert into DB
                const { error } = await supabase
                    .from('likes')
                    .insert([{ user_id: user.id, photo_id: id }]);

                if (error && error.code !== '23505') throw error; // ignore unique constraint if already liked
            } else {
                // Delete from DB
                const { error } = await supabase
                    .from('likes')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('photo_id', id);

                if (error) throw error;
            }

            // If it's a real database photo, optionally update the cached total count in `photos` table
            if (id.length > 10 && newLikedState) {
                await supabase.rpc('increment_likes', { p_id: id }); // We would need to build this Postgres function later for pure scale
            }
        } catch (error) {
            console.error("Error toggling like:", error);
            // Revert on failure
            setLiked(!newLikedState);
            setLikes(n => !newLikedState ? n + 1 : Math.max(0, n - 1));
        }
    };

    const handleDownload = async () => {
        if (!user) {
            alert("You must be signed in to download photos in high-res!");
            return;
        }

        try {
            // Track download in database securely
            await supabase
                .from('downloads')
                .insert([{ user_id: user.id, photo_id: id }]);

            // Trigger the actual download in browser
            window.open(photo.img, '_blank');
        } catch (error) {
            console.error("Error saving download stat:", error);
        }
    };

    const handleFollow = async () => {
        if (!user) {
            alert("You must be signed in to follow creators.");
            return;
        }

        const newFollowingState = !following;
        setFollowing(newFollowingState);

        try {
            if (newFollowingState) {
                // Insert Follow
                const { error } = await supabase
                    .from('follows')
                    .insert([{ follower_id: user.id, following_id: photo.user }]);

                if (error && error.code !== '23505') throw error; // Ignore uniqueness duplicate
            } else {
                // Delete Follow
                const { error } = await supabase
                    .from('follows')
                    .delete()
                    .eq('follower_id', user.id)
                    .eq('following_id', photo.user);

                if (error) throw error;
            }
        } catch (error) {
            console.error("Error toggling follow:", error);
            setFollowing(!newFollowingState); // Revert UI
            alert("Could not update follow status.");
        }
    };

    return (
        <div className="bg-[#0b0f14] text-slate-100 min-h-screen">

            {/* ── Header ── */}
            <header className="sticky top-0 z-50 glass-nav px-6 lg:px-10 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
                        <span className="material-symbols-outlined text-xl group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                    </button>
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined text-white text-lg">camera</span>
                        </div>
                        <span className="text-white font-bold hidden sm:block">LensView</span>
                    </Link>
                    {/* search */}
                    <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 min-w-64">
                        <span className="material-symbols-outlined text-white/30 text-lg">search</span>
                        <input placeholder="Search creators, equipment…" className="bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none w-full" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold">
                        <Link href="/" className="text-white/50 hover:text-white transition-colors">Explore</Link>
                        <Link href="/community" className="text-white/50 hover:text-white transition-colors">Community</Link>
                        <Link href="/boards" className="text-white/50 hover:text-white transition-colors">Boards</Link>
                    </nav>
                    <Link href="/upload" className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/85 transition-all shadow-lg shadow-primary/20">
                        Upload
                    </Link>
                    {user ? (
                        <Link href="/profile" className="size-9 rounded-full overflow-hidden border-2 border-white/10 hover:border-primary transition-all bg-slate-800">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="Me" className="w-full h-full object-cover" />
                            ) : (
                                <img src={`https://www.gravatar.com/avatar/${user.id}?d=retro`} alt="Me" className="w-full h-full object-cover" />
                            )}
                        </Link>
                    ) : (
                        <Link href="/" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-all">
                            Sign In
                        </Link>
                    )}
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6 pb-20">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-white/40 mb-6 animate-fade-in-up">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="hover:text-primary transition-colors cursor-pointer">{photo.category}</span>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-white/70 truncate">{photo.title}</span>
                </div>

                <div className="flex flex-col xl:flex-row gap-8">

                    {/* ── LEFT: Image ── */}
                    <div className="flex-1 min-w-0 flex flex-col gap-4 animate-fade-in-up delay-100">
                        <div className="relative group bg-black/30 rounded-2xl overflow-hidden">
                            <img
                                src={photo.img}
                                alt={photo.title}
                                className="w-full h-auto object-cover max-h-[75vh] rounded-2xl cursor-zoom-in"
                                onClick={() => setFullscreen(true)}
                            />
                            {/* Hover controls */}
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="size-10 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/70 transition-all flex items-center justify-center">
                                    <span className="material-symbols-outlined text-xl">zoom_in</span>
                                </button>
                                <button onClick={() => setFullscreen(true)} className="size-10 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/70 transition-all flex items-center justify-center">
                                    <span className="material-symbols-outlined text-xl">fullscreen</span>
                                </button>
                            </div>
                            {/* Badges */}
                            <div className="absolute bottom-4 left-4 flex gap-2">
                                {photo.featured && (
                                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest">Featured</span>
                                )}
                                <span className="px-3 py-1 bg-primary/80 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest">Exclusive</span>
                            </div>
                        </div>

                        {/* Interaction bar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-1">
                            <div className="flex items-center gap-6">
                                <button onClick={handleLike} className={`flex items-center gap-2 transition-colors font-bold ${liked ? "text-red-500" : "text-white/60 hover:text-red-400"}`}>
                                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                                    <span className="text-sm">{likes.toLocaleString()}</span>
                                </button>
                                <button className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-2xl">chat_bubble</span>
                                    <span className="text-sm font-bold">{comments.length > 0 ? comments.length : photo.comments}</span>
                                </button>
                                <button className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-2xl">share</span>
                                    <span className="text-sm font-bold">Share</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <button
                                        onClick={() => setShowSaveMenu(v => !v)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${saved ? "bg-primary/15 border-primary/50 text-primary" : "bg-white/5 border-white/10 text-white hover:bg-white/10"}`}
                                    >
                                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0" }}>bookmark</span>
                                        Save to Board
                                        <span className="material-symbols-outlined text-base">expand_more</span>
                                    </button>
                                    {showSaveMenu && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setShowSaveMenu(false)} />
                                            <div className="absolute right-0 top-full mt-2 w-52 bg-[#1a2030] border border-white/10 rounded-xl shadow-2xl z-20 p-2">
                                                {["Golden Hour Inspiration", "Urban Architecture", "Cinematic Portraits"].map(b => (
                                                    <button key={b} onClick={() => { setSaved(true); setShowSaveMenu(false); }}
                                                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/5 hover:text-white transition-all text-left">
                                                        <span className="material-symbols-outlined text-base text-primary/70">folder_special</span>
                                                        {b}
                                                    </button>
                                                ))}
                                                <div className="border-t border-white/8 mt-1 pt-1">
                                                    <Link href="/boards" className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-primary hover:bg-primary/10 transition-all">
                                                        <span className="material-symbols-outlined text-base">add</span>
                                                        Create new board
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <button onClick={handleDownload} className="size-10 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all flex items-center justify-center">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                </button>
                            </div>
                        </div>

                        {/* Related photos */}
                        <div className="mt-4">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">auto_awesome</span>
                                More like this
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {others.map(other => (
                                    <Link key={other.id} href={`/photo/${other.id}`} className="relative group aspect-[4/3] rounded-xl overflow-hidden bg-white/5 block">
                                        <img src={other.img} alt={other.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                            <p className="text-white text-xs font-bold truncate">{other.title}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="mt-8 bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">chat</span>
                                Discussion ({comments.length})
                            </h3>

                            {user ? (
                                <form onSubmit={handleComment} className="flex gap-4 mb-8">
                                    <div className="size-10 rounded-full overflow-hidden shrink-0 bg-slate-800">
                                        <img src={profile?.avatar_url || `https://www.gravatar.com/avatar/${user.id}?d=retro`} alt="You" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex gap-2">
                                        <input
                                            type="text"
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder="Add a comment..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                        <button type="submit" disabled={!newComment.trim()} className="bg-primary text-white px-4 rounded-xl font-bold text-sm disabled:opacity-50 hover:bg-primary/80 transition-colors">
                                            Post
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="mb-8 p-4 bg-white/5 rounded-xl text-center text-sm text-white/50">
                                    <Link href="/" className="text-primary font-bold hover:underline">Sign in</Link> to leave a comment.
                                </div>
                            )}

                            <div className="space-y-6">
                                {comments.map((comment: any) => (
                                    <div key={comment.id} className="flex gap-4">
                                        <div className="size-10 rounded-full overflow-hidden shrink-0 bg-slate-800">
                                            <img src={comment.profiles?.avatar_url || `https://www.gravatar.com/avatar/${comment.user_id}?d=retro`} alt="User avatar" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-white text-sm">
                                                    {comment.profiles?.full_name || "User"}
                                                </span>
                                                <span className="text-xs text-white/40">
                                                    {new Date(comment.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-white/80 leading-relaxed break-words">{comment.content}</p>
                                        </div>
                                    </div>
                                ))}
                                {comments.length === 0 && (
                                    <div className="text-center text-white/30 text-sm py-4">No comments yet. Be the first!</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: Details ── */}
                    <aside className="w-full xl:w-96 flex flex-col gap-6 shrink-0 animate-slide-in-right delay-200">

                        {/* Photographer */}
                        <div className="p-5 bg-white/[0.03] border border-white/8 rounded-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-full overflow-hidden ring-2 ring-primary/30">
                                        <img src={photo.avatar} alt={photo.user} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <Link href="/profile" className="text-white font-bold hover:text-primary transition-colors block">{photo.user}</Link>
                                        <p className="text-white/40 text-xs">{photo.handle} • {photo.followers} followers</p>
                                    </div>
                                </div>
                                <button onClick={handleFollow}
                                    className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all ${following ? "bg-white/10 text-white border border-white/15" : "bg-primary text-white hover:bg-primary/85 shadow-lg shadow-primary/20"}`}>
                                    {following ? "Following" : "Follow"}
                                </button>
                            </div>
                            <p className="text-white/50 text-sm leading-relaxed italic">"{photo.quote}"</p>
                        </div>

                        {/* EXIF / Technical Details */}
                        <div>
                            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">info</span>
                                Technical Details
                            </h3>
                            <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                                {[
                                    { label: "ISO", value: photo.exif.iso },
                                    { label: "Shutter", value: photo.exif.shutter },
                                    { label: "Aperture", value: photo.exif.aperture },
                                    { label: "Focal Length", value: photo.exif.focal },
                                ].map(({ label, value }) => (
                                    <div key={label} className="p-3 bg-white/[0.04] border border-white/8 rounded-xl flex flex-col items-center text-center">
                                        <span className="text-white/35 text-[10px] font-bold uppercase tracking-wider mb-1">{label}</span>
                                        <span className="text-white font-bold text-sm">{value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 bg-white/[0.04] border border-white/8 rounded-xl flex items-center gap-3">
                                <span className="material-symbols-outlined text-white/35">camera</span>
                                <div>
                                    <span className="text-white/35 text-[10px] font-bold uppercase tracking-wider block">Camera & Lens</span>
                                    <span className="text-white text-xs font-bold">{photo.exif.camera}</span>
                                </div>
                            </div>
                        </div>

                        {/* Color Palette */}
                        <div>
                            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">palette</span>
                                Color Palette
                            </h3>
                            <div className="flex h-12 rounded-xl overflow-hidden border border-white/8">
                                {photo.palette.map((color: string) => (
                                    <div key={color} className="flex-1" style={{ backgroundColor: color }} title={color} />
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">sell</span>
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {photo.tags.map((tag: string) => (
                                    <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-white/60 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors cursor-pointer">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                                Location
                            </h3>
                            <div className="rounded-xl overflow-hidden border border-white/8 h-32 relative group cursor-pointer">
                                <img className="w-full h-full object-cover" alt="Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMqSHzq_NfrRBZ2Lc5YhIkXJ3s5pbAkIxfSiqAgVphlFTeu80XgD7jUR_QjYXGgy_fW9oynmYEF5TOaFcB7wBs09qdhc7yq-iHEUplw1X8Y3OZLo-VKHx12E8ILVPnukp_eJBM5-HWiEr1MbCUlpT5nlJYwA_mLU_NZAB-jjig0db6REtgO6VAGd6oiklfxAHnQFz9wfu5ZdzWzhn2AxR1ZfLhfYNRP0reXMWG5rGUlM98Wno3-bwFVLKvJt_l77tw6LDkHRR7aYk" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-xs font-bold uppercase tracking-widest">Open in Maps</span>
                                </div>
                                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] text-white font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                    {photo.location}
                                </div>
                            </div>
                        </div>

                    </aside>
                </div>
            </main>

            {/* Fullscreen overlay */}
            {fullscreen && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setFullscreen(false)}>
                    <button className="absolute top-4 right-4 size-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <img src={photo.img} alt={photo.title} className="max-w-full max-h-full object-contain rounded-xl" />
                </div>
            )}
        </div>
    );
}
