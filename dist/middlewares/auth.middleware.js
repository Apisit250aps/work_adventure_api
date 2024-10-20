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
exports.authenticateJWT = void 0;
const jwt_1 = require("../utils/jwt");
const user_model_1 = require("../models/user.model");
const authenticateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1]; // Assuming the token is in the format "Bearer <token>"
        try {
            const decoded = (0, jwt_1.verifyToken)(token); // Ensure that decoded is of type IUser
            const user = yield user_model_1.User.findById(decoded.userId); // ตรวจสอบว่าผู้ใช้ยังมีอยู่ในฐานข้อมูล
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            req.user = user; // Save user information to request object
            next();
        }
        catch (error) {
            return res.status(403).json({ error: "Forbidden" });
        }
    }
    else {
        return res.status(401).json({ error: "Unauthorized" });
    }
});
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=auth.middleware.js.map