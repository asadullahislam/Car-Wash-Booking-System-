// import { Router } from "express";
// import { bookingController } from "./booking.controller";
// import { adminAuth, auth } from "../../../Middlewares/authMidleware";

// const router = Router();

// // Authenticated user route to create a booking
// router.post("/bookings", auth, bookingController.createBooking);

// // Admin route to get all bookings
// router.get("/bookings", auth, adminAuth, bookingController.getAllBookings);

// // Authenticated user route to get their own bookings
// router.get("/my-bookings", auth, bookingController.getMyBookings);

// // Admin or the user who made the booking can update a booking
// router.patch("/:id", auth, bookingController.updateBooking);

// // Admin or the user who made the booking can get a booking by ID
// router.get("/:id", auth, bookingController.getBooking);

// export const bookingRoutes = router;

// booking.route.ts

import { Router } from "express";
import { bookingController } from "./booking.controller";
import { adminAuth, auth, userOnly } from "../../../Middlewares/authMidleware";
// Adjust the path

const router = Router();

// User-only route for creating a booking
router.post("/bookings", auth, userOnly, bookingController.createBooking);

// Admin-only route for getting all bookings
router.get("/bookings", auth, adminAuth, bookingController.getAllBookings);

// User route for getting their own bookings
router.get("/my-bookings", auth, userOnly, bookingController.getMyBookings);

export const bookingRoutes = router;
