"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the Zod schema
const OrderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    productId: zod_1.z.string().nonempty({ message: "Product ID is required" }),
    price: zod_1.z.number().min(0.01, { message: "Price must be a positive number" }),
    quantity: zod_1.z
        .number()
        .int()
        .min(1, { message: "Quantity must be a positive integer" }),
});
exports.default = OrderValidationSchema;
