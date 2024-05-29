import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import db from "../firebase";
import {
  
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const useProductStore = defineStore("KTs Anime Rankings", {
  state: () => ({
    products: [] as ProductDoc[],
  }),
  actions: {
    async init() {
      const productsCollection = collection(db, "Animes");
      const productsSnapshot = await getDocs(productsCollection);

      if (productsSnapshot.empty) {
        await Promise.all(
          initProducts.map((product) => {
            const productRef = doc(db, `Animes/${product.id}`);
            setDoc(productRef, product.data);
          })
        );
        this.products = initProducts; // Update Pinia state
      } else {
        this.products = productsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        }) as ProductDoc[];
      }
    },
    async createProduct(productData: ProductDoc) {
      if (confirm("Are you sure you want to add this Anime?")) {
        const newProductRef = doc(collection(db, "Animes"));
        await setDoc(newProductRef, productData.data);
        this.products.push({ id: newProductRef.id, data: productData.data });
        console.log("Product added with ID:", newProductRef.id);
      }
    },
    deleteProduct(productId: string) {
      console.log("Made it to the store");
      try {
        const productRef = doc(db, "Animes", productId);
        deleteDoc(productRef);
       
        this.products = this.products.filter(
          (product) => product.id !== productId
        );
      
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },

    filterByCategory(category: string) {
      if (!category) {
        return this.products;
      } else {
        return this.products.filter(
          (product) => product.data.category === category
        );
      }
    },

    filterByRating(minRating: number) {
      return this.products.filter(
        (product) => product.data.rating >= minRating
      );
    },
  },
});