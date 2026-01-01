"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { HiMiniMagnifyingGlass, HiArrowRight } from "react-icons/hi2";
import { HiMail } from "react-icons/hi";
import { BsStars } from "react-icons/bs";

export default function SearchLetters({ letters }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLetters = useMemo(() => {
    if (!searchTerm.trim()) return letters;
    return letters.filter((letter) =>
      letter.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, letters]);

  return (
    <div className="w-full">
      {/* Buscador */}
      <div className="relative mb-8 w-full max-w-lg mx-auto">
        <div className="relative flex items-center">
          <HiMiniMagnifyingGlass className="absolute left-4 w-5 h-5 text-amber-500" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-amber-900 placeholder-amber-400 bg-white/80 border-2 border-amber-200 rounded-full shadow-md focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 text-amber-400 hover:text-amber-600 transition-colors"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid de cartas filtradas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full mx-auto">
        {filteredLetters.length > 0 ? (
          filteredLetters.map((letter) => (
            <Link
              key={letter.slug}
              href={`/letter/${letter.slug}`}
              className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Icono del sobre */}
              <div className="mb-3 text-amber-500 group-hover:animate-bounce">
                <HiMail className="w-10 h-10" />
              </div>

              {/* Nombre del destinatario */}
              <h2 className="text-xl font-serif font-semibold text-amber-700 mb-2">
                Carta para {letter.name}
              </h2>

              {/* Etiqueta decorativa */}
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-600 border border-amber-200">
                <BsStars className="w-3 h-3" />
                <span>Año Nuevo 2026</span>
              </span>

              {/* Flecha indicadora */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <HiArrowRight className="w-5 h-5" />
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-amber-600 text-lg">
              No se encontraron cartas para "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
