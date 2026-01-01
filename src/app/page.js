import Link from "next/link";
import { HiSparkles, HiMail, HiArrowRight } from "react-icons/hi";
import { BsStars } from "react-icons/bs";
import FlowerCanvas from "@/components/FlowerCanvas";
import SearchLetters from "@/components/SearchLetters";
import letters from "@/data/letters.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      {/* Animación de flores y pétalos */}
      <FlowerCanvas />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16">
        {/* Título principal */}
        <div className="text-center mb-12">
          <h1 className="flex items-center justify-center gap-3 text-4xl md:text-6xl font-serif font-bold text-amber-700">
            <HiSparkles className="w-8 h-8 md:w-12 md:h-12" />
            <span>Cartas de Año Nuevo</span>
            <HiSparkles className="w-8 h-8 md:w-12 md:h-12" />
          </h1>
          <p className="mt-4 text-amber-600 text-lg md:text-xl">
            Gracias por un año tan increíble
          </p>
        </div>

        {/* Buscador y grid de cartas */}
        <SearchLetters letters={letters} />
      </main>
    </div>
  );
}
