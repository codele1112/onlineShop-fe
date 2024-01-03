#Online Shop
Our online shop wants to build web app that serves as a platform to allow our customers to browse and purchase products of various categories from us. The app should provide an intuitive and seamless user experience, ensuring that customers can easily find and purchase the products they want. It should also allow our admin to create and manage our products, orders, transactions, and promotions.

##User Stories
###Guest Customer User
As a guest user, I can browse through the product catalog,
As a guest user, I can view product details
As a guest user, I can add products to my cart.
###Registered Customer User
As a registered user, I can log in to the app,
As a registered user, I can browse through the product catalog,
As a registered user, I can view product details
As a registered user, I can add products to my cart.
As a registered user, I can check out securely.
As a registered user, I want to be able to track my orders and receive updates on their status.
As a registered user, I want to be able to check out my cart with Cash On Delivery payment options.
###Admin User
As an admin, I can register/sign in to my admin account.
As an admin, I can list my products on the marketplace.
As an admin, I can manage my product listings and update them as needed.
As an admin, I can receive and manage orders from buyers.
As an admin, I can communicate with buyers regarding their orders.

##Features and Specifications
###User Registration
Allow users to sign up, log in, and log out of the marketplace application with appropriate role.
Ensure that only authorized users have access to the appropriate features.
Use encryption to securely store user passwords and other sensitive information.
###Product Catalog & Search
Admin can create and manage (update, remove) product listings, including details such as title, description, price, and images.
Customers can filter and browse for products based on price, categories.
Customers can view the product details (ex: description, stock quantity,…)
###Cart Management & Checkout
Allow customers to add products to a cart, modify cart items, and proceed to checkout.
Provide a secure, user-friendly checkout process accepting COD payment methods.
###Order Management
Allow admin to receive order
Allow admin to update the delivery status of an order, which triggers automated notifications to be sent to the customers.
Customers can view their order history, track order status, and cancel orders (at the appropriate stage, for example before the order has been sent).

###Admin Dashboard

Admin can view key information such as product inventory, registered customers gained, revenue gained,…
Admin can view and filter total orders by status or other appropriate attributes.

##Endpoint APIs

###Auth APIs
/\*\*

- @route POST /auth/login
- @description Log in with email and password
- @body { email, password }
- @access Public
  \*/

/\*\*

- @rout POST /auth/forgotpassword
- @query email
- @access Public
  \*/

/\*\*

- @rout PUT /auth/resetpassword
- @description Reset password.
- @body (email, password)
- @access Public
  \*/

/\*\*

- @rout POST /auth/logout
- @description Logout account.
- @access Public
  \*/

User APIs
/\*\*

- @route POST /user/register
- @description Register a new user
- @body {name, email, password}
- @access Public
  /\*\*

\*\*

/\*\*

- @route POST /user/register
- @description Register a new user
- @body {name, email, password}
- @access Public
  /\*\*
- @rout GET /users/user-stat
- @description Get users stats
- @access Admin login required
  _/
  /\*\*
  _@rout GET /users/final-registration
  _@description final registration a new account
  _@access Public
  \*/

- @route GET /user/:userId
- @description Get a user profile
- @body { email, password }
- @access Login required
  Cart APIs
  /\*\*
- @route GET /cart
- @description Get all products in cart
- @access Public
  \*/
  /\*\*
- @route GET /cart/checkout
- @description Checkout cart
- @access Public
  \*/
  /\*\*
- @route GET /cart/checkout/payment
- @description Make payment
- @access Public
  \*/
  Order APIs
  /\*\*
- @route POST /orders
- @description Create an order
- @body { userId, products, subtotal, total, shipping, delivery_status, payment_status }
- @access Public
  \*/
  /\*\*
- @route PUT /orders
- @description Update an order - Admin only
- @body { userId, products, subtotal, total, shipping, delivery_status, payment_status }
- @access Login required
  \*/
  /\*\*
- @route DELETE /orders
- @description Delete an order - Admin only
- @access Login required
  \*/
  /\*\*
- @route GET /orders
- @description Get all orders
- @access Login required
  \*/
  /\*\*
- @route GET /admin/orders/:userId
- @description Get orders of a user
- @access Login required
  \*/
  /\*\*
- @route GET /user/:userId/orders
- @description Track a user orders
- @access Login required
  \*/
  Product APIs
  /\*\*
- @route POST /admin/products/product
- @description Create a product
- @body { name, price, description , image }
- @access Login required
  \*/
  /\*\*
- @route DELETE /admin/products/product
- @description Delete a product
- @access Login required
  \*/
  /\*\*
- @route PUT /admin/products/:productId
- @description Update a product
- @body { name, price, description , image }
- @access Login required
  \*/
  /\*\*
- @route GET /products?page=1&limit=10
- @description Get all products a user can see with pagination
- @access Public
  \*/
  /\*\*
- @route GET /products/:productId
- @description Get product detail
- @access Public
  \*/
