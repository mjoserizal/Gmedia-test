<template>
  <div class="tabs-container">
    <div class="tabs">
      <div
        v-for="(category, index) in categories"
        :key="category.id"
        class="tab"
        :class="{ active: selectedCategory === category.id }"
        @click="selectCategory(category.id)"
      >
        <div class="tab-name">{{ category.name }}</div>
        <div class="tab-line" v-if="selectedCategory === category.id"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, computed } from "vue"; // Add 'computed' to the import statement
import { useCategoryStore } from "@/stores/category.store"; // Adjust the path based on your directory structure

export default {
  props: {
    modelValue: {
      type: String, // for v-model compatibility
      default: "",
    },
  },
  setup(props, { emit }) {
    const categoryStore = useCategoryStore(); // Access the category store
    const selectedCategory = ref(props.modelValue); // Selected category synced with v-model

    // Watch for changes in modelValue to sync with selectedCategory
    watch(
      () => props.modelValue,
      (newVal) => {
        selectedCategory.value = newVal;
      }
    );

    // Fetch categories when component is mounted
    onMounted(async () => {
      await categoryStore.fetchCategories(); // Fetch categories from the store
    });

    // Get categories from the store
    const categories = computed(() => categoryStore.categories);

    // When a category is selected, update the selectedCategory and emit the event
    const selectCategory = (categoryId) => {
      selectedCategory.value = categoryId;
      emit("update:modelValue", categoryId); // Emit update for v-model
    };

    return {
      categories,
      selectedCategory,
      selectCategory,
    };
  },
};
</script>

<style scoped>
.tabs-container {
  margin-top: 20px;
  width: 100%;
  max-width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.tabs {
  width: 100%;
  height: 49px;
  display: flex;
  overflow-y: auto;
  white-space: nowrap;
  scrollbar-width: thin;
  padding-bottom: 10px;
}

.tabs::-webkit-scrollbar {
  width: 8px;
}

.tabs::-webkit-scrollbar-thumb {
  background: #aaa;
  border-radius: 10px;
}

.tabs::-webkit-scrollbar-track {
  background: transparent;
}

.tab {
  height: 33px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding: 0 20px;
  transition: color 0.3s;
}

.tab-name {
  text-align: center;
  color: #7a869a;
  font-size: 14px;
  font-family: Rubik, sans-serif;
  font-weight: 400;
  line-height: 16px;
}

.tab.active .tab-name {
  color: #1963d2;
  font-weight: 500;
}

.tab-line {
  height: 2px;
  background: #0052cc;
  width: 100%;
  border-radius: 1px;
}
</style>
