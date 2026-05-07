import type { Recipe } from "@/types/Recipe";

export const mockRecipes: Recipe[] = [
  {
    id: "r1",
    name: "Croque monsieur",
    ingredients: [
      {
        id: "i1",
        productId: "p1",
        name: "Jambon",
        quantity: 2,
        unit: "tranches",
      },
      {
        id: "i2",
        productId: "p2",
        name: "Fromage",
        quantity: 2,
        unit: "tranches",
      },
      {
        id: "i3",
        productId: "p3",
        name: "Pain de mie",
        quantity: 2,
        unit: "tranches",
      },
    ],
  },
  {
    id: "r2",
    name: "Omelette",
    ingredients: [
      { id: "i4", productId: "p6", name: "Œufs", quantity: 3, unit: "unit" },
      { id: "i5", productId: "p7", name: "Beurre", quantity: 10, unit: "g" },
    ],
  },
  {
    id: "r3",
    name: "Pâtes carbonara",
    ingredients: [
      { id: "i6", productId: "p13", name: "Pâtes", quantity: 100, unit: "g" },
      {
        id: "i7",
        productId: "p1",
        name: "Jambon",
        quantity: 2,
        unit: "tranches",
      },
      {
        id: "i8",
        productId: "p17",
        name: "Crème fraîche",
        quantity: 50,
        unit: "ml",
      },
    ],
  },
  {
    id: "r4",
    name: "Poulet riz",
    ingredients: [
      { id: "i9", productId: "p11", name: "Poulet", quantity: 150, unit: "g" },
      { id: "i10", productId: "p12", name: "Riz", quantity: 100, unit: "g" },
    ],
  },
  {
    id: "r5",
    name: "Gratin de pommes de terre",
    ingredients: [
      {
        id: "i11",
        productId: "p19",
        name: "Pommes de terre",
        quantity: 300,
        unit: "g",
      },
      {
        id: "i12",
        productId: "p17",
        name: "Crème fraîche",
        quantity: 100,
        unit: "ml",
      },
    ],
  },
  {
    id: "r6",
    name: "Riz sauté",
    ingredients: [
      { id: "i13", productId: "p12", name: "Riz", quantity: 100, unit: "g" },
      {
        id: "i14",
        productId: "p15",
        name: "Oignon",
        quantity: 1,
        unit: "unit",
      },
      { id: "i15", productId: "p16", name: "Ail", quantity: 1, unit: "unit" },
    ],
  },
  {
    id: "r7",
    name: "Soupe de légumes",
    ingredients: [
      {
        id: "i16",
        productId: "p14",
        name: "Tomates",
        quantity: 2,
        unit: "unit",
      },
      {
        id: "i17",
        productId: "p15",
        name: "Oignon",
        quantity: 1,
        unit: "unit",
      },
    ],
  },
  {
    id: "r8",
    name: "Champignons à la crème",
    ingredients: [
      {
        id: "i18",
        productId: "p18",
        name: "Champignons",
        quantity: 150,
        unit: "g",
      },
      {
        id: "i19",
        productId: "p17",
        name: "Crème fraîche",
        quantity: 50,
        unit: "ml",
      },
    ],
  },
  {
    id: "r9",
    name: "Pancakes",
    ingredients: [
      { id: "i20", productId: "p5", name: "Farine", quantity: 100, unit: "g" },
      { id: "i21", productId: "p4", name: "Lait", quantity: 200, unit: "ml" },
      { id: "i22", productId: "p6", name: "Œufs", quantity: 2, unit: "unit" },
    ],
  },
  {
    id: "r10",
    name: "Salade simple",
    ingredients: [
      {
        id: "i23",
        productId: "p14",
        name: "Tomates",
        quantity: 2,
        unit: "unit",
      },
      {
        id: "i24",
        productId: "p20",
        name: "Huile d'olive",
        quantity: 10,
        unit: "ml",
      },
    ],
  },
];
