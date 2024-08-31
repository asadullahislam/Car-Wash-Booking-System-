import { Request, Response } from "express";
import { serviceValidationSchema } from "./service.interface";
import { serviceService } from "./service.service";
import { error } from "console";

const createService = async (req: Request, res: Response) => {
  const serviceData = req.body;

  try {
    const service = await serviceService.createService(serviceData);
    const validation = serviceValidationSchema.safeParse(serviceData);

    if (!validation.success) {
      return res.status(500).json({
        success: false,
        statusCode: 400,
        message: "invalid service data",
        error: validation.error.errors,
      });
    }

    if (service) {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Service created successfully",
        data: {
          _id: service._id,
          name: service.name,
          description: service.description,
          price: service.price,
          duration: service.duration,
          isDeleted: service.isDeleted,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Error adding service",
        error: error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Error adding service ",
      error: error,
    });
  }
};

const getAllServices = async (req: Request, res: Response) => {
  try {
    const service = await serviceService.getAllServices();
    if (service.length === 0) {
      res.status(200).json({
        success: false,
        statusCode: 404,
        message: "no service found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Services retrieved successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Error retrieving service",
      error: error,
    });
  }
};

const getServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const service = await serviceService.getServiceById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "service not found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Service retrieved successfully",
      data: {
        _id: service._id,
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        isDeleted: service.isDeleted,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Error retrieving service ",
      error: error,
    });
  }
};

const updateService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const service = await serviceService.updateServiceById(id, updateData);
    if (!service) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "service not found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Service updated successfully",
      data: {
        _id: service._id,
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        isDeleted: service.isDeleted,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Error updating service ",
      error: error,
    });
  }
};

const deleteService = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const service = await serviceService.deleteServiceById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "service not found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "service deleted successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Error deleting service ",
      error: error,
    });
  }
};

export const serviceController = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
