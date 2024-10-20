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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const password_1 = require("../utils/password");
const user_model_1 = require("../models/user.model");
const jwt_1 = require("../utils/jwt");
const userStatistic_model_1 = require("../models/userStatistic.model");
exports.default = {
    userRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, email } = req.body;
                console.log(req.body);
                const existingUser = yield user_model_1.User.findOne({ username: username });
                if (existingUser) {
                    return res.status(409).json({ error: "Username already exists" });
                }
                const hashedPassword = yield (0, password_1.hashPassword)(password);
                const newUser = yield user_model_1.User.create({
                    username: username,
                    password: hashedPassword,
                    email: email
                });
                yield userStatistic_model_1.UserStatistics.create({ userId: newUser });
                return res.status(201).json({ newUser });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error });
            }
        });
    },
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield user_model_1.User.findOne({ username });
                if (!user) {
                    return res.status(401).json({ error: "Invalid username or password" });
                }
                const isPasswordValid = yield (0, password_1.comparePasswords)(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ error: "Invalid username or password" });
                }
                const token = (0, jwt_1.generateToken)({
                    userId: user._id,
                    username: user.username,
                    isAdmin: user.isAdmin
                });
                return res.status(200).json({ token });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error });
            }
        });
    },
    checkAuth(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (yield user_model_1.User.findOne({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }));
                const _b = user.toObject(), { password } = _b, userWithoutPassword = __rest(_b, ["password"]);
                return res.status(200).json(userWithoutPassword);
            }
            catch (error) {
                return res.status(500).json({ error });
            }
        });
    }
};
//# sourceMappingURL=auth.controller.js.map