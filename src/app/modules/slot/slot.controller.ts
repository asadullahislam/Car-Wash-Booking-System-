import { Request, Response } from "express";
import { slotServices } from "./slot.service";

const createSlots = async (req: Request, res: Response): Promise<void> => {
  try {
    const { service, date, startTime, endTime } = req.body;
    const serviceDuration = 60;
    const slots = await slotServices.createSlots(
      service,
      date,
      startTime,
      endTime,
      serviceDuration
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "slots created successfully",
      data: slots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Error creating slots",
      error: error,
    });
  }
};

const getSlot = async (req: Request, res: Response) => {
  try {
    const { serviceId, date }: { serviceId?: string; date?: string } =
      req.query;

    const slots = await slotServices.getSlotsByDateAndServiceId({
      service: serviceId,
      date,
    });
    if (slots.length === 0) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No Data Found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Available slots retrieved successfully",
        data: slots,
      });
    }
  } catch (error) {
    console.error("Error retrieving slots:", error); // Log the error
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Error retrieving slots",
      error: error.message, // Return error message
    });
  }
};

export const slotControllers = {
  createSlots,
  getSlot,
};
