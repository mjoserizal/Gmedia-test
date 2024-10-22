<template>
  <div class="header-buttons">
    <!-- Button Add Category -->
    <div @click="addCategory" class="header-button">
      <div class="button-text">+ Add Category</div>
    </div>

    <!-- Button Add Products -->
    <div @click="addProducts" class="header-button">
      <div class="button-text">+ Add Products</div>
    </div>

    <!-- Button Cart -->
    <div @click="goToCart" class="cart-button">
      <div class="button-text">Cart</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderButtons",
  methods: {
    addCategory() {
      this.$router.push("/add-category"); // Redirect ke /add-category
    },
    addProducts() {
      this.$router.push("/products/add");
    },
    goToCart() {
      console.log("Cart clicked");
    },
  },
};
</script>

<style scoped>
.header-buttons {
  width: 100%;
  height: 80px;
  padding: 20px; /* Padding untuk seluruh area tombol */
  display: flex;
  justify-content: flex-end; /* Mengatur tombol ke kanan */
  align-items: center; /* Mengatur tombol ke tengah secara vertikal */
  gap: 15px; /* Jarak antara tombol */
  overflow: hidden; /* Mencegah overflow */
  margin-right: 230px; /* Margin kanan untuk layar besar */
}

.header-button,
.cart-button {
  padding: 10px 20px; /* Padding atas/bawah dan kiri/kanan */
  background: rgba(179, 212, 255, 0.6);
  border-radius: 3px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s; /* Transisi untuk hover */
}

.cart-button {
  background: #0052cc; /* Warna latar belakang untuk tombol keranjang */
}

.button-text {
  text-align: center;
  color: #0052cc; /* Warna teks default untuk tombol lainnya */
  font-size: 14px;
  font-family: Rubik, sans-serif; /* Pastikan ada font fallback */
  font-weight: 500;
  line-height: 20px;
  word-wrap: break-word;
}

/* Ubah warna teks Cart menjadi putih */
.cart-button .button-text {
  color: white; /* Warna teks untuk tombol Cart */
}

/* Hover Effect */
.header-button:hover,
.cart-button:hover {
  background: rgba(179, 212, 255, 0.8); /* Warna saat hover */
}

.cart-button:hover {
  background: #003d99; /* Warna saat hover pada keranjang */
}

/* Responsivitas */
@media (max-width: 768px) {
  .header-buttons {
    justify-content: space-between; /* Memastikan tombol menyebar merata */
    margin-right: 0; /* Menghapus margin kanan pada layar kecil */
    padding: 10px; /* Kurangi padding pada layar kecil */
  }

  .header-button,
  .cart-button {
    flex: 1; /* Membuat tombol mengambil ruang yang sama */
    margin: 0; /* Menghapus margin untuk mencegah overflow */
    min-width: 80px; /* Menentukan lebar minimum untuk tombol */
  }
}
</style>
