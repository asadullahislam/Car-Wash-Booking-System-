"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const zodParsedOrderData = order_validation_1.default.parse(orderData);
        const result = yield order_service_1.OrderServices.createOrderIntoDB(zodParsedOrderData);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Order not found",
            error: error,
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        if (email) {
            const queryOrder = yield order_service_1.OrderServices.getOrdersByEmail(email);
            if (queryOrder.length == 0) {
                res.status(404).json({
                    success: false,
                    message: `No orders found for this email:${email} .`,
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    message: "Orders fetched successfully for user email!",
                    data: queryOrder,
                });
            }
        }
        else {
            const result = yield order_service_1.OrderServices.getAllOrderFromDB();
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Orders is not fetched successfully!",
            error: error,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrder,
};
