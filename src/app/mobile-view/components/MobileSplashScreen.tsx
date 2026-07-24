"use client";

import { useState, useEffect, useRef } from "react";

interface MobileSplashScreenProps {
  isDataLoaded: boolean;
  onComplete: () => void;
}

export default function MobileSplashScreen({ isDataLoaded, onComplete }: MobileSplashScreenProps) {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Attempt video playback on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("[Splash] Video autoplay fallback triggered:", err);
        setVideoEnded(true);
      });
    }
  }, []);

  // Safety fallback timer (max 6s) in case video fails or loops endlessly
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoEnded(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Trigger fade out and complete callback when BOTH video is finished AND data is loaded
  useEffect(() => {
    if (videoEnded && isDataLoaded) {
      setIsFadingOut(true);
      const fadeTimer = setTimeout(() => {
        onComplete();
      }, 450); // Match CSS fade duration
      return () => clearTimeout(fadeTimer);
    }
  }, [videoEnded, isDataLoaded, onComplete]);

  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src="/splash-animation.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="w-full h-full object-cover"
      />
      {!isDataLoaded && videoEnded && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs font-semibold animate-pulse shadow-lg">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          <span>Finalizing Dashboard Data...</span>
        </div>
      )}
    </div>
  );
}
