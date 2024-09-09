"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./app/modules/user/user.route");
const service_route_1 = require("./app/modules/service/service.route");
const slot_route_1 = require("./app/modules/slot/slot.route");
const booking_route_1 = require("./app/modules/booking/booking.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use("/api/auth", user_route_1.userRoutes);
app.use("/api/services", service_route_1.serviceRoutes);
// app.use("/api/services", slotRoutes);
app.use("/api/slots", slot_route_1.slotRoutes);
app.use("/api", booking_route_1.bookingRoutes);
const getAController = (req, res) => {
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
exports.default = app;
