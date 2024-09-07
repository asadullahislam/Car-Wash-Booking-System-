import { z } from "zod";
import { Schema } from "mongoose";

export type TSlot = {
  service: Schema.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "canceled";
};

export const slotValidationSchema = z.object({
  service: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  isBooked: z.enum(["available", "booked", "canceled"]),
});
