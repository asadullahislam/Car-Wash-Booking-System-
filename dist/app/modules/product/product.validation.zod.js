"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
// Variants Schema
const VariantValidationsSchema = zod_1.default.object({
    type: zod_1.default.string().nonempty({ message: "type is required" }),
    value: zod_1.default.string().nonempty({ message: "value is required" }),
});
// Inventory Schema
const InventoryValidationSchema = zod_1.default.object({
    quantity: zod_1.default
        .number()
        .int()
        .min(1, { message: "quantity is required and must be a positive integer" }),
    inStock: zod_1.default.boolean({ message: "inStock is required" }),
});
// Product Schema
const ProductValidationSchema = zod_1.default.object({
    name: zod_1.default.string().nonempty({ message: "Name is required" }),
    description: zod_1.default.string().nonempty({ message: "description is required" }),
    price: zod_1.default
        .number()
        .min(0.01, { message: "price is required and must be a positive number" }),
    category: zod_1.default.string().nonempty({ message: "category is required" }),
    tags: zod_1.default
        .array(zod_1.default.string().nonempty({ message: "tags must be non-empty strings" }))
        .nonempty({ message: "tags is required" }),
    variants: zod_1.default
        .array(VariantValidationsSchema)
        .nonempty({ message: "variants is required" }),
    inventory: InventoryValidationSchema,
});
exports.default = ProductValidationSchema;
