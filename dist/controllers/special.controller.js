"use strict";
/** @format */
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
const special_model_1 = require("../models/special.model");
exports.default = {
    Updatespecials(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!userId) {
                    return res.status(401).json({ error: "Unauthorized" });
                }
                const { charId } = req.params; // Get charId from the URL
                const { attribute, value } = req.body;
                // Find the special by charId
                const special = yield special_model_1.Special.findOne({ charId });
                // Check if the special exists
                if (!special) {
                    return res.status(404).json({ error: "Special not found" });
                }
                // Verify if the character associated with this special belongs to the authenticated user
                if (special.charId.toString() !== charId) {
                    // Assuming you have userId in Special schema
                    return res.status(403).json({ error: "Forbidden" });
                }
                // Prepare the update data
                const updateData = { [attribute]: value };
                // Update the special
                const updatedSpecial = yield special_model_1.Special.findOneAndUpdate({ charId }, // Filter by charId
                updateData, // Data to update
                { new: true } // Return the updated document
                );
                // Return the updated special
                return res.status(200).json(updatedSpecial);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: error || "An unexpected error occurred" });
            }
        });
    },
};
//# sourceMappingURL=special.controller.js.map