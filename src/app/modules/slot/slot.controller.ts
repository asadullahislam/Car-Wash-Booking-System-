import { error } from "console";
import { error } from "console";
import { Request, Response } from "express";
import { slotValidationSchema } from "./slot.interface";
import { slotServices } from "./slot.service";

const createSlot = async (req: Request, res: Response) => {
  try {
    const validation = slotValidationSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Invalid slot data",
        error: validation.error.errors,
      });
    }
    const { service, date, startTime, endTime } = req.body;
    const start = new Date(`${date}T${startTime}:00Z`);
    const end = new Date(`${date}T${endTime}:00Z`);
    const slotDuration = 60;

    let currentTime = start;
    const slots = [];

    while (currentTime < end) {
      const nextTime = new Date(currentTime.getTime() + slotDuration * 60000);
      const newSlot = await slotServices.createSlots({
        service,
        date,
        startTime: currentTime.toISOString().split("T")[1].substring(0, 5),
        endTime: nextTime.toISOString().split("T")[1].substring(0, 5),
      });
      slots.push(newSlot);
      currentTime = nextTime;
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Slots added successfully",
      data: slots,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Error adding slots",
      error,
    });
  }
};

export const slotControllers = {
  createSlot,
};
