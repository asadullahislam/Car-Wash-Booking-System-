import { Types } from "mongoose";

import BookingModel from "./booking.model";
import { TBooking } from "./booking.interface";
import UserModel from "../user/user.model";
import ServiceModel from "../service/services.model";
import SlotModel from "../slot/slot.model";

// Helper function to validate ObjectId
const isValidObjectId = (id: string) => {
  return Types.ObjectId.isValid(id);
};

// Function to create a booking
const createBooking = async (booking: {
  serviceId: string;
  slotId: string;
  user: string;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
}) => {
  const { serviceId, slotId, user } = booking;

  // Validate ObjectIds
  if (
    !isValidObjectId(serviceId) ||
    !isValidObjectId(slotId) ||
    !isValidObjectId(user)
  ) {
    throw new Error("Invalid slot, service, or user ID format");
  }

  const slot = await SlotModel.findById(slotId);
  const service = await ServiceModel.findById(serviceId);
  const userRecord = await UserModel.findById(user);

  if (!slot) {
    throw new Error(`Slot with ID ${slotId} not found`);
  }
  if (!service) {
    throw new Error(`Service with ID ${serviceId} not found`);
  }
  if (!userRecord) {
    throw new Error(`User with ID ${user} not found`);
  }

  // Create the booking document
  const newBooking = new BookingModel({
    customer: userRecord._id,
    service: service._id,
    slot: slot._id,
    vehicleType: booking.vehicleType,
    vehicleBrand: booking.vehicleBrand,
    vehicleModel: booking.vehicleModel,
    manufacturingYear: booking.manufacturingYear,
    registrationPlate: booking.registrationPlate,
  });

  // Save the booking document
  const savedBooking = await newBooking.save();

  // Populate the saved document
  const populatedBooking = await BookingModel.findById(savedBooking._id)
    .populate("customer")
    .populate("service")
    .populate("slot")
    .exec();

  // Update the slot status to booked
  await updateSlotBooking([slot._id]);

  return populatedBooking;
};

// Function to update slot booking status
const updateSlotBooking = async (slots: Types.ObjectId[]) => {
  const result = await SlotModel.updateMany(
    { _id: { $in: slots } },
    { $set: { isBooked: "booked" } }
  );
  return result;
};

// Function to get all bookings
const getAllBookings = async () => {
  const result = await BookingModel.find({})
    .populate("customer")
    .populate("service")
    .populate("slot");
  return result;
};

// Function to get bookings for a specific user
const getMyBookings = async (userId: string) => {
  if (!isValidObjectId(userId)) {
    throw new Error("Invalid user ID format");
  }

  const result = await BookingModel.find({
    customer: new Types.ObjectId(userId),
  })
    .populate("service")
    .populate("slot");
  return result;
};

// Function to update a booking by ID
const updateBookingById = async (id: string, data: Partial<TBooking>) => {
  if (!isValidObjectId(id)) {
    throw new Error("Invalid booking ID format");
  }

  const result = await BookingModel.findByIdAndUpdate(
    new Types.ObjectId(id),
    data,
    { new: true }
  );
  return result;
};

// Function to get a booking by ID
const getBookingById = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new Error("Invalid booking ID format");
  }

  const result = await BookingModel.findById(new Types.ObjectId(id))
    .populate("customer")
    .populate("service")
    .populate("slot");
  return result;
};

export const bookingService = {
  createBooking,
  updateSlotBooking,
  getAllBookings,
  getMyBookings,
  updateBookingById,
  getBookingById,
};
