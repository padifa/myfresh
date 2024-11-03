# MyFresh

MyFresh is an organic produce e-commerce application developed to connect local farmers with customers in Fargo, North Dakota. The app aims to provide users with a convenient and transparent platform to purchase fresh fruits and vegetables directly from local farmers.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Browse Products**: Customers can view all products available on the platform.
- **User Accounts**: Separate user profiles for customers and farmers, allowing unique experiences for each.
- **Cart and Checkout**: Users can add items to their cart and complete their orders.
- **Responsive Design**: Built with React-Bootstrap for a mobile-friendly experience.
- **Order Management**: Farmers can manage their listed products and track customer orders.

## Tech Stack

### Frontend

- **React** with **Redux** for state management
- **Redux-Saga** for handling asynchronous operations
- **React-Bootstrap** for styling

### Backend

- **Node.js** and **Express** for API development
- **PostgreSQL** for database management

### Additional Libraries and Tools

- **Passport.js** for authentication
- **HTML5** and **CSS3** for markup and styling

## Installation

1. **Clone the Repository**
   git clone https://github.com/padifa/myfresh
   cd myfresh
2. **Install Dependencies Install backend dependencies**
   npm install

**Database Setup**
Create a PostgreSQL database for the project.
Run the SQL commands in database.sql to set up the necessary tables (e.g., customers, farmers, products, orders).
Environment Variables Create a .env file in the root directory and configure the following environment variables:
DATABASE_URL=<myfresh.sql>

**Database Schema**

- Tables
  Customers: Stores customer profiles and contact information.
  Farmers: Stores farmer profiles and farm details.
  Products: Stores information about available produce, including price, description, image and quantity.
  Orders: Stores details of customer orders, including customer ID, order date, and total amount.

# In the project root directory

npm run server

3. **Install frontend dependencies**

   npm install

   npm run client

# In the client directory

Open in Browser The app should now be running on http://localhost:5173/.

# Usage

**Customers**

- Browse products by category or search.

- Add items to the cart and proceed to checkout.

- View order history in their profile.

**Farmers**

- Add new products to the platform.

- Manage orders and track fulfillment status.

**Author**

Developed by Papa Dienou Faye. For inquiries, reach out at padifa7@live.fr.
