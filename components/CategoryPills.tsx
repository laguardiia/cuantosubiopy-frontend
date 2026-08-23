"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORY_CONFIG } from "@/lib/categories";

type CategoryPillsProps = {
  categoriaActiva: string | null;
  onCategoriaChange: (slug: string | null) => void;
};

export function CategoryPills({ categoriaActiva, onCategoriaChange }: CategoryPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [puedeIzq, setPuedeIzq] = useState(false);
  const [puedeDer, setPuedeDer] = useState(false);

  const categorias = Object.entries(CATEGORY_CONFIG);

  function actualizarFlechas() {
    const el = scrollRef.current;
    if (!el) return;
    setPuedeIzq(el.scrollLeft > 4);
    setPuedeDer(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    actualizarFlechas();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", actualizarFlechas);
    window.addEventListener("resize", actualizarFlechas);
    return () => {
      el.removeEventListener("scroll", actualizarFlechas);
      window.removeEventListener("resize", actualizarFlechas);
    };
  }, []);

  function desplazar(direccion: "izq" | "der") {
    scrollRef.current?.scrollBy({
      left: direccion === "izq" ? -240 : 240,
      behavior: "smooth",
    });
  }

  return (
    <div className="mx-auto flex max-w-3xl items-center gap-1">
      <button
        onClick={() => desplazar("izq")}
        disabled={!puedeIzq}
        aria-label="Ver categorías anteriores"
        className={`shrink-0 rounded-full border border-gray-200 bg-white/70 p-1.5 text-tinta transition-opacity ${
          puedeIzq ? "hover:border-rojo/50" : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <button
          onClick={() => onCategoriaChange(null)}
          className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            categoriaActiva === null
              ? "border-rojo bg-rojo text-white"
              : "border-gray-200 bg-white/60 text-tinta hover:border-rojo/50"
          }`}
        >
          Todos
        </button>
        {categorias.map(([slug, { name, icon }]) => (
          <button
            key={slug}
            onClick={() => onCategoriaChange(slug)}
            className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              categoriaActiva === slug
                ? "border-rojo bg-rojo text-white"
                : "border-gray-200 bg-white/60 text-tinta hover:border-rojo/50"
            }`}
          >
            <span className="mr-1">{icon}</span>
            {name}
          </button>
        ))}
      </div>

      <button
        onClick={() => desplazar("der")}
        disabled={!puedeDer}
        aria-label="Ver más categorías"
        className={`shrink-0 rounded-full border border-gray-200 bg-white/70 p-1.5 text-tinta transition-opacity ${
          puedeDer ? "hover:border-rojo/50" : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
