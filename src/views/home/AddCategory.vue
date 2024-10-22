<template>
  <div class="form-box">
    <div class="form-header">Add Category</div>
    <div class="divider"></div>
    <div class="input-container">
      <input
        v-model="categoryName"
        type="text"
        placeholder="Enter category name"
        class="category-input"
      />
    </div>

    <!-- Buttons -->
    <div class="buttons-container">
      <div @click="cancelForm" class="cancel-button">Cancel</div>
      <div @click="submitForm" class="confirm-button">Confirm</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCategoryStore } from "@/stores/category.store.js"; // Import the category store
import Swal from "sweetalert2"; // Import SweetAlert2

export default {
  setup() {
    const categoryName = ref("");
    const router = useRouter();
    const categoryStore = useCategoryStore(); // Access the store

    // Submit form
    const submitForm = async () => {
      const result = await categoryStore.addCategory(categoryName.value);
      if (result.success) {
        // Display success message using Swal
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: result.message,
          confirmButtonText: "OK",
        });
        router.push("/"); // Redirect after adding
      } else {
        // Display error message using Swal
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
          confirmButtonText: "OK",
        });
      }
    };

    // Cancel action (navigate back)
    const cancelForm = () => {
      router.push("/categories");
    };

    return {
      categoryName,
      submitForm,
      cancelForm,
    };
  },
};
</script>

<style scoped>
/* Centered form box with shadow */
.form-box {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); /* Slight shadow */
  margin: auto; /* Center horizontally */
  position: absolute; /* Positioning */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Adjust for centering */
}

/* Form header with bold text */
.form-header {
  text-align: center;
  color: black;
  font-size: 20px;
  font-family: Rubik, sans-serif;
  font-weight: bold; /* Make the text bold */
}

/* Divider line */
.divider {
  width: 100%;
  height: 1px;
  margin: 20px 0;
  background: #d9d9d9;
}

/* Input container */
.input-container {
  width: 100%;
  margin: 20px 0;
}

/* Styled input */
.category-input {
  width: 100%;
  height: 44px;
  padding: 12px;
  border-radius: 3px;
  border: 1px #4c9aff solid;
  outline: none;
  font-size: 14px;
  font-family: Rubik, sans-serif;
  color: #091e42;
}

/* Buttons container */
.buttons-container {
  display: flex;
  justify-content: center; /* Center buttons */
  margin-top: 20px;
}

/* Confirm button */
.confirm-button {
  width: 30%;
  padding: 10px;
  background-color: #0052cc;
  color: white;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  font-family: Rubik, sans-serif;
  font-weight: 500;
  margin-left: 10px; /* Add some space between buttons */
}

/* Cancel button */
.cancel-button {
  width: 30%;
  padding: 10px;
  background-color: white;
  color: #1963d2;
  border: 1px solid #1963d2;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  font-family: Rubik, sans-serif;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 600px) {
  .form-box {
    width: 90%;
    padding: 15px;
  }

  .confirm-button,
  .cancel-button {
    width: 48%; /* Ensure buttons fit well on smaller screens */
  }
}
</style>
