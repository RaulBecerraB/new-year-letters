"use client";

import { useEffect, useRef, useState } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = 0.15;

    // Sincronizar estado con eventos del audio
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  // Función para desbloquear y reproducir audio - debe llamarse desde un evento de usuario directo
  const unlockAndPlay = () => {
    const audio = audioRef.current;
    if (!audio || isUnlocked) return;

    // En iOS, necesitamos hacer play() directamente en el handler del evento
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsUnlocked(true);
          setIsPlaying(true);
        })
        .catch(() => {
          // Fallback: intentar con muted primero, luego unmute
          audio.muted = true;
          audio.play()
            .then(() => {
              audio.muted = false;
              setIsUnlocked(true);
              setIsPlaying(true);
            })
            .catch(() => {
              // El usuario tendrá que usar el botón
            });
        });
    }
  };

  // Detectar primera interacción
  useEffect(() => {
    if (isUnlocked) return;

    const handleFirstInteraction = () => {
      unlockAndPlay();
      // Remover todos los listeners después del primer intento
      document.removeEventListener("click", handleFirstInteraction, true);
      document.removeEventListener("touchend", handleFirstInteraction, true);
      document.removeEventListener("keydown", handleFirstInteraction, true);
    };

    // Usar capture phase para capturar el evento antes que otros handlers
    document.addEventListener("click", handleFirstInteraction, true);
    document.addEventListener("touchend", handleFirstInteraction, true);
    document.addEventListener("keydown", handleFirstInteraction, true);

    return () => {
      document.removeEventListener("click", handleFirstInteraction, true);
      document.removeEventListener("touchend", handleFirstInteraction, true);
      document.removeEventListener("keydown", handleFirstInteraction, true);
    };
  }, [isUnlocked]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
        playsInline
        aria-hidden="true"
        style={{ display: "none" }}
      />

      <button
        onClick={togglePlay}
        onTouchEnd={(e) => {
          e.preventDefault();
          togglePlay();
        }}
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