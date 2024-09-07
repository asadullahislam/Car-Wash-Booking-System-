import { Router } from "express";
import { slotControllers } from "./slot.controller";
import { adminAuth, auth } from "../../../Middlewares/authMidleware";

const router = Router();

// router.post("/", auth, adminAuth, slotControllers.createSlots);
router.get("/availability", auth, slotControllers.getSlot);

export const slotRoutes = router;
