import type { ProductoConPrecios } from "@/lib/supabase";

function formatoGs(valor: number): string {
  return `₲ ${valor.toLocaleString("es-PY")}`;
}

function EtiquetaPrecio({ precio }: { precio: ProductoConPrecios["precios"][number] }) {
  const cambio =
    precio.precio_anterior !== null && precio.precio_anterior !== 0
      ? ((precio.precio - precio.precio_anterior) / precio.precio_anterior) * 100
      : null;

  const subio = cambio !== null && cambio > 0.05;
  const bajo = cambio !== null && cambio < -0.05;

  return (
    <div className="etiqueta-precio flex flex-col gap-1 px-4 py-3">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-gris">
        {precio.supermercado}
      </span>
      <span className="font-display text-xl leading-none text-tinta">
        {formatoGs(precio.precio)}
      </span>
      {cambio !== null && (
        <span
          className={`inline-flex w-fit items-center gap-1 rounded px-1.5 py-0.5 text-xs font-bold ${
            subio
              ? "bg-rojo/10 text-rojo"
              : bajo
                ? "bg-bajo/10 text-bajo"
                : "text-gris"
          }`}
        >
          {subio ? "▲" : bajo ? "▼" : "•"} {Math.abs(cambio).toFixed(1)}%
        </span>
      )}
    </div>
  );
}

export function TarjetaProducto({ producto }: { producto: ProductoConPrecios }) {
  const conPrecio = producto.precios.filter((p) => p.precio > 0);

  return (
    <article className="tarjeta overflow-hidden">
      {/* Imagen -- si no hay, mostramos el nombre superpuesto en vez
          de un ícono roto o un cuadro vacío. */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100">
        {producto.imagen_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="absolute inset-0 h-full w-full object-contain p-4"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <p className="line-clamp-3 text-center text-sm font-medium text-gris">
              {producto.nombre}
            </p>
          </div>
        )}
      </div>

      <div className="p-5">
        <h2 className="font-display text-base leading-tight text-tinta">
          {producto.nombre}
        </h2>
        {producto.marca && (
          <p className="mb-3 mt-1 text-sm text-gris">{producto.marca}</p>
        )}
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {conPrecio.map((precio, i) => (
            <EtiquetaPrecio key={`${precio.supermercado}-${i}`} precio={precio} />
          ))}
        </div>
      </div>
    </article>
  );
}
