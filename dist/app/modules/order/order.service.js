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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, productId, price, quantity } = orderData;
    const product = yield product_model_1.ProductModel.findById(productId);
    if (!product) {
        return { success: false, message: "Product not found" };
    }
    // check is sufficient quantity is available
    if (product.inventory.quantity < quantity) {
        return {
            success: false,
            message: "Insufficient quantity available in inventory",
        };
    }
    //update inventory
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0; //update isStock
    yield product.save();
    const newOrder = yield order_model_1.OrderModel.create({
        email,
        productId,
        price,
        quantity,
    });
    return newOrder;
});
const getAllOrderFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find();
    return result;
});
const getOrdersByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.OrderModel.find({ email });
    return orders;
});
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrderFromDB,
    getOrdersByEmail,
};
