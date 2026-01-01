"use client";

import { useEffect, useRef, useState } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlayAttempted, setAutoPlayAttempted] = useState(false);

  useEffect(() => {
    // Intentar autoplay al montar (puede ser bloqueado por el navegador)
    const tryPlay = async () => {
      if (!audioRef.current) return;
      // reducir volumen por defecto para que no sea intrusiva
      audioRef.current.volume = 0.25;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        // Autoplay pudo ser bloqueado; dejamos el control al usuario
        setIsPlaying(false);
      } finally {
        setAutoPlayAttempted(true);
      }
    };

    tryPlay();
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        // Si falla reproducir, mantener estado
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
