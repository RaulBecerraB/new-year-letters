"use client";

import { useEffect, useRef, useState } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    
    audioRef.current.volume = 0.15;

    // Listener para sincronizar estado cuando el audio se reproduce/pausa
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const audio = audioRef.current;
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Detectar primera interacción del usuario
    const handleUserInteraction = async () => {
      if (hasInteracted) return;
      
      // Marcar que ya interactuó
      setHasInteracted(true);

      if (audioRef.current && audioRef.current.paused) {
        try {
          // Intentar reproducir con replay silencioso primero (para forzar permisos)
          audioRef.current.currentTime = 0;
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            await playPromise;
          }
        } catch (err) {
          console.warn("Auto-play failed:", err);
          // Si falla, el usuario puede usar el botón
        }
      }
    };

    // Agregar listeners para detectar interacción
    document.addEventListener("click", handleUserInteraction, { once: false });
    document.addEventListener("touchstart", handleUserInteraction, { once: false });
    document.addEventListener("keydown", handleUserInteraction, { once: false });
    document.addEventListener("mousedown", handleUserInteraction, { once: false });

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
      document.removeEventListener("mousedown", handleUserInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          await playPromise;
        }
        setIsPlaying(true);
      } catch (err) {
        console.warn("Play failed:", err);
        setIsPlaying(false);
      }
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
        aria-hidden="true"
        style={{ display: "none" }}
      />

      <button
        onClick={togglePlay}
        title={isPlaying ? "Silenciar música" : "Reproducir música"}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        className={`fixed bottom-4 right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full transition-all duration-200 shadow-xl ${isPlaying ? "bg-amber-600 text-white ring-4 ring-amber-300/40 hover:scale-105" : "bg-amber-300 text-amber-800 ring-2 ring-amber-200 hover:scale-105"}`}
      >
        {isPlaying ? (
          <HiVolumeUp className="w-7 h-7" />
        ) : (
          <HiVolumeOff className="w-7 h-7" />
        )}
      </button>
    </div>
  );
}
