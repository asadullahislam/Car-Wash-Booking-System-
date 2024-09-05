import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();

// Route to create a booking (accessible by users)
router.post("/api/bookings", bookingController.createBooking);

// Route to get all bookings (accessible by admins)
router.get("/api/bookings", bookingController.getAllBookings);

// Route to get the current user's bookings
router.get("/api/my-bookings", bookingController.getMyBookings);

// Route to update a booking by ID (accessible by admins or the user who made the booking)
router.patch("/api/bookings/:id", bookingController.updateBooking);

// Route to get a booking by ID (accessible by admins or the user who made the booking)
router.get("/api/bookings/:id", bookingController.getBooking);

export const bookingRoutes = router;
