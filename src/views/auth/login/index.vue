<template>
  <div
    style="
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fafafa;
      position: relative;
    "
  >
    <div
      style="
        width: 100%;
        height: 50vh;
        left: 0px;
        top: 0px;
        position: absolute;
        background: #0052cc;
        z-index: 0;
      "
    ></div>
    <div
      style="
        position: absolute;
        left: 20px;
        top: 20px;
        color: white;
        font-size: 30px;
        font-family: Rubik;
        font-weight: 600;
        word-wrap: break-word;
        z-index: 1;
      "
    >
      MAS POS
    </div>
    <div
      style="
        position: absolute;
        right: 20px;
        top: 30px;
        color: white;
        font-size: 18px;
        font-family: Rubik;
        font-weight: 400;
        word-wrap: break-word;
        text-align: right;
        z-index: 1;
      "
    >
      Call Us +62 817-1902-092
    </div>
    <div
      style="
        width: 500px;
        height: 400px;
        background: white;
        box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.04);
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 2;
        position: relative;
      "
    >
      <form @submit.prevent="login" style="width: 100%; padding: 0 40px">
        <div
          style="
            text-align: center;
            margin-bottom: 24px;
            color: #303030;
            font-size: 21px;
            font-family: Rubik;
            font-weight: bold;
          "
        >
          Login
        </div>
        <div
          style="
            margin-bottom: 10px;
            color: #303030;
            font-size: 20px;
            font-family: Rubik;
            font-weight: 400;
          "
        >
          Username
        </div>
        <input
          type="text"
          v-model="formData.email"
          style="
            width: 100%;
            height: 44px;
            background: white;
            border-radius: 3px;
            border: 1px #4c9aff solid;
            padding-left: 8px;
          "
          placeholder="Enter your username"
          required
        />
        <div
          style="
            margin-top: 20px;
            margin-bottom: 10px;
            color: #303030;
            font-size: 20px;
            font-family: Rubik;
            font-weight: 400;
          "
        >
          Password
        </div>
        <input
          type="password"
          v-model="formData.password"
          style="
            width: 100%;
            height: 44px;
            background: #fafbfc;
            border-radius: 3px;
            border: 1px #dfe1e6 solid;
            padding-left: 8px;
          "
          placeholder="Enter password"
          required
        />
        <button
          type="submit"
          style="
            width: 20%;
            height: 44px;
            margin: 30px auto 0 auto;
            background: #0052cc;
            border-radius: 3px;
            color: white;
            font-size: 14px;
            font-family: Rubik;
            font-weight: 500;
            cursor: pointer;
            display: block;
          "
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.store.js";

export default {
  data() {
    return {
      authStore: useAuthStore(),
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.authStore.login(this.formData);
    },
  },
};
</script>
