import Link from "next/link";
import { HiSparkles, HiMail, HiArrowRight } from "react-icons/hi";
import { BsStars } from "react-icons/bs";
import FlowerCanvas from "@/components/FlowerCanvas";
import letters from "@/data/letters.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      {/* Animación de flores y pétalos */}
      <FlowerCanvas />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16">
        {/* Título principal */}
        <div className="text-center mb-12">
          <h1 className="flex items-center justify-center gap-3 text-4xl md:text-6xl font-serif font-bold text-amber-700 mb-4">
            <HiSparkles className="w-8 h-8 md:w-12 md:h-12" />
            <span>Cartas de Año Nuevo</span>
            <HiSparkles className="w-8 h-8 md:w-12 md:h-12" />
          </h1>
          <p className="text-lg md:text-xl text-amber-600 max-w-md mx-auto">
            Selecciona una carta para ver el mensaje especial de Año Nuevo 2026
          </p>
        </div>

        {/* Grid de cartas disponibles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
          {letters.map((letter) => (
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
          ))}
        </div>
      </main>
    </div>
  );
}
