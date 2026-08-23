// Basado en las 21 categorías reales que expone la API de Biggie
// (api.app.biggie.com.py/api/classifications). Superseis usa otra
// taxonomía propia (más profunda, 3 niveles) que no mapeamos 1:1 --
// por eso "categoria" en productos queda null para productos que
// solo vienen de Superseis, y no aparecen al filtrar por categoría
// (sí aparecen en el buscador de texto libre).
export const CATEGORY_CONFIG: Record<string, { name: string; icon: string }> = {
    carniceria: { name: "Carnicería", icon: "🥩" },
  almacen: { name: "Productos básicos", icon: "🏪" },
    "fruteria-y-verduleria": { name: "Frutería y verdulería", icon: "🍎" },
  "bebidas-con-alcohol": { name: "Bebidas alcohólicas", icon: "🍷" },
  "bebidas-sin-alcohol": { name: "Bebidas sin alcohol", icon: "🥤" },
  lacteos: { name: "Lácteos", icon: "🥛" },
  "chocolates-y-golosinas": { name: "Confitería", icon: "🍫" },
  congelados: { name: " Alimentos Congelados", icon: "❄️" },
  "higiene-personal": { name: "Higiene", icon: "🧴" },
  limpieza: { name: "Limpieza", icon: "🧹" },
  panaderia: { name: "Panadería", icon: "🥖" },
  snacks: { name: "Snacks", icon: "🍿" },
  varios: { name: "Varios", icon: "🛒" },
};

export type CategoriaSlug = keyof typeof CATEGORY_CONFIG;
