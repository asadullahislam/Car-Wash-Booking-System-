import { Date } from "mongoose";
import { z } from "zod";
export type TService = {
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export const serviceValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  duration: z.number(), // Duration in minutes
  isDeleted: z.boolean(),
});
