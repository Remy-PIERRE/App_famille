import type { ShoppingItem } from "@/types/ShoppingItem";

export const mockShopping: ShoppingItem[] = [
  { id: "s1", productId: "p1", name: "Jambon", quantity: 4, unit: "tranches" },
  { id: "s2", productId: "p2", name: "Fromage", quantity: 2, unit: "tranches" },
  {
    id: "s3",
    productId: "p3",
    name: "Pain de mie",
    quantity: 4,
    unit: "tranches",
  },
  { id: "s4", productId: "p6", name: "Œufs", quantity: 5, unit: "unit" },
  {
    id: "s5",
    productId: "p17",
    name: "Crème fraîche",
    quantity: 200,
    unit: "ml",
  },
  { id: "s6", productId: "p12", name: "Riz", quantity: 200, unit: "g" },
  { id: "s7", productId: "p11", name: "Poulet", quantity: 150, unit: "g" },
  {
    id: "s8",
    productId: "p19",
    name: "Pommes de terre",
    quantity: 300,
    unit: "g",
  },
  { id: "s9", productId: "p15", name: "Oignon", quantity: 2, unit: "unit" },
  { id: "s10", productId: "p14", name: "Tomates", quantity: 4, unit: "unit" },
];
