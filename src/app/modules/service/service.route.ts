import { Router } from "express";
import { serviceController } from "./service.controller";
import { adminAuth, auth } from "../../../Middlewares/authMidleware";
import { slotControllers } from "../slot/slot.controller";
// import { adminAuth, auth } from "../../../Middlewares/auth";

const router = Router();

router.get("/", serviceController.getAllServices);

router.get("/:id", serviceController.getServiceById);

router.post("/", auth, adminAuth, serviceController.createService);

router.put("/:id", auth, adminAuth, serviceController.updateService);
router.post("/slots", auth, adminAuth, slotControllers.createSlots);

router.delete("/:id", auth, adminAuth, serviceController.deleteService);

export const serviceRoutes = router;
