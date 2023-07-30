"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const upload_middleware_1 = require("../middleware/upload.middleware");
exports.productRouter = express_1.default.Router();
exports.productRouter.post('/addProduct', auth_middleware_1.default, product_controller_1.productController.addProduct);
exports.productRouter.get('/viewProduct', auth_middleware_1.default, product_controller_1.productController.viewProduct);
exports.productRouter.post('/addProductImage', auth_middleware_1.default, upload_middleware_1.upload.single('photo'), auth_middleware_1.default, product_controller_1.productController.addProductImage);
exports.productRouter.put('/bidding', auth_middleware_1.default, product_controller_1.productController.bidding);
exports.productRouter.put('/filter', auth_middleware_1.default, product_controller_1.productController.filter);
exports.productRouter.delete('/remove', auth_middleware_1.default, product_controller_1.productController.removeProduct);
