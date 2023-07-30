"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_route_1 = require("./src/routes/auth.route");
const user_dashboard_route_1 = require("./src/routes/user-dashboard.route");
const product_route_1 = require("./src/routes/product.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const port = 6000;
const hostname = "127.0.0.1";
app.use("/auth", auth_route_1.authRouter);
app.use("/dashboard", user_dashboard_route_1.dashboardRouter);
app.use("/product", product_route_1.productRouter);
app.listen(port, hostname, () => {
    console.log(`Server started on port ${port}`);
});
