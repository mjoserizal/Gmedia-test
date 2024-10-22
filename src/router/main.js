import HomeView from "@/views/home/index.vue";
import AddCategory from "@/views/home/AddCategory.vue";
import AddProduct from "@/views/home/AddProduct.vue";
import CartView from "@/views/home/CartView.vue";
import UserView from "@/views/user/index.vue";
import UserCreateView from "@/views/user/create.vue";
import UserUpdateView from "@/views/user/update.vue";

import ExampleLayout from "@/layouts/ExampleLayout.vue";

// middleware
import AuthMiddleware from "@/middleware/auth.middleware.js";
import NavbarLayout from "@/components/Navbar/NavbarLayout.vue"; // Corrected the import

export default [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home",
      layout: NavbarLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
    meta: {
      title: "Keranjang Belanja",
      layout: NavbarLayout,
      middleware: [AuthMiddleware], // Middleware untuk memeriksa autentikasi
    },
  },
  {
    path: "/products/add",
    name: "AddProduct",
    component: AddProduct,
    meta: {
      title: "Add Product",
      layout: NavbarLayout, // Apply the navbar layout
      middleware: [AuthMiddleware], // Include middleware if required
    },
  },

  {
    path: "/add-category",
    name: "AddCategory",
    component: AddCategory,
    meta: {
      title: "Add Category",
      layout: NavbarLayout, // Apply the navbar layout
      middleware: [AuthMiddleware], // Include middleware if required
    },
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    meta: {
      title: "User",
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: "/user/create",
    name: "user.create",
    component: UserCreateView,
    meta: {
      title: "User Create",
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: "/user/update",
    name: "user.update",
    component: UserUpdateView,
    meta: {
      title: "User Update",
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
];
