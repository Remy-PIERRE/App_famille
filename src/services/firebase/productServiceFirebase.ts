import { db } from "@/config/firebase";
import type { Product } from "@/types/Product";
import type { ProductService } from "@/types/services/ProductService";
import { collection, getDocs, addDoc } from "firebase/firestore";

const col = collection(db, "products");

export const productServiceFirebase: ProductService = {
  async getAll() {
    const snapshot = await getDocs(col);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  },

  async add(name: string) {
    const product = {
      name,
      defaultUnit: "unit",
    };

    const docRef = await addDoc(col, product);

    return {
      id: docRef.id,
      ...product,
    } as Product;
  },
};
