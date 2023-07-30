"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_dashboard_controller_1 = require("../controllers/user-dashboard.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const upload_middleware_1 = require("../middleware/upload.middleware");
exports.dashboardRouter = express_1.default.Router();
exports.dashboardRouter.post('/updatePhoto', auth_middleware_1.default, upload_middleware_1.upload.single('photo'), auth_middleware_1.default, user_dashboard_controller_1.dashboardController.uploadProfilePhoto);
exports.dashboardRouter.put('/updateProfile', auth_middleware_1.default, user_dashboard_controller_1.dashboardController.updateProfile);
exports.dashboardRouter.post('/addAddress', auth_middleware_1.default, user_dashboard_controller_1.dashboardController.addAddress);
exports.dashboardRouter.get('/allAddress', auth_middleware_1.default, user_dashboard_controller_1.dashboardController.allAddress);
exports.dashboardRouter.delete('/deleteAddress', auth_middleware_1.default, user_dashboard_controller_1.dashboardController.deleteAddress);
exports.dashboardRouter.put('/updatePassword', auth_middleware_1.default, user_dashboard_controller_1.dashboardController.updatePassword);
exports.dashboardRouter.put('/updateAddress', auth_middleware_1.default, user_dashboard_controller_1.dashboardController.updateAddress);
