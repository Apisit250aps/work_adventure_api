/** @format */

import { Request, Response } from "express";
import { ISpecial, Special } from "../models/special.model";
import { ICharacter } from "../models/character.model";
import { IUser } from "../models/user.model";

export default {
  async specials(
    req: Request<
      { id: string },
      {},
      { attribute: keyof ISpecial; value: number; charId: string },
      { user?: IUser; character?: ICharacter }
    >,
    res: Response
  ) {
    try {
      const userId = req.user?._id;
      const characterId = req.character?.userId;
      const { id } = req.params;
      const { attribute, value, charId } = req.body;

      // Find the special by ID
      const special = await Special.findById(id);

      // Check if the special exists
      if (!special) {
        return res.status(404).json({ message: "Special not found" });
      }

      // Verify if the charId matches the charId in the special
      if (
        special.charId.toString() !== charId.toString() ||
        userId !== characterId
      ) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Prepare the update data
      const updateData = { [attribute]: value };

      // Update the special
      const updatedSpecial = await Special.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      // Return the updated special
      res.status(200).json(updatedSpecial);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
