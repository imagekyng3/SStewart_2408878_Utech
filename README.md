# Apex Technologies – IA#2 Group Project

Simple e-commerce website built with **HTML5, CSS3, JavaScript** and **localStorage**.

## Group / Student Details

- **Student Name**: Sanjay Stewart  
- **Student ID**: 2408878  
- **Course**: Web Programming – Thursday 6–8 pm  
- **Company Name**: Apex Technologies
- **Assignment**: IA#2 - E-commerce Website

## How to Run

1. Open `Code/index.html` in **Google Chrome** (recommended browser).
2. Register a new user using the **Register** link.
3. Login from the home page using your **TRN** and **password**.
4. Browse products, add to cart, checkout, and view invoices.

## Default Login Credentials

- **No default credentials** - Register a new account to test the system
- **TRN Format**: 000-000-000 (example: 123-456-789)
- **Password**: Minimum 8 characters required
- **Age Requirement**: Must be 18+ years old

## Frameworks & Tools Used

- **HTML5**: Semantic elements (forms, sections, divs, headers, nav, etc.)
- **CSS3**: Vanilla CSS (95%+ custom CSS)
  - Flexbox for layouts
  - Grid for product displays
  - Media queries for responsive design (mobile & desktop)
- **JavaScript**: Pure JavaScript (no jQuery or frameworks)
  - ES5+ compatible syntax
  - Arrays and objects manipulation
  - Event handlers and DOM manipulation
- **localStorage API**: For data persistence
  - JSON.stringify() and JSON.parse() for data storage
- **Google Fonts**: For typography (allowed per assignment)
- **No Bootstrap or UI frameworks** (all custom CSS)

## Browser Compatibility

- **Tested on**: Google Chrome (latest version)
- **Recommended**: Google Chrome for best experience
- **Note**: Requires localStorage support

## Features (per assignment)

- **Q1 – Authentication**
  - Registration page: stores users in `localStorage` under `RegistrationData` with TRN, DOB, gender, phone, email, password, cart, invoices.
  - Login page: TRN + password, 3 attempts, account lock page, reset password by TRN.
- **Q2 – Product Catalogue**
  - Products stored in JS array and saved to `AllProducts` in `localStorage`.
  - Dynamic product grid with categories and “Add to Cart”.
- **Q3 – Cart**
  - Cart stored in `localStorage` (`cart`), shows quantity, subtotal, discount, tax and total.
  - Supports update, remove, clear all, checkout.
- **Q4/Q5 – Checkout & Invoice**
  - Checkout collects shipping and payment, validates amount.
  - Generates invoice, saves to `AllInvoices` and the user’s `invoices[]`, shows last invoice on `invoice.html`.
- **Q6 – Statistics**
  - `ShowUserFrequency()` – bar charts by gender and age group.
  - `ShowInvoices()` / `GetUserInvoices()` – log invoices by TRN to `console.log()`.

## Project Structure

```
2408878_IA2_S1AY26/
├── Auth/
│   └── signup.html          # Registration page
├── code/
│   ├── about.html           # Contact/About page
│   ├── account-locked.html  # Account locked error page
│   ├── cart.html            # Shopping cart page
│   ├── checkout.html        # Checkout page
│   ├── dashboard.html       # Analytics dashboard
│   ├── index.html           # Home/Login page
│   ├── invoice.html         # Invoice display page
│   ├── login.html           # Standalone login page
│   ├── products.html        # Product catalogue page
│   ├── script.js            # Main JavaScript file
│   └── style.css            # Main CSS file
├── Host Link.txt            # Hosting information
└── README.md                # This file
```

## Group / Student

- **Student**: Sanjay Stewart  
- **ID**: 2408878  
- **Course**: Web Programming – Thursday 6–8 pm  
- **Email**: SANJAYSTEWART@students.utech.edu.jm
- **Company Name**: Apex Technologies
- **Class Day/Time**: Thursday 6pm - 8pm  


