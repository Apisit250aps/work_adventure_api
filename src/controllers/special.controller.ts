/** @format */

import { Request, Response } from "express";
import { ISpecial, Special } from "../models/special.model";
import { IUser } from "../models/user.model";

export default {
  async Updatespecials(
    req: Request<{
      user?: IUser;
      body: ISpecial;
      charId: string;
    }>,
    res: Response
  ) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { charId } = req.params; // Get charId from the URL
      const { attribute, value }: { attribute: keyof ISpecial; value: number } =
        req.body;

      // Find the special by charId
      const special = await Special.findOne({ charId });

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
      const updatedSpecial = await Special.findOneAndUpdate(
        { charId }, // Filter by charId
        updateData, // Data to update
        { new: true } // Return the updated document
      );

      // Return the updated special
      return res.status(200).json(updatedSpecial);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error || "An unexpected error occurred" });
    }
  },
};
