# Car Wash Booking Sysem

This is a car wash bookin system server project. It provides an API to handle various operations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Contributing](#contributing)

## Installation

### Prerequisites

Node.js (>= 14.x)
npm (>= 6.x) or yarn (>= 1.x)
MongoDB (>= 4.x)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/username/Car-Wash-Booking-System.git
   cd Car-Wash-Booking-System
   ```

2. Install dependencies:

   Using npm:

   ```bash
   npm install
   ```

## Usage

### Running the Server

1. Create a `.env` file in the root directory and add your environment variables. For example:

   ```.env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
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

## User Routes

==>

POST /api/auth/register - Register a new user.

POST /api/auth/login - Log in a user.

GET /api/auth/profile - Get user profile (requires authentication).

## Service Routes

==>

POST /api/services - Create a new car wash service (admin only).

GET /api/services - Get all available services.

GET /api/services/:serviceId - Get a service by ID.

PUT /api/services/:serviceId - Update a service by ID (admin only).

DELETE /api/services/:serviceId - Delete a service by ID (admin only)

## Slot Routes

==>

POST /api/services/:serviceId/slots - Create slots for a service (admin only).

GET /api/slots - Get all available slots for booking.

PUT /api/slots/:slotId - Update slot information (admin only)

## Booking Routes

==>

POST /api/bookings - Create a new booking.

GET /api/bookings - Get all bookings (admin only).

GET /api/bookings/:bookingId - Get a booking by ID.

PUT /api/bookings/:bookingId - Update a booking.

DELETE /api/bookings/:bookingId - Cancel or delete a booking.

## Configuration

Configuration is managed via environment variables. Below are the commonly used variables:

####

PORT - The port number on which the server runs.

DB_URL - The connection string for the MongoDB database.

JWT_SECRET - Secret key used for JSON Web Token (JWT) authentication.

## Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Commit your changes with a clear message.
5. Push your changes to your fork.
6. Create a pull request.
