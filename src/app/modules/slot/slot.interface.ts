// import { z } from "zod";
// import { Types } from "mongoose";

// export type TSlot = {
//   service: Types.ObjectId;
//   date: Date;
//   startTime: string;
//   endTime: string;
//   isBooked: "available" | "booked" | "canceled";
// };

// export const slotValidationSchema = z.object({
//   service: z.string(),
//   date: z.string(),
//   startTime: z.string(),
//   endTime: z.string(),
//   isBooked: z.enum(["available", "booked", "canceled"]),
// });

import { z } from "zod";

export type TService = {
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted?: boolean;
};

export const serviceValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  duration: z.number(),
  isDeleted: z.boolean().optional(),
});
