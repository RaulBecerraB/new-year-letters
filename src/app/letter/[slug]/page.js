import { notFound } from "next/navigation";
import EnvelopeLetter from "@/components/EnvelopeLetter";
import FlowerCanvas from "@/components/FlowerCanvas";
import letters from "@/data/letters.json";

export async function generateStaticParams() {
  return letters.map((letter) => ({
    slug: letter.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const letter = letters.find((l) => l.slug === slug);

  if (!letter) {
    return {
      title: "Carta no encontrada",
    };
  }

  return {
    title: `Carta de Año Nuevo para ${letter.name}`,
    description: `Una carta especial de Año Nuevo 2026 para ${letter.name}`,
  };
}

export default async function LetterPage({ params }) {
  const { slug } = await params;
  const letter = letters.find((l) => l.slug === slug);

  if (!letter) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      {/* Animación de flores y pétalos */}
      <FlowerCanvas />

      {/* Componente del sobre con la carta */}
      <EnvelopeLetter
        name={letter.name}
        message={letter.message}
      />
    </main>
  );
}
