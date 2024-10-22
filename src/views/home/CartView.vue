<template>
  <div class="container">
    <div class="wrapper">
      <div class="header">
        <div class="header-item">Product</div>
        <div class="header-qty">Qty</div>
        <div class="header-subtotal">Subtotal</div>
        <div class="header-item">Remove</div>
      </div>
      <div v-for="(product, index) in products" :key="index" class="product">
        <div class="product-image">
          <img :src="product.image" alt="Product Image" />
        </div>
        <div class="product-details">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">Rp. {{ product.price }}</div>
        </div>
        <div class="quantity-control">
          <div
            class="quantity-button decrement"
            @click="decrementQuantity(index)"
          >
            -
          </div>
          <div class="quantity-display">{{ product.quantity }}</div>
          <div
            class="quantity-button increment"
            @click="incrementQuantity(index)"
          >
            +
          </div>
        </div>
        <div class="total-price">Rp. {{ product.totalPrice }}</div>
        <div class="remove-button" @click="removeProduct(index)">Remove</div>
      </div>
      <div class="divider"></div>
      <div class="footer">
        <button class="back-button" @click="goToHome">Back to Home</button>
        <button class="pay-button" @click="payBill">Pay Bill</button>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2"; // Import SweetAlert2
export default {
  data() {
    return {
      products: [
        {
          image: "https://via.placeholder.com/200x200",
          name: "Product Name 1",
          price: 10000,
          quantity: 2,
          totalPrice: 20000,
        },
        {
          image: "https://via.placeholder.com/200x200",
          name: "Product Name 2",
          price: 20000,
          quantity: 1,
          totalPrice: 20000,
        },
      ],
    };
  },
  methods: {
    incrementQuantity(index) {
      this.products[index].quantity++;
      this.products[index].totalPrice =
        this.products[index].price * this.products[index].quantity;
    },
    decrementQuantity(index) {
      if (this.products[index].quantity > 1) {
        this.products[index].quantity--;
        this.products[index].totalPrice =
          this.products[index].price * this.products[index].quantity;
      }
    },
    removeProduct(index) {
      this.products.splice(index, 1);
    },
    goToHome() {
      this.$router.push("/");
    },
    payBill() {
      Swal.fire({
        title: "Success!",
        text: "Your bill has been paid successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
  },
};
</script>
<style scoped>
.header-qty {
  flex: 1;
  margin-left: 650px;
}

.header-subtotal {
  flex: 1;
  margin-left: 200px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 70px 20px 20px;
  margin: auto;
}

.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  font-family: Rubik;
  font-weight: 600;
}

.header-item {
  flex: 1;
  text-align: center;
}

.product {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  background: #fafafa;
  border-bottom: 1px solid #e0e0e0;
  gap: 10px; /* Add some spacing between elements */
}

.product-image {
  width: 100px; /* Reduced width for better alignment */
  height: 100px; /* Reduced height for better alignment */
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: auto;
}

.product-details {
  flex: 2; /* Allows product details to take more space */
  padding-left: 20px;
}

.product-name {
  color: black;
  font-size: 20px;
  font-family: Rubik;
  font-weight: 600;
}

.product-price {
  color: black;
  font-size: 16px;
  font-family: Rubik;
  font-weight: bold;
}

.quantity-control {
  display: flex;
  flex: 1; /* Allow the quantity control to take up space */
}

.quantity-button {
  width: 30px; /* Adjusted width */
  height: 30px; /* Adjusted height */
  background: #0052cc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  font-family: Rubik;
  font-weight: 700;
  margin: 0 5px;
  cursor: pointer;
}

.quantity-display {
  width: 40px; /* Adjusted width */
  height: 30px; /* Adjusted height */
  background: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 20px;
  font-family: Rubik;
  font-weight: 600;
}

.total-price {
  color: black;
  font-weight: bold;
  flex: 1; /* Allow total price to take up space */
  text-align: center; /* Center align total price */
}

.remove-button {
  padding: 10px 20px;
  background: #de350b;
  border-radius: 3px;
  color: white;
  font-size: 14px;
  font-family: Rubik;
  font-weight: 500;
  cursor: pointer;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
  align-items: center;
}

.back-button,
.pay-button {
  background-color: white;
  border: 2px solid #0052cc;
  color: #0052cc;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-left: 10px; /* Space between buttons */
}

.pay-button {
  background-color: #0052cc;
  color: white;
  border: none; /* No border for pay button */
}

@media (max-width: 768px) {
  .product {
    flex-direction: column; /* Stack items on smaller screens */
    align-items: flex-start; /* Align items to the start */
  }
  .quantity-control,
  .total-price,
  .remove-button {
    margin-top: 10px; /* Add space between rows */
    text-align: left; /* Left align text on small screens */
  }
}
</style>
