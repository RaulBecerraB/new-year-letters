"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { HiSparkles, HiStar } from "react-icons/hi";
import { BsStars } from "react-icons/bs";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

/**
 * Componente EnvelopeLetter
 * Sobre elegante con animación 3D de apertura
 */
export default function EnvelopeLetter({ name, message }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [isMounted]);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setShowConfetti(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative z-10">
      {/* Confetti continuo */}
      {isMounted && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={showConfetti ? 80 : 15}
          gravity={0.3}
          colors={["#FFD700", "#FFA500", "#FFFFFF", "#DAA520", "#F4C430", "#B8860B"]}
          recycle={true}
        />
      )}

      {/* Título */}
      <h1 className={`flex items-center gap-2 text-2xl md:text-4xl font-serif mb-10 text-amber-700 transition-all duration-700 ${isOpen ? "opacity-0 -translate-y-4" : "opacity-100"}`}>
        <HiSparkles className="w-6 h-6 md:w-8 md:h-8" />
        <span>Carta para {name}</span>
        <HiSparkles className="w-6 h-6 md:w-8 md:h-8" />
      </h1>

      {/* Contenedor del sobre con perspectiva 3D */}
      <div
        className="relative cursor-pointer select-none group"
        style={{ perspective: "1000px" }}
        onClick={handleOpen}
        role="button"
        aria-label="Abrir carta"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleOpen()}
      >
        {/* === SOBRE REDISEÑADO === */}
        <div className="relative w-[300px] md:w-[380px] h-[200px] md:h-[240px]">
          
          {/* Sombra del sobre */}
          <div className="absolute -bottom-3 left-4 right-4 h-8 bg-amber-900/20 blur-xl rounded-[50%]" />
          
          {/* Cuerpo del sobre (rectángulo principal) */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-200 to-amber-100 rounded-lg shadow-lg overflow-hidden">
            {/* Textura sutil */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]" />
          </div>

          {/* Pliegue interior en V (parte de atrás visible) */}
          <div 
            className="absolute top-0 left-0 right-0 h-[55%] bg-gradient-to-b from-amber-300 to-amber-200"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
          />

          {/* === SOLAPA SUPERIOR (con animación 3D) === */}
          <div
            className={`absolute top-0 left-0 right-0 z-50 transition-transform duration-700 ease-out origin-top ${isOpen ? "[transform:rotateX(-180deg)]" : "[transform:rotateX(0deg)]"}`}
            style={{ transformStyle: "preserve-3d", height: "55%" }}
          >
            {/* Cara frontal de la solapa (triángulo apuntando abajo) */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-amber-400 to-amber-300 shadow-md [backface-visibility:hidden]"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
            {/* Cara trasera de la solapa */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-amber-500 to-amber-400 [backface-visibility:hidden] [transform:rotateX(180deg)]"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
          </div>

          {/* Parte frontal inferior del sobre */}
          <div className="absolute bottom-0 left-0 right-0 h-[55%] z-10">
            {/* Triángulo inferior (pliegue frontal) */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-amber-100 to-amber-200 shadow-inner"
              style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 0)" }}
            />
          </div>

          {/* Borde decorativo */}
          <div className="absolute inset-0 rounded-lg border-2 border-amber-300 pointer-events-none z-40" />

          {/* Efecto hover */}
          <div className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/10 transition-all duration-300 pointer-events-none z-40" />
        </div>

        {/* Instrucción */}
        <p className={`flex items-center justify-center gap-2 mt-8 text-sm text-amber-600 transition-all duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`}>
          <span>Haz clic en el sobre para abrirlo</span>
        </p>
      </div>

      {/* === POPUP === */}
      {isMounted && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

          {/* Contenedor del mensaje */}
          <div className={`relative w-full max-w-lg max-h-[85vh] bg-gradient-to-b from-amber-50 to-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 delay-200 ${isOpen ? "scale-100 translate-y-0" : "scale-90 translate-y-8"}`}>
            
            {/* Decoración superior dorada */}
            <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />
            
            {/* Header */}
            <div className="bg-gradient-to-b from-amber-100 to-amber-50 px-6 py-4 text-center border-b border-amber-200">
              <div className="flex items-center justify-center gap-2 text-amber-600">
                <BsStars className="w-5 h-5" />
                <span className="font-serif text-lg font-semibold">Feliz Año Nuevo 2026</span>
                <BsStars className="w-5 h-5" />
              </div>
            </div>

            {/* Contenido scrolleable */}
            <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {/* Decoración */}
              <div className="flex items-center justify-center gap-3 mb-6 text-amber-400">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-300" />
                <HiStar className="w-4 h-4" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-300" />
              </div>

              {/* Saludo */}
              <h2 className="text-2xl md:text-3xl font-serif text-amber-700 text-center mb-6">
                Querido/a {name}
              </h2>

              {/* Mensaje */}
              <p className="font-serif text-base md:text-lg leading-relaxed text-amber-800 whitespace-pre-line text-center">
                {message}
              </p>

              {/* Decoración inferior */}
              <div className="flex items-center justify-center gap-3 mt-8 text-amber-400">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-300" />
                <HiStar className="w-4 h-4" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-300" />
              </div>

              {/* Año */}
              <div className="text-center mt-6">
                <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                  2026
                </span>
              </div>

              {/* Decoración de estrellas */}
              <div className="flex items-center justify-center gap-4 mt-4 text-amber-500">
                <HiSparkles className="w-5 h-5" />
                <BsStars className="w-6 h-6" />
                <HiSparkles className="w-5 h-5" />
              </div>
            </div>

            {/* Footer con botón */}
            <div className="bg-gradient-to-t from-amber-50 to-white px-6 py-4 border-t border-amber-100">
              <button
                onClick={handleClose}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Cerrar carta</span>
                <HiSparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
