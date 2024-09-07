import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { TBooking } from "./booking.interface";

// Controller function to create a booking
const createBooking = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id; // Assuming you have user information from JWT in req.user
    const {
      serviceId,
      slotId,
      vehicleType,
      vehicleBrand,
      vehicleModel,
      manufacturingYear,
      registrationPlate,
    } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized: User not found",
      });
    }

    const booking = await bookingService.createBooking({
      serviceId,
      slotId,
      user: userId.toString(),
      vehicleType,
      vehicleBrand,
      vehicleModel,
      manufacturingYear,
      registrationPlate,
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking successful",
      data: booking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message || "Internal Server Error",
    });
  }
};

// Controller function to get all bookings
const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getAllBookings();
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "All bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message || "Internal Server Error",
    });
  }
};

// Controller function to get bookings for a specific user
const getMyBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id; // Assuming you have user information from JWT in req.user

    if (!userId) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized: User not found",
      });
    }

    const bookings = await bookingService.getMyBookings(userId.toString());
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message || "Internal Server Error",
    });
  }
};

// Controller function to update a booking by ID
const updateBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: Partial<TBooking> = req.body;

    const updatedBooking = await bookingService.updateBookingById(
      id,
      updateData
    );

    if (updatedBooking) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Booking updated successfully",
        data: updatedBooking,
      });
    } else {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Booking not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message || "Internal Server Error",
    });
  }
};

// Controller function to get a booking by ID
const getBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await bookingService.getBookingById(id);

    if (booking) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Booking retrieved successfully",
        data: booking,
      });
    } else {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Booking not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message || "Internal Server Error",
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBookings,
  getMyBookings,
  updateBooking,
  getBooking,
};
