export interface ProductVariant {
  id: string;
  label: string; // "Paquet 4 tranches", "À la coupe"
  unit: "g" | "slice";
  quantity?: number; // ex : 4 tranches
}
