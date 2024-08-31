# E-Commerce-backend-application

This is a E-Commerce-backend-application server project. It provides an API to handle various operations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Contributing](#contributing)

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Steps

1. Clone the repository:

   ```bash
   git clone  https://github.com/asadullahislam/e-commerce-product-application-mongose.git
   cd repo-name
   ```

2. Install dependencies:

   Using npm:

   ```bash
   npm install
   ```

## Usage

### Running the Server

1. Create a `.env` file in the root directory and add your environment variables. For example:

   ```env
   PORT=5000
   DB_URL=your_mongodb_connection_string
   ```

2. Start the server:

   Using npm:

   ```bash
   npm start
   ```

   Using yarn:

   ```bash
   yarn start
   ```

3. The server should now be running at `http://localhost:5000`.

## API Endpoints

Here are some example endpoints provided by the server:

- `POST /api/products` - Create a new product.
- `GET /api/products` - Get all products.
- `GET /api/products/:productId` - Get a product by its ID.
- `PUT /api/products/:productId` - Update a product by its ID.
- `DELETE /api/products/:productId` - Delete a product by its ID.
- `GET /api/products?searchTerm=iphone` - Search products by name or tags.
- `POST /api/orders` - Create a new Order.
- `GET /api/orders` - Get all Order.
- `GET /api/orders?email=name@gmail.com` - Get a order by email.

## Configuration

Configuration is managed via environment variables. Below are the commonly used variables:

- `PORT` - The port number on which the server runs.
- `MONGODB_URI` - The connection string for the MongoDB database.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Commit your changes with a clear message.
5. Push your changes to your fork.
6. Create a pull request.
