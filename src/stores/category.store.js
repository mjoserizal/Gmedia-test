import { defineStore } from "pinia";
import axios from "axios";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [], // Store for categories
  }),
  actions: {
    async fetchCategories() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user ? user.token : null;

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/category`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.categories = response.data.data || []; // Update state with fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async addCategory(name) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user ? user.token : null;

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/category`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add category");
        }

        const newCategory = await response.json();
        this.categories.push(newCategory); // Update state with new category

        return { success: true, message: "Category added successfully!" };
      } catch (error) {
        return { success: false, message: "Failed to add category." };
      }
    },
  },
});
