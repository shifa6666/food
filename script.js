// Array to store cart items
let cart = [];

// Add item to cart
function addToCart(itemName, itemPrice) {
  // Create the item object
  const item = { name: itemName, price: parseFloat(itemPrice.replace('₹', '').trim()) }; // Remove ₹ symbol and convert to number

  // Add item to cart array
  cart.push(item);

  // Update the cart UI
  updateCart();
}

// Remove item from cart
function removeFromCart(itemIndex) {
  cart.splice(itemIndex, 1); // Remove item at the specified index
  updateCart(); // Update the UI after removal
}

// Update cart UI
function updateCart() {
  const cartList = document.getElementById("cart-items-list");
  cartList.innerHTML = ''; // Clear existing cart items

  let total = 0;

  // Add each item to the cart list
  cart.forEach((item, index) => {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `${item.name} - ₹${item.price.toFixed(2)} 
      <button onclick="removeFromCart(${index})">Remove</button>`; // Use ₹ and display 2 decimals
    cartList.appendChild(cartItem);

    total += item.price; // Add item price to total
  });

  // Update the total price with ₹ symbol
  document.getElementById("total-price").textContent = `Total Price: ₹${total.toFixed(2)}`;
}

// Function to handle placing the order
function placeOrder() {
  // Create the order summary
  const orderSummary = document.getElementById("order-summary");

  // Assuming the cart array is already populated with items
  if (cart.length > 0) {
    let billDetails = '<h3>Your Order:</h3><ul>';

    // Add each item in the cart to the bill
    cart.forEach(item => {
      billDetails += `<li>${item.name} - ₹${item.price.toFixed(2)}</li>`;
    });

    // Calculate total price
    let total = 0;
    cart.forEach(item => {
      total += item.price;
    });

    billDetails += `</ul><h4>Total Price: ₹${total.toFixed(2)}</h4>`;
    
    // Add confirmation message
    billDetails += "<p>Your order is placed!</p>";

    // Display the order summary and confirmation message
    orderSummary.innerHTML = billDetails;
  } else {
    // If the cart is empty
    orderSummary.innerHTML = "<p>Your cart is empty! Please add items to your cart before placing an order.</p>";
  }
}
