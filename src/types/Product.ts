export interface Product {
  id: string;
  name: string;
  defaultUnit: "g" | "kg" | "unit" | "ml" | "l" | "piece" | "tranches";
}
