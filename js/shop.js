// JavaScript for Shopping Cart Functionality

// Define cart as an array to store selected products
let cart = [];

// Function to add a product to the cart
function addToCart(productName) {
    const product = cart.find(item => item.name === productName);

    if (product) {
        product.quantity += 1;
    } else {
        cart.push({
            name: productName,
            quantity: 1
        });
    }

    updateCartDisplay();
}

// Function to remove a product from the cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartDisplay();
}

// Function to update the cart display in the UI
function updateCartDisplay() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <button class="remove-from-cart" data-product="${item.name}">Remove</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    attachRemoveEventListeners();
}

// Function to attach event listeners to remove buttons
function attachRemoveEventListeners() {
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', event => {
            const productName = event.target.getAttribute('data-product');
            removeFromCart(productName);
        });
    });
}

// Attach event listeners to Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        const productName = event.target.getAttribute('data-product');
        addToCart(productName);
        alert(`${productName} added to cart!`);
    });
});
