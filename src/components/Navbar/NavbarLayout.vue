<template>
  <div class="navbar">
    <div class="logo">MASPOS</div>
    <div class="user-info">
      <span>{{ username }}</span>
      <div class="avatar">
        <div class="status-indicator"></div>
      </div>
    </div>
  </div>
  <div class="content p-5">
    <slot />
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.store.js";

export default {
  name: "NavbarLayout",
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    // Fetch the user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.name) {
      this.username = user.name;
    }
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 100px;
  background: #1963d2;
  display: flex;
  justify-content: space-between; /* Memastikan logo dan user info berada di tepi yang berlawanan */
  align-items: center; /* Menyelaraskan item secara vertikal */
  padding: 0 20px; /* Tambahkan padding untuk ruang di samping */
  box-sizing: border-box; /* Memastikan padding tidak menambah lebar total */
}

.logo {
  color: white;
  font-size: 20px;
  font-family: Rubik;
  font-weight: 600;
  margin-left: 150px; /* Margin kiri untuk logo */
}

.user-info {
  display: flex;
  align-items: center;
  color: white;
  font-size: 18px;
  font-family: Rubik;
  font-weight: 400;
  margin-right: 150px; /* Margin kanan untuk informasi pengguna */
}

.avatar {
  width: 40px;
  height: 40px;
  margin-left: 10px;
  border-radius: 50%;
  background-image: url(https://via.placeholder.com/40x40);
  background-size: cover;
  position: relative;
}

.status-indicator {
  width: 15px;
  height: 15px;
  background: #36b37e;
  border-radius: 50%;
  border: 2px solid white;
  position: absolute;
  bottom: 0;
  right: 0;
}

/* Responsiveness */
@media (max-width: 768px) {
  .navbar {
    height: 80px; /* Menyesuaikan tinggi navbar untuk perangkat lebih kecil */
    padding: 0 10px; /* Mengurangi padding */
  }

  .logo {
    font-size: 18px; /* Mengurangi ukuran font untuk logo */
    margin-left: 10px; /* Mengurangi margin kiri untuk perangkat kecil */
  }

  .user-info {
    font-size: 16px; /* Mengurangi ukuran font untuk user info */
    margin-right: 10px; /* Mengurangi margin kanan untuk perangkat kecil */
  }
}

@media (max-width: 480px) {
  .navbar {
    height: auto; /* Menyesuaikan tinggi navbar */
    padding: 10px; /* Menambahkan padding untuk ruang dalam */
    flex-direction: row; /* Pastikan elemen tetap sejajar dalam satu baris */
    justify-content: space-between; /* Tetap menjaga jarak antara logo dan user info */
  }

  .user-info {
    margin-top: 0; /* Menghilangkan margin atas */
    margin-right: 10px; /* Mengurangi margin kanan untuk perangkat kecil */
  }
}
</style>
