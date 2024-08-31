import { Router } from "express";
import { serviceController } from "./service.controller";

const router = Router();

router.post("/", serviceController.createService);
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getServiceById);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);

export const serviceRoutes = router;
