import { createClient } from "@supabase/supabase-js";

// Estas dos variables son PUBLICAS a propósito -- la "publishable key" de
// Supabase (antes llamada "anon key") solo permite lo que las políticas
// de RLS habilitan (ver habilitar_lectura_publica.sql: solo SELECT, nunca
// escritura).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PrecioTienda = {
  supermercado: string;
  precio: number;
  precio_anterior: number | null;
  fecha_captura: string;
};

export type ProductoConPrecios = {
  id: number;
  nombre: string;
  marca: string | null;
  ean: string | null;
  categoria: string | null;
  imagen_url: string | null;
  precios: PrecioTienda[];
};

const SELECT_PRODUCTO = `
  id,
  nombre,
  marca,
  ean,
  categoria,
  imagen_url,
  productos_tienda (
    id,
    supermercados ( nombre ),
    precios_historicos ( precio, fecha_captura )
  )
`;

function mapearProductos(productos: any[]): ProductoConPrecios[] {
  return productos.map((p: any) => {
    const precios: PrecioTienda[] = (p.productos_tienda ?? []).map((pt: any) => {
      const historial = (pt.precios_historicos ?? []).sort(
        (a: any, b: any) =>
          new Date(b.fecha_captura).getTime() - new Date(a.fecha_captura).getTime()
      );
      const ultimo = historial[0];
      const anterior = historial[1];
      return {
        supermercado: pt.supermercados?.nombre ?? "?",
        precio: ultimo?.precio ?? 0,
        precio_anterior: anterior?.precio ?? null,
        fecha_captura: ultimo?.fecha_captura ?? "",
      };
    });

    return {
      id: p.id,
      nombre: p.nombre,
      marca: p.marca,
      ean: p.ean,
      categoria: p.categoria,
      imagen_url: p.imagen_url,
      precios,
    };
  });
}

/**
 * Trae los productos marcados como "en_canasta" junto con el precio
 * MAS RECIENTE de cada supermercado donde se vende.
 */
export async function getProductosCanasta(): Promise<ProductoConPrecios[]> {
  const { data: productos, error } = await supabase
    .from("productos")
    .select(SELECT_PRODUCTO)
    .eq("en_canasta", true);

  if (error) throw error;
  return mapearProductos(productos ?? []);
}

/**
 * Busca productos por nombre en TODO el catálogo, opcionalmente
 * filtrado por categoría. Con el precio más reciente de cada tienda.
 */
export async function buscarProductos(
  query: string,
  categoria?: string | null
): Promise<ProductoConPrecios[]> {
  if (!query.trim() && !categoria) return [];

  let builder = supabase.from("productos").select(SELECT_PRODUCTO).limit(30);

  if (query.trim()) {
    builder = builder.ilike("nombre", `%${query.trim()}%`);
  }
  if (categoria) {
    builder = builder.eq("categoria", categoria);
  }

  const { data: productos, error } = await builder;

  if (error) throw error;
  return mapearProductos(productos ?? []);
}
