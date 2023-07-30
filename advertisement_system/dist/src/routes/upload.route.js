"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
exports.Router = express_1.default.Router();
productRouter.post('/addProduct', auth_middleware_1.default, product_controller_1.productController.addProduct);
