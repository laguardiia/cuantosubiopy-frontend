import { getProductosCanasta } from "@/lib/supabase";
import { TarjetaProducto } from "@/components/TarjetaProducto";
import { Buscador } from "@/components/Buscador";

function EstadoVacio() {
  return (
    <div className="tarjeta mx-auto max-w-lg p-8 text-center">
      <p className="font-display text-xl text-tinta">
        Todavía no hay productos en la canasta
      </p>
      <p className="mt-2 text-sm text-gris">
        Marcá productos con <code className="rounded bg-grisClaro px-1">en_canasta = true</code>{" "}
        en la base para que empiecen a aparecer acá.
      </p>
    </div>
  );
}

export const revalidate = 3600; // refrescar la página cada 1 hora

export default async function Home() {
  const productos = await getProductosCanasta();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <header className="mb-10 border-b-2 border-rojo pb-6 text-center">
        <h1 className="font-display text-5xl text-tinta sm:text-6xl">
          Cuánto<span className="text-rojo">Subió</span>Py
        </h1>
        <p className="mt-3 text-gris">
          Seguimos la evolución de precios en los supermercados de Paraguay,
          día a día.
          <br />
          Buscá cualquier producto y mirá cuánto subió a través del tiempo.
        </p>
      </header>

      <Buscador />

      <h2 className="mb-5 text-center font-display text-lg text-tinta">
        Productos destacados
      </h2>

      {productos.length === 0 ? (
        <EstadoVacio />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {productos.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </main>
  );
}
