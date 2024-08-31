import { TService } from "./service.interface";
import ServiceModel from "./services.model";

const createService = async (serviceData: TService) => {
  const result = await ServiceModel.create(serviceData);
  return result;
};

const getAllServices = async () => {
  const result = await ServiceModel.find({ isDeleted: false });
  return result;
};

const getServiceById = async (serviceId: string) => {
  const result = await ServiceModel.findById(serviceId);
  return result;
};

const updateServiceById = async (
  serviceId: string,
  updateData: Partial<TService>
) => {
  const result = await ServiceModel.findByIdAndUpdate(serviceId, updateData, {
    new: true,
  });
  return result;
};

const deleteServiceById = async (serviceId: string) => {
  const result = await ServiceModel.findByIdAndDelete(serviceId);
  return result;
};

export const serviceService = {
  createService,
  getAllServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
};
