"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/components/AuthProvider";
import { AuthModal } from "@/components/AuthModal";

export type Photo = {
  id: string | number;
  alt: string;
  img: string;
  user: string;
  avatar: string;
  likes: number;
  saved: boolean;
};

/* ─── data ─── */
const CATEGORIES = [
  "All Discoveries",
  "Architectural",
  "Cinematic Portrait",
  "Street Photography",
  "Minimalist Landscape",
  "Macro Wildlife",
  "Aerial Urban",
  "Fashion Editorial",
];

const PHOTOS = [
  {
    id: 1,
    alt: "Landscape",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjB9oSgr6pqU-YuSgZyffM88IliyIG5mvzczVO6maHHApOPGeDbGv3TTcdqX2olj3NtOTavUOnIQgJgy6NTfuyPQNeIpgMrdyjZ2y65H05c3evTj1zlC3fvojCx8ILtGkRigyvHZ-tJWba-vMVEoR4PXRHcxPUzhM_aCA6oxMb8hk58jQfRXcz9h_TDJFAVvZaqA-XURej759-xq8lMw4k2M0MQp3ieaby2G7pkxMpqd2izpNVRnJxSPVMUdL_HpgdbgxMuGsXmww",
    user: "Julian Rivers",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0Rt6qL2sp48AOLLNuwOpvWbsOAZQk_0No6PwvWNLfaefHXtw5P7b3YcbFewZT0yEuGWoynOq9Rmr4bnsPJXczKg9ykEXIDWJdUhSF9Xk94OqnfySebw62m0N_bCvOBYpIs_CpIsZyd5lsuO4GgxtbkRSZ7BOvovu6CjGCIAvKhkW7DcaQnhdvlQWvtMAbYj_fSJz2MLMSx9y0TV-6hAl-rV3gv1inKxu9cOGAuYGYreooQksd8DXrxB0zaVkbdK9S_26SGBIKgEk",
    likes: 248, saved: false,
  },
  {
    id: 2,
    alt: "Architecture",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuj8KPTSmW03CdTlKlyJlFtjjyO-lIC776eJBQONqXYN5CXpcSRtL9gDfuwoQHTUxQ1UmNl4ysy2ESmBTpeEqFTXe_WVElloI9QFeRTH9vRH7NQi5XF9nn8L8MriIxiJ921T9AsBSc5queFelf9m8wdQLKPcaXO86e_sVaL8v4Z0S1IJ2upz0J8WIULNm-xX4ejG1kE5UteN6Bfn2JkLSX8iS7TIXm3s9mNmUWR9eDt7WHKtWk8FQXqq75xSYMn_BCj8DKo6sZ3_w",
    user: "Elena Vance",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtgEyxilLn6EOx1KJESyJ4l9scc-fWDCz-q2vsyEkaWLSThLqXrJDa78gSeH8eNPNevnuEuxQc5HxVNm91NjsrR5pBWAZfau778AWfgFvlceqpBwGQ8Bkz4jXviBcmWs_C1jlsbhbvCfwRDl_8PplouIDPrJNpclp9ilzY-9q-i9qCeifYXI2lOfZFlUdhp4bcyOj6eXxGP6NKaUy53fo54mdMcBBibueiyISOn5L8NtFjtv0ojyxmHQhcuCJ6KwHp-z7KBupGSTU",
    likes: 134, saved: true,
  },
  {
    id: 3,
    alt: "Nature",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwfBFdT13HjOL9uIDWX93kjUgq5wobxCe7KJczGxj69BXxHZt9l2R0fJX1e6kYj-KdyxuBoU13VSZMt94BIlcwJQlDRE8RM9rsyU667jbyPNvtqdT-0GSUV3LjQaB4XQT1CcjkwPqAuNBRFRwKt-Ll2z_Gez1zBcWcjKH-5SXVszE-m5Zz3TbTu7z0j8m2K4rs6QqPbuelhsvH52yMmujlSsYSkx3UA-FOuCvyJ_b1vfRChUtPq8uGFhLnZ-E-A1yO0cRuoaCVzjE",
    user: "Marcus Thorne",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIdkBtXFO-klhxavvs3u3jZImP7hJgc3DdEtm3lu0f036lOXdPYHdQWQGDMCybkzaJwBq3nAzhSIp4IwuKWlQ_EUhLGtjJYk4ZISHH4LbaB8f151tjTlreV9S_-J6SfV7MX9hit3D5YR_wwdIhpVDvvLtkiGtzfKo6WsMQ4PJHdg_6ek1_MiEo3CGx-Kh6eQtS2zfiae_LF8T2vv7xvrAgdz-jTjV_EFjmhgbscBNLxNSBLx4jEzP5tLbphA6pgPQ_a3netH9Dq2w",
    likes: 390, saved: false,
  },
  {
    id: 4,
    alt: "Urban Tech",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZfCexmNHlT_Oay_QrleOYjTwNXeBayCR7UKbAPeN7AbzKxeZAZ-bW2ZY5v4sMRIKK94DWaiz_ROncgd9EYGwZMClWT0MKEUgzJ0eLqdovHCV1_76IM_mKzon8VL_rG_OYBtOD0__43iTnKxGB15b5MDhzArA_C9ROwEC25QJdoKFDaMBTBCkl3cO6jYn5SG1-eABC5iKcWnF43GAZRMac6_FMyleQHVayFTFgwLrb40Os1lWYr7cuHnFSN4z-hv6cCKHqm9RsvEc",
    user: "Sarah Lee",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY_y2ciZWIyOlxprheLRfMP6jV7wt-xkhbvC5fElb7cPpYH6PwWaNOxOvfrFUkv_3vk3B_Ko6pnQPk2qzJdZhKqWxy_pPdVp2wdUQ6omtMMX5iY96b6mBRLoWhCOVzZxYdmce0Dy7OXMyfcVR2IWiJg-XIq5yO8aUDI0he3792CpfeoCYyehNwoklH5GZMYOgc90gE7nAt6Iw5NWYOy6tbjXw01tr5igowo5MxSIGSwKvYKwpJyo0oT5MRHCQCgAzXXiaPmx5WpoQ",
    likes: 77, saved: false,
  },
  {
    id: 5,
    alt: "Ocean Waves",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGACEe4JgwSluEDv6w0Q_aO-eAdx4T4e4n1V1SdTT4Oh9kYf_BIR8vb-vkTChfbfRQbi8JGocICZYd8idrYfwfuZiPqoqfzsDUuOiQqO8CXfsalzhVd0cCHdyWNuUiRNU65h3WDiGdFu4fwMXEGC-Dd0hiApypWvkAX3BAcWpnkZLz_BHH2lS_2r4rB_9Ou8ZhlquFa9Vy1y7qr2vyNrlh1ZDpKquYfbr1Crh2DBTQSUEPtkd4_fXwli6T8C3TPOAnqTgt4ZUpvJY",
    user: "Luna Rose",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuANPP-sIcHfwcQzwCIIvHAzZ9fKbIjfzge9PNgB0UCFn0OsHScPVSCgcvTzgaVD_xR_3fyJT6USgqyRSouANqvS2qUrGTqhlQ_6mvuZ9auq_3UeM4H2h1FxE2sRHoSix7htNjsg7GdPRgwG_eeK7pv20ZWX2Jlxut__Yq-LsbMe4yHXwqadsT26pzQuCGEglqXH-Ov1hGDlAGaWncfcb0a3AhFxc5THi-XX6rfxVoRSqsjL8OkKFDTrDcJdThAs1eTlayvH-wflqwM",
    likes: 512, saved: true,
  },
  {
    id: 6,
    alt: "Wildlife",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVtRBkVoktNBeBDHo6mW9xdXu_Eias-hf6E4BDZeldfDIb2GxUYmQ7Odwf3W21toQ29-dsA_0HJ_wew-eyebHuuT-9bqg0DwE5z2YyWGJxI7eITOLqb1qvSheCaZO-GXqMkSP7DqGkQWy8v-DLFUFc-lIhavM3etJPcmjadDA-edg-KM91Go-dsca9ds_57DR20GIthzz_t5iI5LbM_kCZtUrlxcrvfqj4ZWIa9cakYNwI_af8wTOIyUKhxqE5LJNnbIsRw2hLRzs",
    user: "Victor Kane",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5NCpn40sRnqIaaA3R2p3_xz2ycSRpuPcqlUlZtfqxaJxxCmVZG0I9rFtpq6Visj6XnwAZdwWb2hmIXP-u_JmIcPVqe3uDr7DSg5WNbg_ytQPPToEpLRe_eoxr6gFCBZzaKpvLeJXKTtuG6Dh-SMM4s2qpWjcaUAKm-6JQ9ALF7DQE0uomOEBqooxlD-h8Hmz7tzuqRRKm3taOuqCRzz3JE0cyuib6JZs22N65OHdkBduZuz6sCKSH6Gq_o2am8Af6xPjR4dZSD7E",
    likes: 201, saved: false,
  },
  {
    id: 7,
    alt: "Night City",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPInDQeQCXFIps3qudMCYryhISxDA5cWH85OkBKaevjzmkFm76gy9HpZZXR82TnjTJy6ysu75Qk79XdwrY_N48-zwtF77IbU8Ki2Kw9kl4zWCMd8w0agega73GzHurwZRXq-DxmASdLSTpffl8XpjVFeMS_tyPDwOeAqFQkTy0H50l_wO-XpgjDA7nL6Nj5yj8o1yK7yn_WR7Kwp7_ZsRIfrhxCU3W-ouTgVO9RuLsqRAcN1d0O9IVA9bj-S6qJgl1o3E7mlG8DzY",
    user: "Emma Stone",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh9Huk4VFDFZqcPU0VJo-o14MZLVw1Gkmp15MDWRoI2bTMKLJ1Y64wpRzPEdU3SuO5FMOs9Wecj2sfAzF1UEW91twwua_PUc9VqQbDMoMMBOXoXj657_xvsVMmuJlABHuN2rEk3teHVsGL50cDbUgZFv7bWksaTfTm3vg9ZZK6C2orbNzs4Aotkj-2puc4UXHHhjRtIwFCzAqHBd_AxRAWhkKY1CQ8-hxH1lYQqU3EB4GdEdOsnj0WnDq35TyCbAvGul331LF7VMw",
    likes: 445, saved: false,
  },
  {
    id: 8,
    alt: "Mountains",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-Ivr1-E8jRUyfRUNyI6RMjzRSlyCWjmHdCiloEjyrNH_cAWvI1-6ahZT5FOcjLyoL2aVheJ53KarUhmEveAhbChyarr7AmkXtv5DTDfhv5fPudf8iVGK8i4jeXZHfjiwQW6YAkc2QoAXoSQWNTNT12OfRkKdjpclqRaqLlZzScqTqRLf9Vq4YilP_v3QYLPYIyU4VzVFjwE6y-NvlLLt_kM168bhei-_nNSvCCY5YUUAryvFp4g7fCdf3Em4VYnzmPkDYcNn1ggk",
    user: "Chris Evans",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv6OZVMfDPDzMEuSFcUKVkdNX5hZ2Tw1SxMFn8kZo7epWgFSgzlCE4Owu8C833I-TZuzNpwSqRSFGoNtF_sVhYuuHHIvXtDUYTIGu6J2XAVUaQVtTaTnW6dL_26MPyYDuwi-8hBde_uPyjHQVU-EkoLqGTz_2njfkTYIgR0jUwAAx2GrxND62kbZwKs_pQTGIrMtCvJBBivlykAVSxsC_FmI8SayZS7mZtbQKGrLFsKAtS-kKadTxFDd_iYseY9Hv4ku0zNADArZ0",
    likes: 318, saved: true,
  },
];

const COLLECTIONS = [
  {
    id: 1,
    label: "Editorial",
    labelStyle: "bg-primary/20 text-primary border border-primary/30",
    title: "Nordic Silence",
    img: PHOTOS[0].img,
    count: "420 images • 1.2k curators",
    avatars: [PHOTOS[0].avatar, PHOTOS[1].avatar],
    extra: "+12",
  },
  {
    id: 2,
    label: "Architecture",
    labelStyle: "bg-white/10 text-white border border-white/10",
    title: "Concrete Brutalism",
    img: PHOTOS[1].img,
    count: "184 images • 850 curators",
    avatars: [PHOTOS[2].avatar, PHOTOS[3].avatar],
    extra: "+8",
  },
  {
    id: 3,
    label: "Cinematic",
    labelStyle: "bg-white/10 text-white border border-white/10",
    title: "After Hours",
    img: PHOTOS[2].img,
    count: "312 images • 2.4k curators",
    avatars: [PHOTOS[4].avatar, PHOTOS[5].avatar],
    extra: "+24",
  },
];

/* ─── Photo Card ─── */
function PhotoCard({ photo }: { photo: Photo }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(photo.saved);
  const [likes, setLikes] = useState(photo.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked((v) => !v);
    setLikes((n) => (liked ? n - 1 : n + 1));
  };
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved((v) => !v);
  };

  return (
    <div className="masonry-item relative group cursor-zoom-in animate-fade-in-up">
      <Link href={`/photo/${photo.id}`}>
        <div className="rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/5 dark:ring-white/5 light:ring-black/5">
          <img
            alt={photo.alt}
            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
            src={photo.img}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
            {/* top actions */}
            <div className="flex justify-end gap-2.5">
              <button
                onClick={handleSave}
                className={`size-10 rounded-full glass-card flex items-center justify-center hover:bg-white/20 transition-all ${saved ? "text-primary" : "text-white"}`}
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0" }}>
                  bookmark
                </span>
              </button>
              <button
                onClick={handleLike}
                className={`size-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 ${liked ? "bg-red-500 shadow-red-500/40" : "bg-primary shadow-primary/40"}`}
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}>
                  favorite
                </span>
              </button>
            </div>
            {/* bottom info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full overflow-hidden ring-2 ring-white/30">
                  <img alt={photo.user} className="w-full h-full object-cover" src={photo.avatar} />
                </div>
                <span className="text-sm font-bold tracking-tight">{photo.user}</span>
                <span className="text-xs opacity-70">{likes}</span>
              </div>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">download</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ─── Main Page ─── */
export default function DiscoveryPage() {
  const { theme, toggle } = useTheme();
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [activeCategory, setActiveCategory] = useState("All Discoveries");
  const [search, setSearch] = useState("");
  const [photoCount, setPhotoCount] = useState(8);
  const [allPhotos, setAllPhotos] = useState<Photo[]>(PHOTOS);

  useEffect(() => {
    async function fetchPhotos() {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && !error) {
        // Map Supabase layout to our frontend layout
        const dbPhotos: Photo[] = data.map((item) => ({
          id: item.id,
          alt: item.title || "User Photo",
          img: item.image_url,
          user: item.user_name || "Guest User",
          avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYgxy2-sXzpEER0TwK0pc7X7kkUga7StH5pDzJ8TUI54tauK8eee3bXqA_qXOcheJtSRrt7zahb0HYLLPr75QigzctdYWYnoAUWKlbx-KyR0ZSgF37OzplYYSs3VXdD-HVdbDbl2tQs-GpDBugCTDa52T3IIAUtlrlBRhUKAAVwzX-3eKHz3NyNmnfrNbBTnoFVBHDXHdJDsk97VrBIc-cZmjz6Y4zf2uoa_vsHmLBAXt2xkUr5a576-QLLSUXbAF2o7Jl56zojlU", // Re-use the default avatar for now
          likes: item.likes || 0,
          saved: false,
        }));

        // Put the newly uploaded ones at the top, then the dummy ones!
        setAllPhotos([...dbPhotos, ...PHOTOS]);
      }
    }
    fetchPhotos();
  }, []);

  const visiblePhotos = allPhotos
    .filter(p => !search || p.alt.toLowerCase().includes(search.toLowerCase()) || p.user.toLowerCase().includes(search.toLowerCase()))
    .slice(0, photoCount);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">

      {/* ─── HEADER ─── */}
      <header className="glass-nav sticky top-0 z-50 w-full px-6 lg:px-10 py-4">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-8">
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-8 flex-1">
            <div className="flex items-center gap-3 shrink-0">
              <div className="size-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-2xl">camera</span>
              </div>
              <span className="text-xl font-bold tracking-tight hidden sm:block">LensView</span>
            </div>
            <div className="flex-1 max-w-xl">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)] group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-white/5 dark:bg-white/5 border border-[var(--border)] rounded-full text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all placeholder:text-[var(--text-muted)] text-[var(--text)]"
                  placeholder="Search inspiration, photographers, or tags..."
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* Right: Nav + Actions */}
          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
              <Link href="/" className="text-primary">Explore</Link>
              <Link href="/community" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Community</Link>
              <Link href="/dashboard" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Analytics</Link>
              <Link href="/library" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Library</Link>
              <Link href="/boards" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Boards</Link>
            </nav>
            <div className="h-6 w-px bg-[var(--border)] hidden lg:block" />
            <div className="flex items-center gap-3">
              {/* Dark / Light toggle */}
              <button
                onClick={toggle}
                className="p-2.5 rounded-full hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 text-[var(--text-muted)] hover:text-[var(--text)] transition-all"
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <span className="material-symbols-outlined text-2xl">
                  {theme === "dark" ? "light_mode" : "dark_mode"}
                </span>
              </button>
              <button className="p-2.5 rounded-full hover:bg-white/10 dark:hover:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text)] transition-all relative">
                <span className="material-symbols-outlined text-2xl">notifications</span>
                <span className="absolute top-2.5 right-2.5 size-2 bg-primary rounded-full ring-2 ring-[var(--bg)]" />
              </button>
              <button className="p-2.5 rounded-full hover:bg-white/10 dark:hover:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text)] transition-all">
                <span className="material-symbols-outlined text-2xl">chat_bubble</span>
              </button>
              {user ? (
                <div className="relative group ml-2 mt-1">
                  <Link href="/profile" className="size-10 rounded-full overflow-hidden border-2 border-[var(--border)] group-hover:border-primary cursor-pointer transition-all shadow-xl block bg-slate-800">
                    {profile?.avatar_url ? (
                      <img alt="User" className="w-full h-full object-cover" src={profile.avatar_url} />
                    ) : (
                      <img alt="User" className="w-full h-full object-cover" src={`https://www.gravatar.com/avatar/${user.id}?d=retro`} />
                    )}
                  </Link>
                  <button onClick={signOut} className="absolute right-0 top-full mt-2 w-32 bg-[var(--bg)] border border-[var(--border)] px-4 py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg text-red-500 hover:bg-white/5">
                    Sign out
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsAuthOpen(true)} className="ml-2 px-5 py-2 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/85 active:scale-95 transition-all">
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* ─── CATEGORY BAR ─── */}
      <div className="w-full px-6 lg:px-10 py-6 sticky top-[73px] z-40 bg-[var(--bg)]/80 backdrop-blur-sm border-b border-[var(--border)]">
        <div className="max-w-[1800px] mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeCategory === c
                ? "bg-off-white text-deep-charcoal shadow-lg"
                : "bg-white/5 hover:bg-white/10 border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ─── MASONRY GRID ─── */}
      <main className="flex-1 px-6 lg:px-10 pb-16 pt-8">
        <div className="max-w-[1800px] mx-auto masonry-grid">
          {visiblePhotos.map((p) => (
            <PhotoCard key={p.id} photo={p} />
          ))}
        </div>
        {photoCount < allPhotos.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setPhotoCount((n) => n + 8)}
              className="px-10 py-4 rounded-full border border-[var(--border)] hover:bg-white/5 text-[var(--text)] font-bold transition-all hover:border-primary/40"
            >
              Load more inspiration
            </button>
          </div>
        )}
      </main>

      {/* ─── FOR CREATORS ─── */}
      <section className="w-full py-24 border-t border-[var(--border)]" style={{ background: "var(--bg-card)" }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">For Creators</h2>
            <p className="text-[var(--text-muted)] text-lg">Professional tools designed to elevate your photographic journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "insights", title: "Deep Analytics", desc: "Track reach, engagement, and audience demographics with our advanced performance dashboard.", cta: "View Demo", href: "/dashboard" },
              { icon: "view_quilt", title: "Inspiration Boards", desc: "Organize your mood boards with collaborative tools, perfect for planning your next editorial shoot.", cta: "Start Creating", href: "/boards" },
              { icon: "camera_outdoor", title: "Studio Tools", desc: "Manage bookings, client galleries, and digital contracts in one seamless professional interface.", cta: "Explore Tools", href: "/upload" },
            ].map((card) => (
              <div key={card.title} className="glass-card rounded-2xl p-8 hover:border-primary/50 transition-all group">
                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">{card.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-[var(--text-muted)] mb-6 leading-relaxed">{card.desc}</p>
                <Link href={card.href} className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  {card.cta} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRENDING COLLECTIONS ─── */}
      <section className="w-full py-24 bg-[var(--bg)]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Collections</h2>
              <p className="text-[var(--text-muted)] text-lg">Curated mood boards from the world's most innovative photographers.</p>
            </div>
            <Link href="/boards" className="text-primary font-semibold flex items-center gap-2 hover:underline">
              Browse all collections <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COLLECTIONS.map((col, idx) => (
              <Link href="/boards" key={col.id} className={`animate-fade-in-up delay-${(idx % 3) * 100}`}>
                <div className="group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                  <img
                    alt={col.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={col.img}
                  />
                  <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block backdrop-blur-md ${col.labelStyle}`}>
                      {col.label}
                    </span>
                    <h4 className="text-2xl font-bold mb-2 text-white">{col.title}</h4>
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {col.avatars.map((av, i) => (
                          <img key={i} alt="User" className="size-7 rounded-full border-2 border-[#121212] object-cover" src={av} />
                        ))}
                        <div className="size-7 rounded-full border-2 border-[#121212] bg-[#1a1a1a] flex items-center justify-center text-[10px] font-bold text-white">{col.extra}</div>
                      </div>
                      <span className="text-white/50 text-sm">{col.count}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA HERO ─── */}
      <section className="w-full py-32 relative overflow-hidden" style={{ background: "var(--bg-card)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] bg-primary rounded-full blur-[160px]" />
        </div>
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="text-center lg:text-left flex-1">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              Focus on your craft. <br />
              <span className="text-primary">We'll handle the rest.</span>
            </h2>
            <p className="text-xl text-[var(--text-muted)] mb-12 max-w-xl mx-auto lg:mx-0">
              Join a global network of over 10,000 professional photographers sharing, growing, and building their business together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-16">
              <Link
                href="/profile"
                className="w-full sm:w-auto px-10 py-5 bg-primary text-white text-lg font-bold rounded-full shadow-[0_20px_40px_-10px_rgba(19,164,236,0.4)] hover:scale-105 transition-all text-center"
              >
                Create your portfolio
              </Link>
              <Link
                href="/settings"
                className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-[var(--border)] hover:bg-white/10 text-[var(--text)] text-lg font-bold rounded-full transition-all text-center"
              >
                Explore Membership
              </Link>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-10 md:gap-20">
              {[["10k+", "Photographers"], ["2.4M", "Inspiring Works"], ["150+", "Daily Awards"]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <p className="text-3xl font-bold mb-1">{n}</p>
                  <p className="text-sm uppercase tracking-widest text-[var(--text-muted)]">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code Marketing Block */}
          <div className="shrink-0 animate-float lg:-mt-10">
            <div className="p-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] shadow-2xl md:rotate-3 hover:rotate-0 transition-all duration-500 max-w-[320px]">
              <img src="/qr.png" alt="Scan to join LensView" className="w-full h-auto object-contain rounded-2xl mb-4 bg-white p-4" />
              <h3 className="text-2xl font-black text-white text-center mb-2">Get the App</h3>
              <p className="text-white/50 text-sm text-center font-medium leading-relaxed">
                Scan this code to instantly access the LensView platform on your mobile device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="w-full bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10 text-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-xl">camera</span>
                </div>
                <span className="text-xl font-bold tracking-tight">LensView</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-6">The ultimate discovery and professional workspace platform for photographers around the globe.</p>
              <div className="flex gap-4">
                {["public", "videocam", "share"].map((icon) => (
                  <a key={icon} className="size-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors text-white/40 hover:text-primary" href="#">
                    <span className="material-symbols-outlined text-lg">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Platform", links: [["Discovery Feed", "/"], ["Trending Now", "/"], ["Photographer of the Year", "/profile"], ["Mobile App", "/"]] },
              { title: "Creators", links: [["Studio Suite", "/upload"], ["Portfolio Templates", "/profile"], ["Client Management", "/library"], ["Asset Protection", "/"]] },
              { title: "Company", links: [["About Us", "/"], ["Careers", "/"], ["Community Blog", "/community"], ["Press Kit", "/"]] },
              { title: "Support", links: [["Help Center", "/"], ["Safety Standards", "/"], ["Contact Support", "/"], ["Status", "/"]] },
            ].map((col) => (
              <div key={col.title}>
                <h5 className="text-sm font-bold uppercase tracking-widest text-white/80 mb-6">{col.title}</h5>
                <ul className="space-y-4 text-sm text-white/40">
                  {col.links.map(([text, href]) => (
                    <li key={text}>
                      <Link href={href} className="hover:text-primary transition-colors">{text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-white/20 font-medium tracking-widest uppercase">© 2024 LensView Photography Platform</p>
            <div className="flex gap-8 text-xs font-medium text-white/40">
              {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((t) => (
                <a key={t} className="hover:text-primary transition-colors" href="#">{t}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ─── FLOATING UPLOAD BUTTON ─── */}
      <div className="fixed bottom-10 right-10 z-40">
        <Link
          href="/upload"
          className="flex items-center gap-3 px-7 py-4 bg-primary text-white rounded-full shadow-[0_20px_40px_-10px_rgba(19,164,236,0.5)] hover:scale-105 active:scale-95 transition-all border border-white/10 font-bold tracking-wide"
        >
          <span className="material-symbols-outlined font-bold">add</span>
          Upload Work
        </Link>
      </div>
    </div>
  );
}
