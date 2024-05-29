import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "./components/Home.vue";

import ClothingView from "./components/Clothing.vue";
import ElectronicsView from "./components/Electronics.vue";
import GroceriesView from "./components/Groceries.vue";
import BestSellerView from "./components/BestSeller.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/clothing",
    name: "Favorites",
    component: ClothingView,
  },
  {
    path: "/electronics",
    name: "Ongoing",
    component: ElectronicsView,
  },
  {
    path: "/groceries",
    name: "Dislikes",
    component: GroceriesView,
  },
  {
    path: "/bestseller",
    name: "Top Rated",
    component: BestSellerView,
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
