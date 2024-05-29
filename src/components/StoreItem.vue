<template>
<div>
  <v-card>
    <v-card-title>
        <div class="text-h4" style="word-wrap: break-word; white-space: normal;">{{ product.data.name }}</div>
      </v-card-title>

    <v-row align="center" class="pa-4">
      <v-rating
        :model-value="product.data.rating"
        color="orange-lighten-3"
        readonly
        size="20"
        class="mx-2"
      ></v-rating>
    </v-row>

    <v-row >
      <v-col cols="12">
        <v-img
          :src="product.data.image"
          width="auto"
          height="auto"
          class="mx-auto"
        ></v-img>
      </v-col>
    </v-row>
      
    <v-row no-gutters>
      <v-col cols="12">
        <v-card-text class="my-1">
          <!-- Description label as a subheader in its own block -->
          <v-subheader class="mt-3 mb-0 text-h6">Description:</v-subheader>
          <!-- Description text in its own block, ensuring new line -->
          <div>{{ product.data.description }}</div>
        </v-card-text>
      </v-col>
    </v-row>

    <div class="d-flex justify-space-between align-center pa-2">
      <v-btn dense color="#57868e" @click="startEditing" style="padding: 4px 10px; min-width: 50px; font-size: 0.8rem;">Modify</v-btn>
      <v-btn dense color="red" @click="deleteProduct" style="padding: 0px 0px; min-width: 0px; font-size: 0.0rem;">Delete</v-btn>
      
    </div>
    </v-card>

    <v-dialog v-model="isEditing" persistent max-width="600px">
      <v-card>
        <v-card-title>Edit Product</v-card-title>
        <v-card-text>
          <v-text-field v-model="editableProduct.name" label="Name"></v-text-field>
          <v-text-field v-model="editableProduct.description" label="Description"></v-text-field>
          <v-text-field v-model="editableProduct.image" label="Image URL"></v-text-field>
          <!-- <v-text-field v-model="editableProduct.price" label="Price" type="number"></v-text-field> -->
        <v-text-field v-model="editableProduct.rating" label="Rating" type="number"></v-text-field>
        <!-- <v-text-field v-model="editableProduct.stock" label="Stock" type="number"></v-text-field> -->
          <!-- ... other fields ... -->
          <v-select
            v-model="editableProduct.category"
            :items="categories"
            label="Category"
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="isEditing = false">Cancel</v-btn>
          <v-btn color="green" @click="updateProduct">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive} from "vue";
import { ProductDoc } from "../types/product";
import { useProductStore } from "../stores/ProductStore";
import { doc, updateDoc } from "firebase/firestore";
import db from "../firebase";

const { product } = defineProps<{
  product: ProductDoc;
}>();

const productStore = useProductStore();
const isEditing = ref(false);


const editableProduct = reactive({ ...product.data });


const categories = ['Favorites', 'Ongoing', 'Dislikes'];


const startEditing = () => {
  Object.assign(editableProduct, product.data); // Reset any changes
  isEditing.value = true;
};


const updateProduct = async () => {
  if (confirm("Are you sure you want to update this product?")) {
    try {
      const productRef = doc(db, "Animes", product.id);
      await updateDoc(productRef, { ...editableProduct });
      Object.assign(product.data, editableProduct); // Update local state
      isEditing.value = false;
      console.log("Product updated with ID:", product.id);
      // Trigger reactivity in case you are using it to display
      //productStore.triggerUpdate();
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  }
};

const deleteProduct = async () => {
  // console.log('Deleting product:', product.id);
  // await productStore.deleteProduct(product.id);

  if (confirm("Do you want to delete this item?" + product.id)) {
    productStore.deleteProduct(product.id);
  }
};
</script>