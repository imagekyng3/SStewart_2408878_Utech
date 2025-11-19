// Product data array
const products = [
    { id: 1, name: "Gaming Laptop Pro", category: "laptops", price: 1200, image: "../Asset/Laptops/1f887754176cb7628948f1a49f16045d.jpg", description: "High-performance gaming laptop with advanced graphics" },
    { id: 2, name: "Business Ultrabook", category: "laptops", price: 1500, image: "../Asset/Laptops/26073a8430872d83b52106e628b4d2d3.jpg", description: "Sleek and powerful ultrabook for professionals" },
    { id: 3, name: "MacBook Pro", category: "laptops", price: 2000, image: "../Asset/Laptops/mac1.jpg", description: "Premium MacBook with cutting-edge technology" },
    { id: 4, name: "Student Laptop", category: "laptops", price: 800, image: "../Asset/Laptops/389552d7b70c1cb3e5355392fbad23c0.jpg", description: "Affordable laptop perfect for students" },
    { id: 5, name: "Workstation Laptop", category: "laptops", price: 1800, image: "../Asset/Laptops/403d69657ac28e82ed595279bd4efd73.jpg", description: "Powerful workstation for demanding tasks" },
    { id: 6, name: "Portable Laptop", category: "laptops", price: 950, image: "../Asset/Laptops/581ac5eb9ee184d2fa29e61c5d5246ab.jpg", description: "Lightweight and portable laptop" },
    { id: 7, name: "Premium Laptop", category: "laptops", price: 1600, image: "../Asset/Laptops/6dec28314853c15185e80ce94cede571.jpg", description: "Premium laptop with exceptional build quality" },
    { id: 8, name: "Budget Laptop", category: "laptops", price: 600, image: "../Asset/Laptops/92034744f889fcfd1a692dd1f98935ed.jpg", description: "Budget-friendly laptop for everyday use" },
    { id: 9, name: "Professional Laptop", category: "laptops", price: 1400, image: "../Asset/Laptops/b767481d1a04371f089971513c22fe28.jpg", description: "Professional-grade laptop for business" },
    { id: 10, name: "Creative Laptop", category: "laptops", price: 1700, image: "../Asset/Laptops/c8254713229f2798932b90e3d271fb82.jpg", description: "Perfect for creative professionals" },
    { id: 11, name: "Wireless Headphones Pro", category: "headphones", price: 200, image: "../Asset/HeadPhones/head1-removebg-preview.png", description: "Premium wireless headphones with noise cancellation" },
    { id: 12, name: "Gaming Headset", category: "headphones", price: 150, image: "../Asset/HeadPhones/head2-removebg-preview.png", description: "High-quality gaming headset with surround sound" },
    { id: 13, name: "Studio Headphones", category: "headphones", price: 250, image: "../Asset/HeadPhones/head3-removebg-preview.png", description: "Professional studio headphones for audio work" },
    { id: 14, name: "Sports Headphones", category: "headphones", price: 120, image: "../Asset/HeadPhones/head4-removebg-preview.png", description: "Durable headphones perfect for workouts" },
    { id: 15, name: "Noise Cancelling Headphones", category: "headphones", price: 300, image: "../Asset/HeadPhones/head5-removebg-preview.png", description: "Advanced noise cancellation technology" },
    { id: 16, name: "Budget Headphones", category: "headphones", price: 80, image: "../Asset/HeadPhones/head6-removebg-preview.png", description: "Affordable headphones with great sound" },
    { id: 17, name: "Premium Headphones", category: "headphones", price: 350, image: "../Asset/HeadPhones/head7-removebg-preview.png", description: "Top-tier headphones with exceptional audio quality" }
];

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count display
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        let totalItems = 0;
        for (let i = 0; i < cart.length; i++) {
            totalItems = totalItems + cart[i].quantity;
        }
        cartCount.textContent = totalItems;
    }
}

// Toggle mobile menu
function menutoggle() {
    const menuItems = document.querySelector('#MenuItems');
    if (menuItems) {
        if (menuItems.classList.contains('active')) {
            menuItems.classList.remove('active');
        } else {
            menuItems.classList.add('active');
        }
    }
}

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    if (document.getElementById('productGrid')) {
        loadProducts();
        setupCategoryFilters();
    }
    
    if (document.getElementById('cartItems')) {
        loadCart();
        setupCartEventListeners();
    }
    
    if (document.getElementById('checkoutForm')) {
        loadCheckout();
        setupCheckoutEventListeners();
    }
    
    // Login form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateLoginForm();
        });
    }
    
    // Registration form validation
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateSignupForm();
        });
    }
});

// Validate login form fields
function validateLoginForm() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    
    let isValid = true;
    
    usernameError.textContent = '';
    passwordError.textContent = '';
    
    if (username === '') {
        usernameError.textContent = 'Username is required';
        isValid = false;
    } else {
        if (username.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters';
            isValid = false;
        }
    }
    
    if (password === '') {
        passwordError.textContent = 'Password is required';
        isValid = false;
    } else {
        if (password.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters';
            isValid = false;
        }
    }
    
    if (isValid) {
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('username', username);
        alert('Login successful! Redirecting to homepage...');
        window.location.href = '../code/index.html';
    }
}

// Validate registration form (email, password match, age)
function validateSignupForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const fullNameError = document.getElementById('fullNameError');
    const dobError = document.getElementById('dobError');
    const emailError = document.getElementById('emailError');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    let isValid = true;
    
    fullNameError.textContent = '';
    dobError.textContent = '';
    emailError.textContent = '';
    usernameError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';
    
    if (fullName === '') {
        fullNameError.textContent = 'Full name is required';
        isValid = false;
    }
    
    if (dob === '') {
        dobError.textContent = 'Date of birth is required';
        isValid = false;
    } else {
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 13) {
            dobError.textContent = 'You must be at least 13 years old';
            isValid = false;
        }
    }
    
    if (email === '') {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
    }
    
    if (username === '') {
        usernameError.textContent = 'Username is required';
        isValid = false;
    } else {
        if (username.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters';
            isValid = false;
        }
    }
    
    if (password === '') {
        passwordError.textContent = 'Password is required';
        isValid = false;
    } else {
        if (password.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters';
            isValid = false;
        }
    }
    
    if (confirmPassword === '') {
        confirmPasswordError.textContent = 'Please confirm your password';
        isValid = false;
    } else {
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Passwords do not match';
            isValid = false;
        }
    }
    
    if (isValid) {
        alert('Registration successful! Redirecting to login...');
        window.location.href = 'login.html';
    }
}

// Display products by category
function loadProducts(category) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) {
        return;
    }
    
    productGrid.innerHTML = '';
    
    let filteredProducts = [];
    if (category === 'all' || !category) {
        filteredProducts = products;
    } else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].category === category) {
                filteredProducts.push(products[i]);
            }
        }
    }
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p class="text-center">No products found in this category.</p>';
        return;
    }
    
    for (let i = 0; i < filteredProducts.length; i++) {
        const product = filteredProducts[i];
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const originalPrice = (product.price * 1.5).toFixed(2);
        const salePrice = product.price.toFixed(2);
        
        productCard.innerHTML = '<div class="sale-tag">Sale</div><img src="' + product.image + '" alt="' + product.name + '"><h3>' + product.name + '</h3><p class="product-description">' + product.description + '</p><p class="product-price"><span class="original-price">$' + originalPrice + ' USD</span><span class="sale-price">$' + salePrice + ' USD</span></p><button class="btn btn-primary add-to-cart-btn" onclick="addToCart(' + product.id + ')">Add to Cart</button>';
        productGrid.appendChild(productCard);
    }
}

// Setup category filter click handlers
function setupCategoryFilters() {
    const categoryLinks = document.querySelectorAll('.category-link');
    for (let i = 0; i < categoryLinks.length; i++) {
        categoryLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            for (let j = 0; j < categoryLinks.length; j++) {
                categoryLinks[j].classList.remove('active');
            }
            this.classList.add('active');
            
            loadProducts(category);
        });
    }
}

// Add product to cart
function addToCart(productId) {
    let product = null;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            product = products[i];
            break;
        }
    }
    
    if (!product) {
        return;
    }
    
    let existingItem = null;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            existingItem = cart[i];
            break;
        }
    }
    
    if (existingItem) {
        existingItem.quantity = existingItem.quantity + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(product.name + ' added to cart!');
}

// Display cart items
function loadCart() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) {
        return;
    }
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty. <a href="products.html">Continue shopping</a></p>';
        updateCartSummary();
        return;
    }
    
    cartItems.innerHTML = '';
    
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        const subtotal = item.price * item.quantity;
        cartItem.innerHTML = '<img src="' + item.image + '" alt="' + item.name + '"><div class="cart-item-details"><h3>' + item.name + '</h3><p class="item-price">$' + item.price.toFixed(2) + '</p><div class="quantity-controls"><button onclick="decreaseQuantity(' + item.id + ')">-</button><input type="number" value="' + item.quantity + '" min="1" onchange="updateQuantity(' + item.id + ', this.value)"><button onclick="increaseQuantity(' + item.id + ')">+</button></div></div><div class="cart-item-subtotal">$' + subtotal.toFixed(2) + '</div><button class="remove-item-btn" onclick="removeFromCart(' + item.id + ')">Remove</button>';
        cartItems.appendChild(cartItem);
    }
    
    updateCartSummary();
}

// Calculate and display cart totals (subtotal, discount, tax, total)
function updateCartSummary() {
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subtotal = subtotal + (cart[i].price * cart[i].quantity);
    }
    
    const discount = subtotal * 0.10;
    const afterDiscount = subtotal - discount;
    const tax = afterDiscount * 0.15;
    const total = afterDiscount + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const discountEl = document.getElementById('discount');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) {
        subtotalEl.textContent = '$' + subtotal.toFixed(2);
    }
    if (discountEl) {
        discountEl.textContent = '$' + discount.toFixed(2);
    }
    if (taxEl) {
        taxEl.textContent = '$' + tax.toFixed(2);
    }
    if (totalEl) {
        totalEl.textContent = '$' + total.toFixed(2);
    }
}

// Increase item quantity
function increaseQuantity(productId) {
    let item = null;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            item = cart[i];
            break;
        }
    }
    
    if (item) {
        item.quantity = item.quantity + 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
    }
}

// Decrease item quantity
function decreaseQuantity(productId) {
    let item = null;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            item = cart[i];
            break;
        }
    }
    
    if (item) {
        if (item.quantity > 1) {
            item.quantity = item.quantity - 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
            updateCartCount();
        } else {
            removeFromCart(productId);
        }
    }
}

// Update item quantity from input
function updateQuantity(productId, newQuantity) {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) {
        loadCart();
        return;
    }
    
    let item = null;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            item = cart[i];
            break;
        }
    }
    
    if (item) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    const newCart = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id !== productId) {
            newCart.push(cart[i]);
        }
    }
    cart = newCart;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// Setup cart page button handlers
function setupCartEventListeners() {
    const clearCartBtn = document.getElementById('clearCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear all items from your cart?')) {
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCart();
                updateCartCount();
            }
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
            } else {
                window.location.href = 'checkout.html';
            }
        });
    }
    
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', function() {
            window.location.href = 'products.html';
        });
    }
}

// Load checkout page
function loadCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Redirecting to products...');
        window.location.href = 'products.html';
        return;
    }
    
    loadCheckoutItems();
    updateCheckoutSummary();
}

// Display checkout items list
function loadCheckoutItems() {
    const checkoutItems = document.getElementById('checkoutItems');
    if (!checkoutItems) {
        return;
    }
    
    checkoutItems.innerHTML = '';
    
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        const itemTotal = item.price * item.quantity;
        checkoutItem.innerHTML = '<div class="checkout-item-info"><h4>' + item.name + '</h4><p>Quantity: ' + item.quantity + ' × $' + item.price.toFixed(2) + '</p></div><div class="checkout-item-price">$' + itemTotal.toFixed(2) + '</div>';
        checkoutItems.appendChild(checkoutItem);
    }
}

// Calculate and display checkout totals
function updateCheckoutSummary() {
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subtotal = subtotal + (cart[i].price * cart[i].quantity);
    }
    
    const discount = subtotal * 0.10;
    const afterDiscount = subtotal - discount;
    const tax = afterDiscount * 0.15;
    const total = afterDiscount + tax;
    
    const subtotalEl = document.getElementById('checkoutSubtotal');
    const discountEl = document.getElementById('checkoutDiscount');
    const taxEl = document.getElementById('checkoutTax');
    const totalEl = document.getElementById('checkoutTotal');
    
    if (subtotalEl) {
        subtotalEl.textContent = '$' + subtotal.toFixed(2);
    }
    if (discountEl) {
        discountEl.textContent = '$' + discount.toFixed(2);
    }
    if (taxEl) {
        taxEl.textContent = '$' + tax.toFixed(2);
    }
    if (totalEl) {
        totalEl.textContent = '$' + total.toFixed(2);
    }
}

// Setup checkout page button handlers
function setupCheckoutEventListeners() {
    const checkoutForm = document.getElementById('checkoutForm');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateCheckoutForm();
        });
    }
    
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear all items?')) {
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.href = 'products.html';
            }
        });
    }
    
    if (closeCheckoutBtn) {
        closeCheckoutBtn.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }
}

// Validate checkout shipping details and payment
function validateCheckoutForm() {
    const shippingName = document.getElementById('shippingName').value.trim();
    const shippingAddress = document.getElementById('shippingAddress').value.trim();
    const shippingCity = document.getElementById('shippingCity').value.trim();
    const shippingPostal = document.getElementById('shippingPostal').value.trim();
    const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);
    
    const shippingNameError = document.getElementById('shippingNameError');
    const shippingAddressError = document.getElementById('shippingAddressError');
    const shippingCityError = document.getElementById('shippingCityError');
    const shippingPostalError = document.getElementById('shippingPostalError');
    const paymentAmountError = document.getElementById('paymentAmountError');
    
    let isValid = true;
    
    shippingNameError.textContent = '';
    shippingAddressError.textContent = '';
    shippingCityError.textContent = '';
    shippingPostalError.textContent = '';
    paymentAmountError.textContent = '';
    
    if (shippingName === '') {
        shippingNameError.textContent = 'Name is required';
        isValid = false;
    }
    
    if (shippingAddress === '') {
        shippingAddressError.textContent = 'Address is required';
        isValid = false;
    }
    
    if (shippingCity === '') {
        shippingCityError.textContent = 'City is required';
        isValid = false;
    }
    
    if (shippingPostal === '') {
        shippingPostalError.textContent = 'Postal code is required';
        isValid = false;
    }
    
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subtotal = subtotal + (cart[i].price * cart[i].quantity);
    }
    
    const discount = subtotal * 0.10;
    const afterDiscount = subtotal - discount;
    const tax = afterDiscount * 0.15;
    const total = afterDiscount + tax;
    
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
        paymentAmountError.textContent = 'Please enter a valid payment amount';
        isValid = false;
    } else {
        if (paymentAmount < total) {
            paymentAmountError.textContent = 'Payment amount must be at least $' + total.toFixed(2);
            isValid = false;
        }
    }
    
    if (isValid) {
        alert('Order confirmed! Thank you for your purchase.');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        window.location.href = 'index.html';
    }
}

