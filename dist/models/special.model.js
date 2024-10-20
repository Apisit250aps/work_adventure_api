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
exports.Special = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the Special schema
const SpecialSchema = new mongoose_1.Schema({
    charId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Character",
        required: true,
    },
    strength: {
        type: Number,
        default: 1,
    },
    perception: {
        type: Number,
        default: 1,
    },
    endurance: {
        type: Number,
        default: 1,
    },
    charisma: {
        type: Number,
        default: 1,
    },
    intelligence: {
        type: Number,
        default: 1,
    },
    agility: {
        type: Number,
        default: 1,
    },
    luck: {
        type: Number,
        default: 1,
    },
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});
// Middleware to update `updatedAt` before certain operations
SpecialSchema.pre("findOneAndUpdate", function (next) {
    this.set({ updatedAt: new Date() });
    next();
});
SpecialSchema.pre("updateOne", function (next) {
    this.set({ updatedAt: new Date() });
    next();
});
// Create the Special model
exports.Special = mongoose_1.default.model("Special", SpecialSchema);
//# sourceMappingURL=special.model.js.map