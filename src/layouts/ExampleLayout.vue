<template>
  <div
    style="width: 100%; height: 100px; position: relative; background: #1963d2"
  >
    <div
      style="
        left: 150px;
        top: 38px;
        position: absolute;
        text-align: right;
        color: white;
        font-size: 20px;
        font-family: Rubik;
        font-weight: 600;
        word-wrap: break-word;
      "
    >
      MASPOS
    </div>
    <div
      style="
        left: 1163px;
        top: 40px;
        position: absolute;
        text-align: right;
        color: white;
        font-size: 18px;
        font-family: Rubik;
        font-weight: 400;
        word-wrap: break-word;
      "
    >
      Taufik00
    </div>
    <div
      style="
        width: 40px;
        height: 40px;
        padding-top: 27px;
        padding-left: 27px;
        left: 1250px;
        top: 30px;
        position: absolute;
        border-radius: 64px;
        background-image: url(https://via.placeholder.com/40x40);
        justify-content: flex-end;
        align-items: center;
        display: inline-flex;
      "
    >
      <div
        style="
          width: 15px;
          height: 15px;
          position: relative;
          background: #36b37e;
          border-radius: 10px;
          border: 2px white solid;
        "
      ></div>
    </div>
  </div>
  <div class="p-5">
    <slot />
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.store.js";

export default {
  name: "ExampleLayout",
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
};
</script>

<style>
.link {
  @apply px-2 cursor-pointer hover:text-red-400;
}
</style>
