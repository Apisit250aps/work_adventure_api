/** @format */

import { Request, Response } from "express";
import { ISpecial, Special } from "../models/special.model";
import { IUser } from "../models/user.model";

export default {
  async specials(
    req: Request<
      { characterId: string },
      {},
      { attribute: keyof ISpecial; value: number },
      { user?: IUser }
    >,
    res: Response
  ) {
    try {
      const userId = req.user?._id;
      const { characterId } = req.params; // characterId from the URL
      const { attribute, value } = req.body;

      // Find the special by ID and characterId
      const special = await Special.findOne({ characterId });
      console.log("characterId : ", characterId);

      // Check if the special exists
      if (!special) {
        return res.status(404).json({ message: "Special not found" });
      }

      // Verify if the userId matches the userId in the character
      if (special.charId.toString() !== characterId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Prepare the update data
      const updateData = { [attribute]: value };

      // Update the special
      const updatedSpecial = await Special.findOneAndUpdate(
        { charId: characterId }, // Filter by characterId
        updateData, // Data to update
        {
          new: true, // Return the updated document
        }
      );

      // Return the updated special
      return res.status(200).json(updatedSpecial);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
