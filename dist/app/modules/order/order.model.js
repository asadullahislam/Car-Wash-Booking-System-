"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
//order schema
const OrderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    productId: {
        type: String,
        required: [true, "productId is required"],
    },
    price: {
        type: Number,
        required: [true, "price is required"],
    },
    quantity: {
        type: Number,
        required: [true, "quantity is required"],
    },
});
exports.OrderModel = (0, mongoose_1.model)("order", OrderSchema);
