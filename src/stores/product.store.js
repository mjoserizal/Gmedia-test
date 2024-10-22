import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useProductStore = defineStore("product", () => {
  const products = ref([]); // Menyimpan semua produk

  // Fetch semua produk
  const fetchAllProducts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token || null;

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/product`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        products.value = response.data.data;
      }
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  // Delete produk berdasarkan ID
  const deleteProduct = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token || null;

      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Hapus produk dari state jika berhasil dihapus dari server
        products.value = products.value.filter(
          (product) => product.id !== productId
        );
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Add new product
  const addProduct = async (productData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token || null;

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/product`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Accept both 200 and 201 as valid responses
      if (response.status === 200 || response.status === 201) {
        // Add the new product to the products array
        products.value.push(response.data.data); // Adjust if necessary
        console.log("Product added successfully:", response.data);
        return true; // Indicate success
      }
    } catch (error) {
      console.error("Error adding product:", error);
      return false; // Indicate failure
    }
  };

  return {
    products,
    fetchAllProducts,
    deleteProduct,
    addProduct, // Export the addProduct function
  };
});
