<template>
  <v-app>
    <v-app-bar class="bg-blue-darken-4">
      <v-toolbar-title>Katie's Anime Ratings</v-toolbar-title>
      <div style="width: 20px;"></div>
      <v-btn class="mx-2" v-for="link in links" :key="link.text" :to="link.to">
  <v-icon>{{ link.icon }}</v-icon>
  {{ link.text }}
</v-btn>

      <div style="width: 30px;"></div>
      <!-- This button will trigger the dialog to open -->
      <v-btn class="mx-5" icon @click="showDialog = true">
        <v-icon>mdi-plus</v-icon>
        Add An Anime
      </v-btn>
      <div style="width: 70px;"></div>
    </v-app-bar>
    <v-main class="bg-blue-lighten-5">
      <router-view v-slot="{ Component }">
        <transition name="shrink-explode">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <v-dialog v-model="showDialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        Add Product
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="newProduct.name" label="Name"></v-text-field>
        <v-text-field v-model="newProduct.image" label="Image URL"></v-text-field>
        <v-text-field v-model="newProduct.description" label="Description"></v-text-field>
        <!-- <v-text-field v-model="newProduct.price" label="Price" type="number"></v-text-field> -->
        <v-text-field v-model="newProduct.rating" label="Rating" type="number"></v-text-field>
        <!-- <v-text-field v-model="newProduct.stock" label="Stock" type="number"></v-text-field> -->
        <v-select
        v-model="newProduct.category"
        :items="categories"
        label="Category"
        required
      ></v-select>
       
      </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"  @click="showDialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1"  @click="createProduct">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-footer class="bg-blue-darken-4" app>
      © 2024 Kts Anime Ratings. All rights reserved.
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import db from "./firebase";
import { collection, doc, setDoc } from 'firebase/firestore';

// Your links
const links = ref([
  { text: "Home", to: "/", icon: "mdi-home" },
  { text: "Ongoing", to: "/electronics", icon: "mdi-progress-clock" },
  { text: "Favorites", to: "/clothing", icon: "mdi-heart" },
  { text: "Dislikes", to: "/groceries", icon: "mdi-delete-forever" },
  { text: "Top Rated", to: "/bestseller", icon: "mdi-trophy-award" },
  // {text: "Add Product", to: "/add-product", icon: "mdi-plus"}
]);

// Dialog control
const showDialog = ref(false);
const categories = ['Dislikes', 'Ongoing', 'Favorites'];
// New product model
const newProduct = ref({
  name: '',
  image: '', 
  description: '',
  // price: 0,
  rating: 0, 
 // stock: 0,
  category: '' 
});



// Function to add a product to Firebase
const createProduct = async () => {
  if (confirm("Are you sure you want to add this product?")) {
    const productData = {
      name: newProduct.value.name,
      image: newProduct.value.image,
      rating: newProduct.value.rating,
      description: newProduct.value.description,
      //price: Number(newProduct.value.price),
      //stock: Number(newProduct.value.stock),
      category: newProduct.value.category
    };

    try {
      const newProductRef = doc(collection(db, "Animes"));
      await setDoc(newProductRef, productData);
      console.log("Product added with ID:", newProductRef.id);
      showDialog.value = false;
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  }
};
</script>

<style scoped>
.v-application .bg-blue-darken-4 {
  background-color: #57868e !important;
}

.v-application .bg-blue-lighten-5 {
  background-color: #d7d0d5!important;
}
</style>
