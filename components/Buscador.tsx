"use client";

import { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { buscarProductos, type ProductoConPrecios } from "@/lib/supabase";
import { TarjetaProducto } from "./TarjetaProducto";
import { CategoryPills } from "./CategoryPills";

export function Buscador() {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState<string | null>(null);
  const [resultados, setResultados] = useState<ProductoConPrecios[]>([]);
  const [cargando, setCargando] = useState(false);
  const [buscoAlMenosUnaVez, setBuscoAlMenosUnaVez] = useState(false);

  const hayFiltroActivo = query.trim() !== "" || categoria !== null;

  useEffect(() => {
    if (!hayFiltroActivo) {
      setResultados([]);
      setBuscoAlMenosUnaVez(false);
      return;
    }

    setCargando(true);
    const timeout = setTimeout(() => {
      buscarProductos(query, categoria)
        .then((r) => {
          setResultados(r);
          setBuscoAlMenosUnaVez(true);
        })
        .catch((err) => {
          console.error("Error buscando productos:", err);
          setResultados([]);
        })
        .finally(() => setCargando(false));
    }, 350); // debounce: espera a que dejes de tipear

    return () => clearTimeout(timeout);
  }, [query, categoria, hayFiltroActivo]);

  return (
    <div className="mb-12">
      <div className="mx-auto flex max-w-xl items-center gap-3 rounded-full border-2 border-rojo bg-white/50 px-6 py-3 shadow-lg backdrop-blur-md">
        <Search size={20} className="shrink-0 text-rojo" strokeWidth={2.5} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscá un producto, ej: arroz, aceite, coca cola..."
          className="flex-1 border-none bg-transparent text-tinta outline-none placeholder:text-gris"
        />
        {cargando && (
          <Loader2 size={18} className="shrink-0 animate-spin text-rojo" />
        )}
      </div>

      <div className="mt-4">
        <CategoryPills categoriaActiva={categoria} onCategoriaChange={setCategoria} />
      </div>

      {hayFiltroActivo && (
        <div className="mx-auto mt-6 max-w-7xl">
          {buscoAlMenosUnaVez && resultados.length === 0 && !cargando && (
            <p className="text-center text-gris">
              No encontré productos
              {query.trim() && <> con &quot;{query}&quot;</>}.
            </p>
          )}
          {resultados.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {resultados.map((producto) => (
                <TarjetaProducto key={producto.id} producto={producto} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
