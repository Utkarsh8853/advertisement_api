"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
exports.authRouter = express_1.default.Router();
exports.authRouter.post('/signup', auth_controller_1.authController.signup);
exports.authRouter.post('/login', auth_controller_1.authController.login);
exports.authRouter.get('/logout', auth_middleware_1.default, auth_controller_1.authController.logout);
exports.authRouter.post('/forgetPassword', auth_controller_1.authController.forgetPassword);
exports.authRouter.put('/setPassword', auth_controller_1.authController.setNewPassword);
