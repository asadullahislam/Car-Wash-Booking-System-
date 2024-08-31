"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.InventorySchema = exports.VariantsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.VariantsSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, "type is required"],
    },
    value: {
        type: String,
        required: [true, "value is required"],
    },
});
exports.InventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: [true, "quantity is required"],
    },
    inStock: {
        type: Boolean,
        required: [true, "inStock is required"],
    },
});
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    price: {
        type: Number,
        required: [true, "price is required"],
    },
    category: {
        type: String,
        required: [true, "category is required"],
    },
    tags: {
        type: [String],
        required: [true, "tags is required"],
    },
    variants: {
        type: [exports.VariantsSchema],
        required: [true, "variants is required"],
    },
    inventory: {
        type: exports.InventorySchema,
        required: [true, "inventory is required"],
    },
});
exports.ProductModel = (0, mongoose_1.model)("Product", ProductSchema);
