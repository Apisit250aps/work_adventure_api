/** @format */

export const levelUp = async (
  exp: number,
  base: number = 100,
  growth: number = 1.5
) => {
  try {
    // คำนวณระดับเลเวลจาก EXP ที่มี
    const level = Math.floor(
      Math.log((exp + 100) / base) / Math.log(growth) + 1
    );
    return level;
  } catch (error) {
    throw new Error("Error calculating level");
  }
};
