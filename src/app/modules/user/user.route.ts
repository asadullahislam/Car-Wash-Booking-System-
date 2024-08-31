import { userController } from "./user.controller";

import { Router } from "express";

const router = Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.login);

export const userRoutes = router;
