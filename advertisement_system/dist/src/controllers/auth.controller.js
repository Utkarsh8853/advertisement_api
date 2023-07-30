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
exports.authController = void 0;
const user_model_1 = __importDefault(require("../database/models/user.model"));
const session_model_1 = __importDefault(require("../database/models/session.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const redis_1 = require("redis");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client = (0, redis_1.createClient)();
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();
class AuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, username, email, password } = req.body;
                const check1 = yield user_model_1.default.findOne({ where: { username: username } });
                const check2 = yield user_model_1.default.findOne({ where: { email: email } });
                if (!check1 && !check2) {
                    const hashPwd = yield bcrypt_1.default.hash(password, 3);
                    console.log(hashPwd);
                    const result = yield user_model_1.default.create({ name: name, username: username, email: email, password: hashPwd });
                    console.log('Signup successfully', result);
                    return res.status(200).json({ message: "OK" });
                }
                else if (check1 || check2) {
                    return res.status(400).json({ message: "Username or email already exist" });
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield user_model_1.default.findOne({ where: { email: email } });
                if (!result) {
                    return res.status(200).json({ message: "Wrong user" });
                }
                const pwdMatch = yield bcrypt_1.default.compare(password, result.password);
                if (pwdMatch) {
                    console.log('Login result', result);
                    let session_payload = {
                        user_id: result.id,
                        device_id: "1234",
                        device_type: "google chrome",
                        isActive: true
                    };
                    yield session_model_1.default.create(session_payload);
                    const a = yield session_model_1.default.max('id');
                    const token = jsonwebtoken_1.default.sign({ id: result.id, session_id: a }, 'appinventiv', { expiresIn: '24h' });
                    console.log(token);
                    yield client.set(`${result.id}_${a}`, JSON.stringify(session_payload));
                    return res.send({ message: "User Login Succesfully", token: token });
                }
                return res.status(400).json({ message: "Incorrect Password" });
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.id;
                const session_id = req.body.session_id;
                const result = yield session_model_1.default.update({ isActive: false, }, { where: { id: session_id } });
                yield client.DEL(`${user_id}_${session_id}`);
                console.log('Logout', result);
                return res.status(200).send('Logout');
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    forgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const result = yield user_model_1.default.findOne({ where: { email: email } });
                if (!result) {
                    return res.status(200).json({ message: "Wrong user" });
                }
                console.log(result.id);
                const token = jsonwebtoken_1.default.sign({ id: result.id }, 'appinventiv', { expiresIn: "1h" });
                console.log('Set new password towen', token);
                return res.status(200).send(token);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    setNewPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            if (!token)
                return res.status(401).send("ACCESS_DENIED");
            try {
                const decoded = jsonwebtoken_1.default.verify(token, 'appinventiv');
                const user_id = decoded.id;
                const { newPassword } = req.body;
                const hashPwd = yield bcrypt_1.default.hash(newPassword, 3);
                const result = yield user_model_1.default.update({ password: hashPwd, }, { where: { id: user_id } });
                console.log('Password reset', result);
                return res.status(200).send('Password reset');
            }
            catch (err) {
                console.error(err);
                res.status(400).send("Invalid token");
            }
        });
    }
}
exports.authController = new AuthController();
