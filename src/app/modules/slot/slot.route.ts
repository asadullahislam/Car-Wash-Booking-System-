import { Router } from "express";
import { slotControllers } from "./slot.controller";

const router = Router();

router.post("/", slotControllers.createSlots);
router.get("/availability", slotControllers.getSlot);

export const slotRoutes = router;
