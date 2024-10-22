import { defineStore } from "pinia";
import { getActivePinia } from "pinia";
import { axiosWrapper } from "@/helper/axios-wrapper.js";
import router from "@/router/index.js";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null, // Menetapkan default ke null jika tidak ada user
    authError: null,
  }),
  actions: {
    async login(data) {
      try {
        const user = await axiosWrapper.post(`${baseUrl}/login`, data, true);

        if (user && user.status === 200) {
          this.user = user.data;
          localStorage.setItem("user", JSON.stringify(user.data));
          router.push("/");
        } else {
          this.authError = "Login failed."; // Menangani error login
        }
      } catch (error) {
        console.error("Login error:", error); // Mencetak kesalahan ke konsol
        this.authError = error.response?.data?.message || "Login error."; // Menyimpan pesan error
      }
    },
    async register(data) {
      try {
        const registerResponse = await axiosWrapper.post(
          `${baseUrl}/register`,
          data,
          true
        );

        if (registerResponse && registerResponse.status === 201) {
          // Cek status untuk sukses
          router.push("/login");
        } else {
          this.authError = "Registration failed."; // Menangani error registrasi
        }
      } catch (error) {
        console.error("Registration error:", error);
        this.authError = error.response?.data?.message || "Registration error."; // Menyimpan pesan error
      }
    },
    async logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/login");

      // Reset semua store aktif
      getActivePinia()._s.forEach((store) => store.$reset());
    },
  },
});
