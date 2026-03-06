"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [isLogin, setIsLogin] = useState(true);
    const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [step, setStep] = useState<"input" | "verify">("input");

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            if (authMethod === "email") {
                if (isLogin) {
                    const { error } = await supabase.auth.signInWithPassword({ email, password });
                    if (error) throw error;
                    onClose();
                } else {
                    const { error } = await supabase.auth.signUp({ email, password });
                    if (error) throw error;
                    setMessage("Check your email for the confirmation link!");
                }
            } else if (authMethod === "phone") {
                if (step === "input") {
                    const { error } = await supabase.auth.signInWithOtp({ phone });
                    if (error) throw error;
                    setStep("verify");
                    setMessage("OTP sent to your phone.");
                } else {
                    const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: "sms" });
                    if (error) throw error;
                    onClose();
                }
            }
        } catch (err: any) {
            setError(err.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: { redirectTo: typeof window !== "undefined" ? window.location.origin : undefined },
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message || "Failed to sign in with Google.");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#131920] border border-white/10 rounded-3xl p-8 max-w-md w-full relative shadow-[0_0_50px_-10px_rgba(19,164,236,0.2)]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 size-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>

                <div className="text-center mb-6">
                    <div className="size-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl">{isLogin ? "login" : "person_add"}</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-white mb-2">{isLogin ? "Welcome Back" : "Create an Account"}</h2>
                    <p className="text-white/50 text-sm">{isLogin ? "Sign in to access your dashboard" : "Join the photographer community"}</p>
                </div>

                {/* --- Social Logins --- */}
                {step === "input" && (
                    <div className="mb-6 space-y-3">
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-100 transition-colors"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="size-5" />
                            Continue with Google
                        </button>

                        <div className="flex items-center gap-4 my-4">
                            <div className="h-px bg-white/10 flex-1" />
                            <span className="text-xs text-white/30 uppercase font-bold tracking-widest">or</span>
                            <div className="h-px bg-white/10 flex-1" />
                        </div>

                        {/* --- Method Toggle --- */}
                        <div className="flex p-1 bg-white/5 rounded-xl">
                            <button
                                onClick={() => setAuthMethod("email")}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${authMethod === "email" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
                            >
                                Email
                            </button>
                            <button
                                onClick={() => setAuthMethod("phone")}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${authMethod === "phone" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
                            >
                                Phone/SMS
                            </button>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {authMethod === "email" ? (
                        <div>
                            <input
                                type="email"
                                placeholder="creator@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 transition-colors mb-3"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>
                    ) : ( // Phone Auth Mode
                        <div>
                            {step === "input" ? (
                                <input
                                    type="tel"
                                    placeholder="+1 234 567 8900"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 transition-colors"
                                />
                            ) : (
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 transition-colors text-center text-xl tracking-[0.5em]"
                                />
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || (authMethod === "email" ? (!email || !password) : (step === "input" ? !phone : !otp))}
                        className={`w-full py-3.5 rounded-xl bg-primary text-white font-bold text-[15px] shadow-lg shadow-primary/20 transition-all ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/80 active:scale-[.98]"}`}
                    >
                        {loading ? "Please wait..." :
                            authMethod === "email" ? (isLogin ? "Sign In" : "Sign Up") :
                                (step === "input" ? "Send SMS Code" : "Verify & Login")
                        }
                    </button>

                    {authMethod === "phone" && step === "verify" && (
                        <button type="button" onClick={() => setStep("input")} className="w-full text-xs text-white/40 hover:text-white transition-colors">
                            Change Phone Number
                        </button>
                    )}
                </form>

                {step === "input" && (
                    <div className="mt-6 text-center text-sm text-white/50">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline font-bold transition-all">
                            {isLogin ? "Sign Up" : "Sign In"}
                        </button>
                    </div>
                )}

                {error && <p className="mt-4 text-center text-sm text-red-400 p-3 bg-red-400/10 rounded-lg">{error}</p>}
                {message && <p className="mt-4 text-center text-sm text-emerald-400 p-3 bg-emerald-400/10 rounded-lg">{message}</p>}
            </div>
        </div>
    );
}
