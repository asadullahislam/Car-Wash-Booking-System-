import { Router } from "express";
import express from "express";
import { slotControllers } from "./slot.controller";

const router = express.Router();

router.post("/slots", slotControllers.createSlot);

export const slotRoutes = router;
