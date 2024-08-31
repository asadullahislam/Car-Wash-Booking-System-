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
exports.ProductControllers = void 0;
const product_model_1 = require("./product.model");
const product_service_1 = require("./product.service");
const product_validation_zod_1 = __importDefault(require("./product.validation.zod"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const zodParsedProductData = product_validation_zod_1.default.parse(product);
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParsedProductData);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Product is not created successfully",
            error: error,
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        if (searchTerm) {
            const queryProducts = yield product_service_1.ProductServices.queryProductByName(searchTerm);
            if (queryProducts.length === 0) {
                res.status(404).json({
                    success: false,
                    message: `No products found matching search term ${searchTerm} `,
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    message: `Products matching search term '${searchTerm}' fetched successfully!`,
                    data: queryProducts,
                });
            }
        }
        else {
            const result = yield product_service_1.ProductServices.getAllProductFromDB();
            res.status(200).json({
                success: true,
                message: `porducts fetched successfully!`,
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Product is not fatched successfully",
            error: error,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Product is not fatched successfully",
            error: error,
        });
    }
});
//update document
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const zodParsedUpdateData = product_validation_zod_1.default.parse(updateData);
        const updateProduct = yield product_model_1.ProductModel.findByIdAndUpdate(productId, zodParsedUpdateData, { new: true });
        if (!updateProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: updateData,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating product",
            error: error,
        });
    }
});
//delete document
const deleteOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deleteProduct(productId);
        console.log(result);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Product delete is not successfully",
            error: error,
        });
    }
});
// const searchProduct = async (req: Request, res: Response) => {
//   try {
//     const { searchItem } = req.query;
//     if (searchItem || typeof searchItem !== "string") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or missing search term",
//       });
//     }
//     const result = await productService.deleteProduct(productId);
//     res.status(200).json({
//       success: true,
//       message: "Product deleted successfully!",
//       data: null,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Product delete is notsuccessfully",
//       error: error,
//     });
//   }
// };
exports.ProductControllers = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteOneProduct,
};
