
/*
 * IA#2 Group Project - Apex Technologies
 * Group Members:
 * - Sanjay Stewart (ID: 2408878)
 * - Rihanna Simpson
 * - Neila Jamieson
 * - Stefane Allen
 * Course: Web Programming - Thursday 6-8pm
 * Assignment: E-commerce Website with LocalStorage
 */

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

// Save all products to localStorage once (for assignment requirement)
if (!localStorage.getItem('AllProducts')) {
    localStorage.setItem('AllProducts', JSON.stringify(products));
}

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/*
 * QUESTION 1 A - Calculate Age from Date of Birth
 * Description: Helper function to calculate user age from DOB.
 * Used to validate that users are 18+ years old during registration.
 */
function calculateAge(dobStr) {
    if (!dobStr) return 0;
    const dob = new Date(dobStr);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

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
    
    // Login form validation (TRN + password)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateLoginForm();
        });
        
        // Clear error messages when user starts typing in login form
        const loginTrnInput = document.getElementById('loginTrn');
        const loginPasswordInput = document.getElementById('loginPassword');
        
        if (loginTrnInput) {
            loginTrnInput.addEventListener('input', function() {
                const trnError = document.getElementById('loginTrnError');
                if (trnError) trnError.textContent = '';
            });
        }
        
        if (loginPasswordInput) {
            loginPasswordInput.addEventListener('input', function() {
                const passwordError = document.getElementById('loginPasswordError');
                if (passwordError) passwordError.textContent = '';
            });
        }
    }
    
    // Registration form validation
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateSignupForm();
        });
        
        // Clear error messages when user starts typing in registration form
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const trnRegInput = document.getElementById('trn');
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const dobInput = document.getElementById('dob');
        const genderInput = document.getElementById('gender');
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                const passwordError = document.getElementById('passwordError');
                if (passwordError) passwordError.textContent = '';
            });
        }
        
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', function() {
                const confirmPasswordError = document.getElementById('confirmPasswordError');
                if (confirmPasswordError) confirmPasswordError.textContent = '';
            });
        }
        
        if (trnRegInput) {
            trnRegInput.addEventListener('input', function() {
                const trnError = document.getElementById('trnError');
                if (trnError) trnError.textContent = '';
            });
        }
        
        if (firstNameInput) {
            firstNameInput.addEventListener('input', function() {
                const firstNameError = document.getElementById('firstNameError');
                if (firstNameError) firstNameError.textContent = '';
            });
        }
        
        if (lastNameInput) {
            lastNameInput.addEventListener('input', function() {
                const lastNameError = document.getElementById('lastNameError');
                if (lastNameError) lastNameError.textContent = '';
            });
        }
        
        if (dobInput) {
            dobInput.addEventListener('input', function() {
                const dobError = document.getElementById('dobError');
                if (dobError) dobError.textContent = '';
            });
        }
        
        if (genderInput) {
            genderInput.addEventListener('change', function() {
                const genderError = document.getElementById('genderError');
                if (genderError) genderError.textContent = '';
            });
        }
        
        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                const phoneError = document.getElementById('phoneError');
                if (phoneError) phoneError.textContent = '';
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                const emailError = document.getElementById('emailError');
                if (emailError) emailError.textContent = '';
            });
        }
    }
});

/*
 * QUESTION 1 B - Login Form Validation
 * Description: Validates login using TRN and password from RegistrationData localStorage.
 * Allows 3 login attempts before redirecting to account-locked page.
 * On success, redirects to products page.
 */
function validateLoginForm() {
    const trnInput = document.getElementById('loginTrn');
    const passwordInput = document.getElementById('loginPassword');
    const trnError = document.getElementById('loginTrnError');
    const passwordError = document.getElementById('loginPasswordError');

    if (!trnInput || !passwordInput || !trnError || !passwordError) {
        return;
    }

    const trn = trnInput.value.trim();
    const password = passwordInput.value;
    
    let isValid = true;
    
    trnError.textContent = '';
    passwordError.textContent = '';
    
    // Very basic TRN format check
    const trnPattern = /^\d{3}-\d{3}-\d{3}$/;
    if (trn === '') {
        trnError.textContent = 'TRN is required';
        isValid = false;
    } else if (!trnPattern.test(trn)) {
        trnError.textContent = 'TRN must be in the format 000-000-000';
        isValid = false;
    }
    
    if (password === '') {
        passwordError.textContent = 'Password is required';
        isValid = false;
    } else {
        if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            isValid = false;
        }
    }
    
    if (isValid) {
        // Check login attempts
        let attempts = parseInt(localStorage.getItem('loginAttempts') || '0', 10);
        if (attempts >= 3) {
            window.location.href = 'account-locked.html';
            return;
        }

        // Get registered users from localStorage (RegistrationData)
        const users = JSON.parse(localStorage.getItem('RegistrationData')) || [];

        let authenticatedUser = null;
        for (let i = 0; i < users.length; i++) {
            if (users[i].trn === trn && users[i].password === password) {
                authenticatedUser = users[i];
                break;
            }
        }

        if (authenticatedUser) {
            // Reset attempts and store login status
            localStorage.setItem('loginAttempts', '0');
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('loggedInTrn', authenticatedUser.trn);
            localStorage.setItem('userFullName', authenticatedUser.firstName + ' ' + authenticatedUser.lastName);
            localStorage.setItem('userEmail', authenticatedUser.email);

            alert('Login successful! Welcome back, ' + authenticatedUser.firstName + '!');
            window.location.href = 'products.html';
        } else {
            attempts += 1;
            localStorage.setItem('loginAttempts', attempts.toString());

            if (attempts >= 3) {
                alert('Your account has been locked after 3 failed attempts.');
                window.location.href = 'account-locked.html';
            } else {
                passwordError.textContent = 'Invalid TRN or password. Attempt ' + attempts + ' of 3.';
            }
        }
    }
}

/*
 * QUESTION 1 B - Reset Password Function
 * Description: Allows users to reset their password by entering their TRN.
 * Updates the password in RegistrationData localStorage.
 */
function resetPassword() {
    const trn = prompt('Enter your TRN to reset password (format 000-000-000):');
    if (!trn) return;

    const trnPattern = /^\d{3}-\d{3}-\d{3}$/;
    if (!trnPattern.test(trn.trim())) {
        alert('TRN must be in the format 000-000-000');
        return;
    }

    const newPassword = prompt('Enter your new password (min 8 characters):');
    if (!newPassword || newPassword.length < 8) {
        alert('Password must be at least 8 characters.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('RegistrationData')) || [];
    let updated = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].trn === trn.trim()) {
            users[i].password = newPassword;
            updated = true;
            break;
        }
    }

    if (updated) {
        localStorage.setItem('RegistrationData', JSON.stringify(users));
        localStorage.setItem('loginAttempts', '0');
        alert('Password updated successfully. Login attempts have been reset.');
    } else {
        alert('No user found with that TRN.');
    }
}

/*
 * QUESTION 1 A - Registration Form Validation
 * Description: Validates registration form with all required fields:
 * - First name, last name, DOB, gender, phone, email, TRN, password
 * - Validates age (must be 18+)
 * - Validates TRN format (000-000-000) and uniqueness
 * - Validates password (minimum 8 characters)
 * - Stores user data in RegistrationData localStorage as array of objects
 */
function validateSignupForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const trnInput = document.getElementById('trn');
    
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const dobError = document.getElementById('dobError');
    const genderError = document.getElementById('genderError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');
    const trnError = document.getElementById('trnError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    let isValid = true;
    
    firstNameError.textContent = '';
    lastNameError.textContent = '';
    dobError.textContent = '';
    genderError.textContent = '';
    phoneError.textContent = '';
    emailError.textContent = '';
    trnError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';
    
    if (firstName === '') {
        firstNameError.textContent = 'First name is required';
        isValid = false;
    }
    
    if (lastName === '') {
        lastNameError.textContent = 'Last name is required';
        isValid = false;
    }
    
    if (dob === '') {
        dobError.textContent = 'Date of birth is required';
        isValid = false;
    } else {
        const age = calculateAge(dob);
        if (age < 18) {
            dobError.textContent = 'You must be at least 18 years old';
            isValid = false;
        }
    }
    
    if (gender === '') {
        genderError.textContent = 'Gender is required';
        isValid = false;
    }

    if (phone === '') {
        phoneError.textContent = 'Phone number is required';
        isValid = false;
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
    
    const trn = trnInput.value.trim();
    const trnPattern = /^\d{3}-\d{3}-\d{3}$/;
    if (trn === '') {
        trnError.textContent = 'TRN is required';
        isValid = false;
    } else if (!trnPattern.test(trn)) {
        trnError.textContent = 'TRN must be in the format 000-000-000';
        isValid = false;
    }
    
    if (password === '') {
        passwordError.textContent = 'Password is required';
        isValid = false;
    } else {
        if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
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
        // Get existing users from localStorage (RegistrationData)
        let users = [];
        try {
            const storedUsers = localStorage.getItem('RegistrationData');
            if (storedUsers) {
                users = JSON.parse(storedUsers);
                if (!Array.isArray(users)) {
                    users = [];
                }
            }
        } catch (e) {
            console.error('Error reading users from localStorage:', e);
            users = [];
        }
        
        // Check if TRN already exists
        let trnExists = false;
        let emailExists = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i].trn && users[i].trn === trn) {
                trnExists = true;
            }
            if (users[i].email && users[i].email.toLowerCase() === email.toLowerCase()) {
                emailExists = true;
            }
            if (trnExists && emailExists) {
                break;
            }
        }
        
        if (trnExists) {
            trnError.textContent = 'This TRN is already registered.';
            isValid = false;
        }
        
        if (emailExists) {
            emailError.textContent = 'Email already registered. Please use another email.';
            isValid = false;
        }
        
        if (isValid) {
            // Store user data in localStorage
            const userData = {
                firstName: firstName,
                lastName: lastName,
                dob: dob,
                gender: gender,
                phone: phone,
                email: email,
                trn: trn,
                password: password,
                dateOfRegistration: new Date().toISOString(),
                cart: {},
                invoices: []
            };
            
            users.push(userData);
            
            try {
                // Save users to localStorage
                localStorage.setItem('RegistrationData', JSON.stringify(users));
                
                // Automatically log in the user after successful registration
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('loggedInTrn', trn);
                localStorage.setItem('userFullName', firstName + ' ' + lastName);
                localStorage.setItem('userEmail', email);
                
                alert('Registration successful! You are now logged in. Welcome, ' + firstName + '!');
                window.location.href = 'index.html';
                
            } catch (error) {
                console.error('Error saving user data:', error);
                alert('Error saving your account. Please try again. If the problem persists, check your browser settings for localStorage.');
            }
        }
    }
}

/*
 * QUESTION 2 - Display Product Catalogue
 * Description: Dynamically loads and displays products from the products array.
 * Supports category filtering (all, laptops, headphones).
 * Products are stored in AllProducts localStorage.
 */
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

/*
 * QUESTION 2 E / QUESTION 3 - Add Product to Cart
 * Description: Adds selected product to shopping cart.
 * Requires user login before adding items.
 * Updates cart in localStorage and displays cart count.
 */
function addToCart(productId) {
    // Require login before adding items
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Please login or register before adding items to your cart.');
        window.location.href = 'index.html';
        return;
    }

    // Reload cart from localStorage to ensure we have the latest data
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let product = null;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            product = products[i];
            break;
        }
    }
    
    if (!product) {
        alert('Product not found!');
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
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(product.name + ' added to cart!');
}

/*
 * QUESTION 3 - Display Shopping Cart Items
 * Description: Loads and displays all items in the shopping cart.
 * Shows product details, quantity, subtotal, discount, tax, and total.
 */
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

/*
 * QUESTION 3 - Calculate Cart Summary
 * Description: Calculates and displays cart totals:
 * - Subtotal, Discount (10%), Tax (15%), Total Cost
 */
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

/*
 * QUESTION 4 - Load Checkout Page
 * Description: Initializes checkout page with cart items and summary.
 * Redirects to products if cart is empty.
 */
function loadCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Redirecting to products...');
        window.location.href = 'products.html';
        return;
    }
    
    loadCheckoutItems();
    updateCheckoutSummary();
}

// Q4: show checkout items
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

// Q4: show checkout totals
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

// Q4: checkout buttons
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

/*
 * QUESTION 4 / QUESTION 5 - Validate Checkout and Generate Invoice
 * Description: Validates shipping details and payment amount.
 * Generates invoice on successful validation.
 * Clears cart and redirects to invoice page.
 */
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
        // Build shipping info object
        const shippingInfo = {
            name: shippingName,
            address: shippingAddress,
            city: shippingCity,
            postal: shippingPostal
        };

        // Generate and store invoice
        const invoice = generateInvoice(shippingInfo, paymentAmount);

        // Save last invoice separately for display
        localStorage.setItem('lastInvoice', JSON.stringify(invoice));

        alert('Order confirmed! Your invoice has been generated and sent to your email.');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        window.location.href = 'invoice.html';
    }
}

/*
 * QUESTION 5 - Generate Invoice
 * Description: Creates invoice with company name, date, invoice number, TRN,
 * shipping information, purchased items, taxes, subtotal, and total cost.
 * Saves invoice to:
 * 1. AllInvoices localStorage (array of all invoices)
 * 2. User's invoices array in RegistrationData
 */
function generateInvoice(shippingInfo, paymentAmount) {
    const loggedInTrn = localStorage.getItem('loggedInTrn') || '';

    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subtotal = subtotal + (cart[i].price * cart[i].quantity);
    }

    const discount = subtotal * 0.10;
    const afterDiscount = subtotal - discount;
    const tax = afterDiscount * 0.15;
    const total = afterDiscount + tax;

    const invoice = {
        companyName: 'Apex Technologies',
        date: new Date().toISOString(),
        invoiceNumber: 'INV-' + Date.now(),
        trn: loggedInTrn,
        shippingInformation: shippingInfo,
        items: cart.map(function (item) {
            return {
                name: item.name,
                quantity: item.quantity,
                price: item.price
            };
        }),
        discount: discount,
        taxes: tax,
        subtotal: subtotal,
        totalCost: total,
        amountPaid: paymentAmount
    };

    // Append to AllInvoices
    const allInvoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];
    allInvoices.push(invoice);
    localStorage.setItem('AllInvoices', JSON.stringify(allInvoices));

    // Append to this user's invoices inside RegistrationData
    const regData = JSON.parse(localStorage.getItem('RegistrationData')) || [];
    for (let i = 0; i < regData.length; i++) {
        if (regData[i].trn === loggedInTrn) {
            if (!Array.isArray(regData[i].invoices)) {
                regData[i].invoices = [];
            }
            regData[i].invoices.push(invoice);
            break;
        }
    }
    localStorage.setItem('RegistrationData', JSON.stringify(regData));

    return invoice;
}

/*
 * QUESTION 6 A - Show User Frequency by Gender and Age Group
 * Description: Displays bar charts showing:
 * 1. User frequency by gender (Male, Female, Other)
 * 2. User frequency by age group (18-25, 26-35, 36-50, 50+)
 * Uses image width manipulation to create horizontal bar charts.
 */
function ShowUserFrequency() {
    const regData = JSON.parse(localStorage.getItem('RegistrationData')) || [];

    const genderCounts = { Male: 0, Female: 0, Other: 0 };
    const ageCounts = { '18-25': 0, '26-35': 0, '36-50': 0, '50+': 0 };

    for (let i = 0; i < regData.length; i++) {
        const user = regData[i];
        const g = user.gender || 'Other';
        if (genderCounts[g] !== undefined) {
            genderCounts[g] = genderCounts[g] + 1;
        } else {
            genderCounts.Other = genderCounts.Other + 1;
        }

        const age = calculateAge(user.dob);
        if (age >= 18 && age <= 25) {
            ageCounts['18-25'] = ageCounts['18-25'] + 1;
        } else if (age >= 26 && age <= 35) {
            ageCounts['26-35'] = ageCounts['26-35'] + 1;
        } else if (age >= 36 && age <= 50) {
            ageCounts['36-50'] = ageCounts['36-50'] + 1;
        } else if (age > 50) {
            ageCounts['50+'] = ageCounts['50+'] + 1;
        }
    }

    const genderContainer = document.getElementById('genderChart');
    const ageContainer = document.getElementById('ageChart');
    if (!genderContainer || !ageContainer) {
        return;
    }

    const barUnit = 20; // pixels per user

    genderContainer.innerHTML = '';
    ageContainer.innerHTML = '';

    // Build gender chart
    for (const key in genderCounts) {
        if (Object.prototype.hasOwnProperty.call(genderCounts, key)) {
            const count = genderCounts[key];
            const width = Math.max(count * barUnit, 5);
            genderContainer.innerHTML += '<div class="freq-row"><span class="freq-label">' + key + ' (' + count + ')</span><div class="chart-bar" style="width: ' + width + 'px;"></div></div>';
        }
    }

    // Build age-group chart
    for (const range in ageCounts) {
        if (Object.prototype.hasOwnProperty.call(ageCounts, range)) {
            const count = ageCounts[range];
            const width = Math.max(count * barUnit, 5);
            ageContainer.innerHTML += '<div class="freq-row"><span class="freq-label">' + range + ' (' + count + ')</span><div class="chart-bar" style="width: ' + width + 'px;"></div></div>';
        }
    }
}

/*
 * QUESTION 6 B - Show All Invoices (AllInvoices)
 * Description: Searches and displays all invoices from AllInvoices localStorage.
 * Can filter by TRN or show all invoices.
 * Results are displayed on the page in a formatted table.
 */
function ShowInvoices() {
    const trnInput = document.getElementById('invoiceSearchTrn');
    const trn = trnInput ? trnInput.value.trim() : '';
    const allInvoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];
    const resultsDiv = document.getElementById('invoiceResults');

    if (!resultsDiv) {
        console.log('Results div not found');
        return;
    }

    let filtered = [];
    if (trn === '') {
        filtered = allInvoices;
        console.log('All invoices:', allInvoices);
    } else {
        for (let i = 0; i < allInvoices.length; i++) {
            if (allInvoices[i].trn === trn) {
                filtered.push(allInvoices[i]);
            }
        }
        console.log('Invoices for TRN ' + trn + ':', filtered);
    }

    if (filtered.length === 0) {
        resultsDiv.innerHTML = '<div class="result-card" style="background-color: #fff3cd; border-color: #ffc107;"><div class="result-header">No Results Found</div><p>No invoices found' + (trn ? ' for TRN: ' + trn : ' in the system yet') + '.</p></div>';
        return;
    }

    let html = '<div class="result-header">Search Results (' + filtered.length + ' invoice' + (filtered.length > 1 ? 's' : '') + ' found)</div>';
    
    for (let i = 0; i < filtered.length; i++) {
        const inv = filtered[i];
        html += '<div class="result-card">';
        html += '<div class="result-header">' + inv.invoiceNumber + ' - ' + new Date(inv.date).toLocaleDateString() + '</div>';
        html += '<div class="result-detail"><strong>TRN:</strong> ' + inv.trn + ' | <strong>Company:</strong> ' + inv.companyName + '</div>';
        html += '<div class="result-detail"><strong>Shipping:</strong> ' + inv.shippingInformation.name + ', ' + inv.shippingInformation.address + ', ' + inv.shippingInformation.city + '</div>';
        html += '<div class="result-detail"><strong>Items:</strong> ';
        for (let j = 0; j < inv.items.length; j++) {
            if (j > 0) html += ', ';
            html += inv.items[j].name + ' (x' + inv.items[j].quantity + ')';
        }
        html += '</div>';
        html += '<div class="result-detail"><strong>Financials:</strong> Subtotal: $' + inv.subtotal.toFixed(2) + ' | Discount: $' + inv.discount.toFixed(2) + ' | Tax: $' + inv.taxes.toFixed(2) + ' | Total: $' + inv.totalCost.toFixed(2) + ' | Paid: $' + inv.amountPaid.toFixed(2) + '</div>';
        html += '</div>';
    }
    
    resultsDiv.innerHTML = html;
}

/*
 * QUESTION 6 C - Get User Invoices from RegistrationData
 * Description: Retrieves and displays invoices for a specific user by TRN.
 * Searches RegistrationData and displays user's invoices array.
 * Results are displayed on the page in a formatted table.
 */
function GetUserInvoices() {
    const trnInput = document.getElementById('invoiceSearchTrn');
    const resultsDiv = document.getElementById('invoiceResults');
    
    if (!trnInput) {
        console.log('No TRN input found on this page.');
        return;
    }

    const trn = trnInput.value.trim();
    
    if (trn === '') {
        if (resultsDiv) {
            resultsDiv.innerHTML = '<div class="result-card" style="background-color: #fff3cd; border-color: #ffc107;"><div class="result-header">Missing Information</div><p>Please enter a TRN to search.</p></div>';
        }
        return;
    }
    
    const regData = JSON.parse(localStorage.getItem('RegistrationData')) || [];
    let foundUser = null;

    for (let i = 0; i < regData.length; i++) {
        if (regData[i].trn === trn) {
            foundUser = regData[i];
            break;
        }
    }

    if (!foundUser) {
        console.log('No user found for TRN ' + trn);
        if (resultsDiv) {
            resultsDiv.innerHTML = '<div class="result-card" style="background-color: #f8d7da; border-color: #dc3545;"><div class="result-header">User Not Found</div><p>No user found for TRN: ' + trn + '</p></div>';
        }
        return;
    }

    const userInvoices = foundUser.invoices || [];
    console.log('Invoices for TRN ' + trn + ' from RegistrationData:', userInvoices);
    
    if (!resultsDiv) {
        return;
    }
    
    if (userInvoices.length === 0) {
        resultsDiv.innerHTML = '<div class="result-card" style="background-color: #fff3cd; border-color: #ffc107;"><div class="result-header">No Invoices Found</div><p>No invoices found for user: ' + foundUser.firstName + ' ' + foundUser.lastName + '<br>TRN: ' + trn + '</p></div>';
        return;
    }
    
    let html = '<div class="result-header">User: ' + foundUser.firstName + ' ' + foundUser.lastName + '</div><div class="result-detail">TRN: ' + trn + ' | Email: ' + foundUser.email + '</div><div class="result-header">' + userInvoices.length + ' Invoice' + (userInvoices.length > 1 ? 's' : '') + ' Found</div>';
    
    for (let i = 0; i < userInvoices.length; i++) {
        const inv = userInvoices[i];
        html += '<div class="result-card">';
        html += '<div class="result-header">' + inv.invoiceNumber + ' - ' + new Date(inv.date).toLocaleDateString() + '</div>';
        html += '<div class="result-detail"><strong>Shipping:</strong> ' + inv.shippingInformation.name + ', ' + inv.shippingInformation.address + ', ' + inv.shippingInformation.city + '</div>';
        html += '<div class="result-detail"><strong>Items:</strong> ';
        for (let j = 0; j < inv.items.length; j++) {
            if (j > 0) html += ', ';
            html += inv.items[j].name + ' (x' + inv.items[j].quantity + ')';
        }
        html += '</div>';
        html += '<div class="result-detail"><strong>Financials:</strong> Subtotal: $' + inv.subtotal.toFixed(2) + ' | Discount: $' + inv.discount.toFixed(2) + ' | Tax: $' + inv.taxes.toFixed(2) + ' | Total: $' + inv.totalCost.toFixed(2) + ' | Paid: $' + inv.amountPaid.toFixed(2) + '</div>';
        html += '</div>';
    }
    
    resultsDiv.innerHTML = html;
}