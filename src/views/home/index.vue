<template>
  <div class="home-page">
    <HeaderButtons />
    <CategoryTabs v-model="selectedCategory" />
    <div class="products-container">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
      >
        <img
          class="product-image"
          :src="product.picture_url || 'https://via.placeholder.com/200x165'"
          alt="Product Image"
        />
        <div class="product-name">{{ product.name || "Unknown Product" }}</div>
        <div class="product-price">
          Rp. {{ product.price.toLocaleString() || "0" }}
        </div>
        <button class="add-to-cart-button">+ Add to Cart</button>
        <button class="delete-badge" @click="handleDelete(product.id)">
          Delete
        </button>
      </div>
    </div>

    <!-- Total Bill Section -->
    <div class="total-bill">
      <div class="total-bill-container">
        <div class="total-bill-text">
          Total Bill : Rp. {{ totalBill.toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "@/stores/product.store"; // Import store
import HeaderButtons from "@/components/HeaderButtons/HeaderButtons.vue";
import CategoryTabs from "@/components/CategoryTabs.vue";
import Swal from "sweetalert2";
export default {
  components: {
    HeaderButtons,
    CategoryTabs,
  },
  setup() {
    const productStore = useProductStore(); // Inisialisasi store
    const selectedCategory = ref(null); // Menyimpan kategori yang dipilih

    // Ambil semua produk saat komponen di-mount
    onMounted(() => {
      productStore.fetchAllProducts();
    });

    // Filter produk berdasarkan kategori
    const filteredProducts = computed(() => {
      return selectedCategory.value
        ? productStore.products.filter(
            (product) => product.category_id === selectedCategory.value
          )
        : productStore.products; // Tampilkan semua produk jika kategori tidak dipilih
    });

    // Fungsi untuk handle delete produk
    const handleDelete = async (productId) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await productStore.deleteProduct(productId);
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    };

    // Compute total bill based on the filtered products
    const totalBill = computed(() => {
      return filteredProducts.value.reduce(
        (acc, product) => acc + product.price,
        0
      );
    });

    return {
      selectedCategory,
      filteredProducts,
      handleDelete,
      totalBill,
    };
  },
};
</script>

<style scoped>
/* Mengatur body untuk mencegah overflow horizontal */
body {
  overflow-x: hidden;
  margin: 0; /* Hapus margin default */
  padding: 0; /* Hapus padding default */
  box-sizing: border-box; /* Mengatur box-sizing global */
}

/* Mengatur box-sizing untuk semua elemen */
*,
*::before,
*::after {
  box-sizing: inherit; /* Mewariskan box-sizing dari body */
}

.home-page {
  padding: 20px; /* Tambahkan padding agar tidak terlalu dekat dengan tepi */
  display: flex;
  flex-direction: column; /* Membuat konten teratur dalam kolom */
  align-items: center; /* Mengatur konten di tengah */
  width: 100%; /* Pastikan lebar 100% */
}

.products-container {
  margin: 50px; /* Margin untuk layar besar */
  display: flex;
  flex-wrap: wrap; /* Agar produk mengalir ke baris baru */
  justify-content: center; /* Menempatkan produk di tengah */
  padding: 0 10px; /* Menghindari margin/padding di sisi */
}

.product-card {
  width: 200px; /* Width fixed */
  height: 300px; /* Height fixed */
  position: relative;
  background: white;
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  overflow: hidden;
  margin: 10px; /* Spasi antara produk */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align items */
  justify-content: flex-start; /* Start from top */
}

.product-image {
  width: 100%; /* Full width of the card */
  height: 165px; /* Fixed height */
  background: linear-gradient(
    0deg,
    #0052cc 0%,
    #0052cc 100%
  ); /* Placeholder color */
  object-fit: cover; /* Ensure the image covers the area without distortion */
}

.product-name {
  position: absolute;
  left: 15px;
  top: 175px; /* Adjusted position for product name */
  color: black;
  font-size: 14px;
  font-family: Rubik, sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
}

.product-price {
  position: absolute;
  left: 15px;
  top: 200px; /* Adjusted position for price */
  color: black;
  font-size: 16px;
  font-family: Rubik, sans-serif;
  font-weight: 600;
  line-height: 20px;
  word-wrap: break-word;
}

.add-to-cart-button {
  position: absolute;
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Center alignment */
  bottom: 10px; /* Adjusted for bottom positioning */
  background: #0052cc;
  border-radius: 3px;
  color: white;
  font-size: 12px;
  font-family: Rubik, sans-serif;
  font-weight: 500;
  line-height: 20px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
}

.delete-badge {
  position: absolute;
  left: 149px;
  top: 175px;
  background: #de350b;
  border-radius: 3px;
  color: white;
  font-size: 8px;
  font-family: Rubik, sans-serif;
  font-weight: 500;
  line-height: 20px;
  padding: 2px 5px;
  text-align: center;
}

.total-bill {
  margin-right: 130px; /* Default margin for larger screens */
  position: fixed; /* Fixed position */
  bottom: 20px; /* Adjust distance from the bottom */
  right: 20px; /* Adjust distance from the right */
}

.total-bill-container {
  width: 205px;
  height: 59px;
  background: #1963d2;
  border-radius: 10px;
  display: flex; /* Center content */
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.total-bill-text {
  color: white;
  font-size: 16px;
  font-family: Rubik;
  font-weight: 600;
  word-wrap: break-word;
}

@media (max-width: 768px) {
  .products-container {
    margin: 20px; /* Kurangi margin untuk perangkat kecil */
  }
  .total-bill {
    margin-right: 10px; /* Smaller margin for medium devices */
  }
  .product-card {
    width: calc(50% - 20px); /* Lebar produk di perangkat kecil */
    height: 250px; /* Adjust height for medium devices */
  }

  .total-bill {
    justify-content: center; /* Center total bill on smaller screens */
  }
}

@media (max-width: 480px) {
  .products-container {
    margin: 10px; /* Margin lebih kecil untuk perangkat sangat kecil */
  }
  .total-bill {
    margin-right: 0; /* Remove margin for very small devices */
    /* Adjust position if necessary for very small devices */
  }
  .product-card {
    width: calc(
      100% - 20px
    ); /* Produk memenuhi lebar layar pada perangkat sangat kecil */
    height: auto; /* Maintain aspect ratio */
  }

  /* Pastikan elemen di atas tidak bertabrakan */
  .home-page {
    padding: 10px; /* Mengurangi padding pada perangkat kecil */
  }

  HeaderButtons,
  CategoryTabs {
    width: 100%; /* Pastikan kedua komponen ini memenuhi lebar layar */
    margin-bottom: 10px; /* Spasi di bawah komponen */
  }
}
</style>
