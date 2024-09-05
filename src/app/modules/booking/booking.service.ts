import { Schema } from "mongoose";
import SlotModel from "../slot/slot.model";
import BookingModel from "./booking.model";
import { TBooking } from "./booking.interface";

import UserModel from "../user/user.model"; // Added UserModel
import ServiceModel from "../service/services.model";

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
  const slot = await SlotModel.findById(booking.slotId);
  const service = await ServiceModel.findById(booking.serviceId);
  const user = await UserModel.findById(booking.user);

  if (slot && service && user) {
    const result = await (
      await BookingModel.create({
        customer: user._id,
        service: service._id,
        slot: slot._id,
        vehicleType: booking.vehicleType,
        vehicleBrand: booking.vehicleBrand,
        vehicleModel: booking.vehicleModel,
        manufacturingYear: booking.manufacturingYear,
        registrationPlate: booking.registrationPlate,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    )
      .populate("customer")
      .populate("service")
      .populate("slot");

    // Update the slot status to booked
    await updateSlotBooking([slot._id]);

    return result;
  } else {
    throw new Error("Slot, service, or user not found");
  }
};

const updateSlotBooking = async (slots: Schema.Types.ObjectId[]) => {
  const result = await SlotModel.updateMany(
    { _id: { $in: slots } },
    { isBooked: "booked" }
  );
  return result;
};

const getAllBookings = async () => {
  const result = await BookingModel.find({})
    .populate("customer")
    .populate("service")
    .populate("slot");
  return result;
};

const getMyBookings = async (userId: string) => {
  const result = await BookingModel.find({ customer: userId })
    .populate("service")
    .populate("slot");
  return result;
};

const updateBookingById = async (id: string, data: Partial<TBooking>) => {
  const result = await BookingModel.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const getBookingById = async (id: string) => {
  const result = await BookingModel.findById(id)
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
