"use strict";
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
exports.Task = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const TaskSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    difficulty: { type: Number, required: false, enum: [1, 2, 3], default: 1 },
    start_date: { type: Date, required: false },
    due_date: { type: Date, required: false },
    isDone: { type: Boolean, default: false },
    isFirst: { type: Boolean, default: true },
    workId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Work" }
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});
exports.Task = mongoose_1.default.model("Task", TaskSchema);
//# sourceMappingURL=tasks.model.js.map