import cors from "cors";
import express, { Application, Request, Response } from "express";
import { userRoutes } from "./app/modules/user/user.route";
import { serviceRoutes } from "./app/modules/service/service.route";
import { slotControllers } from "./app/modules/slot/slot.controller";
import { slotRoutes } from "./app/modules/slot/slot.route";

// import { roomRouter } from "./app/modules/room/room.route";
// import { slotRouter } from "./app/modules/slot/slot.route";
// import {
//   bookingRouter,
//   bookingUserRouter,
// } from "./app/modules/booking/booking.route";

const app: Application = express();

app.use(express.json());
app.use(cors());

// routes

app.use("/api/auth", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/services", slotRoutes);
// app.use("/api/bookings", bookingRouter);
// app.use("/api/my-bookings", bookingUserRouter);

const getAController = (req: Request, res: Response) => {
  res.send("server is Running...");
};

app.get("/", getAController);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
});

export default app;
