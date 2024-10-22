<template>
  <div>
    <div class="container">
      <div class="card">
        <!-- Upload Image Section (Kiri) -->
        <div class="left-section">
          <div class="upload-section" @click="triggerFileUpload">
            <div class="upload-box">
              <img
                v-if="previewImage"
                :src="previewImage"
                alt="Preview"
                class="upload-preview"
              />
              <div v-if="!previewImage" class="upload-text">Upload Image</div>
            </div>
            <input
              type="file"
              id="fileInput"
              ref="fileInput"
              @change="handleFileUpload"
              class="file-input"
              style="display: none"
            />
          </div>
        </div>

        <!-- Form Section (Kanan) -->
        <div class="right-section">
          <div class="form-title">Add Product</div>
          <div class="separator"></div>

          <div class="form-group">
            <label class="form-label">Product Name</label>
            <input
              type="text"
              v-model="productName"
              class="form-input"
              placeholder="Enter product name"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Price</label>
            <input
              type="number"
              v-model="price"
              class="form-input"
              placeholder="Enter price"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Select Category</label>
            <select v-model="selectedCategory" class="form-input">
              <option disabled value="">Select category</option>
              <option
                v-for="category in categoryStore.categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="action-buttons">
            <button class="btn btn-cancel">Cancel</button>
            <button class="btn btn-confirm" @click="confirmProduct">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCategoryStore } from "@/stores/category.store"; // Adjust the path as needed
import { useProductStore } from "@/stores/product.store"; // Import the product store
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router"; // Import useRouter

export default {
  setup() {
    const categoryStore = useCategoryStore(); // Access the category store
    const productStore = useProductStore();
    const previewImage = ref(null);
    const productName = ref("");
    const price = ref(null);
    const selectedCategory = ref("");
    const router = useRouter(); // Get the router instance

    // Function to open file dialog
    const triggerFileUpload = () => {
      const fileInput = document.getElementById("fileInput"); // Get the file input element
      if (fileInput) {
        fileInput.click(); // Call click only if fileInput is found
      } else {
        console.error("File input not found"); // Log an error if not found
      }
    };

    // Function to handle file upload
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImage.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    // Fetch categories when component is mounted
    onMounted(async () => {
      await categoryStore.fetchCategories();
    });

    // Function to confirm and send product data
    const confirmProduct = async () => {
      const formData = new FormData();
      formData.append("category_id", selectedCategory.value);
      formData.append("name", productName.value);
      formData.append("price", price.value);

      const fileInput = document.getElementById("fileInput");
      if (fileInput.files.length > 0) {
        formData.append("picture", fileInput.files[0]);
      } else {
        console.error("No file selected");
        return; // Exit if no file is selected
      }

      // Call the addProduct function from the store
      const success = await productStore.addProduct(formData);
      if (success) {
        // Show success notification with SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product added successfully.",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/"); // Use the router instance here
        });
      } else {
        console.error("Failed to add product.");
        // You can also show an error message here
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to add product.",
          confirmButtonText: "Try Again",
        });
      }
    };

    return {
      previewImage,
      productName,
      price,
      selectedCategory,
      triggerFileUpload,
      handleFileUpload,
      confirmProduct,
      categoryStore,
    };
  },
};
</script>

<style scoped>
/* Navbar Styling */

.navbar-content {
  padding: 15px; /* Padding inside the navbar */
  font-family: Rubik, sans-serif; /* Font family for navbar */
}

/* Container for centering */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto; /* Allow the height to adjust based on content */
  padding: 70px 20px 20px; /* Add padding at the top for navbar space */
  margin: auto;
}

/* Card Styling */
.card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 800px;
  display: flex;
}

/* Left Section (Upload Image) */
.left-section {
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align to the start */
}

.upload-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.upload-box {
  width: 180px;
  height: 180px;
  background-color: rgba(179, 212, 255, 0.6);
  border-radius: 5px;
  margin-top: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* Adjust upload box position */
.upload-section {
  margin-top: -30px; /* Move it slightly up */
}

.upload-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-text {
  font-size: 12px;
  color: #1963d2;
  font-family: Rubik, sans-serif;
  position: absolute;
  text-align: center;
}

/* File input hidden */
.file-input {
  display: none;
}

/* Right Section (Form Inputs) */
.right-section {
  width: 60%;
}

.form-title {
  font-size: 20px;
  font-family: Rubik, sans-serif;
  font-weight: 500;
  color: black;
  margin-bottom: 20px;
}

/* Separator Line */
.separator {
  height: 1px;
  background-color: #d9d9d9;
  margin-bottom: 20px;
}

/* Form Group Styling */
.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-size: 12px;
  color: #303030;
  font-family: Rubik, sans-serif;
}

.form-input {
  width: 100%;
  height: 44px;
  padding: 8px;
  border: 1px solid #dfe1e6;
  border-radius: 3px;
  background-color: #fafbfc;
  font-size: 14px;
  font-family: Rubik, sans-serif;
  margin-top: 5px;
}

/* Action Buttons */
.action-buttons {
  margin-top: 100px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  width: 107px;
  height: 40px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Rubik, sans-serif;
  font-size: 14px;
  font-weight: 500;
}

.btn-cancel {
  color: #1963d2;
  border: 1px solid #1963d2;
  background-color: white;
}

.btn-confirm {
  background-color: #0052cc;
  color: white;
}

/* Responsive Styles */
@media (max-width: 800px) {
  .container {
    padding: 80px 10px 10px; /* Adjust padding for mobile */
  }

  .card {
    flex-direction: column; /* Stack the left and right sections vertically */
    width: 100%; /* Full width */
  }

  .left-section {
    width: 100%; /* Full width for image upload section */
    justify-content: center; /* Center align */
    align-items: center; /* Center vertically */
    margin-bottom: 20px; /* Space between sections */
  }

  .upload-box {
    width: 100%; /* Full width for upload box */
    height: 200px; /* Set a specific height for mobile */
    aspect-ratio: 1; /* Maintain a square aspect ratio */
    display: flex; /* Center the content */
    justify-content: center;
    align-items: center;
  }

  .right-section {
    width: 100%; /* Full width for form section */
  }

  .action-buttons {
    margin-top: 20px; /* Adjust top margin */
    justify-content: space-between; /* Space out buttons */
  }

  .btn {
    width: 48%; /* Adjust button width for better fit */
  }
}

@media (max-width: 480px) {
  .form-title {
    font-size: 18px; /* Adjust font size for mobile */
  }

  .form-label {
    font-size: 14px; /* Adjust label font size */
  }

  .form-input {
    height: 40px; /* Adjust input height for smaller screens */
    font-size: 12px; /* Smaller font size */
  }

  .upload-text {
    font-size: 10px; /* Smaller text for upload */
  }

  .btn {
    font-size: 12px; /* Smaller button font size */
  }
}
</style>
