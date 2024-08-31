import { TSlot } from "./slot.interface";
import SlotModel from "./slot.model";

const createSlots = async (slots: Partial<TSlot>) => {
  const result = await SlotModel.create(slots);
  return result;
};

const getSlotsByServiceAndDate = async (serviceId: string, date: string) => {
  const result = await SlotModel.find({ service: serviceId, date });
  return result;
};

export const slotServices = {
  createSlots,
  getSlotsByServiceAndDate,
};
