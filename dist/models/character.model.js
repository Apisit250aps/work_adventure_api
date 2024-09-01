"use strict";
/** @format */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the Character schema
const CharacterSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    className: {
        type: String,
        required: true,
    },
    exp: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 1,
    },
    coin: {
        type: Number,
        default: 0,
    },
    health: {
        type: Number,
        default: 100,
    },
    stamina: {
        type: Number,
        default: 100,
    },
    focus_point: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});
// Middleware to update `updatedAt` before certain operations
CharacterSchema.pre("findOneAndUpdate", function (next) {
    this.set({ updatedAt: new Date() });
    next();
});
CharacterSchema.pre("updateOne", function (next) {
    this.set({ updatedAt: new Date() });
    next();
});
// Create the Character model
exports.Character = mongoose_1.default.model("Character", CharacterSchema);
//# sourceMappingURL=character.model.js.map