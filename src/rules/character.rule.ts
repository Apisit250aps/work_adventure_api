/** @format */
export const levelCalculator = async (
  exp: number,
  currentLevel: number,
  lck: number
) => {
  try {
    console.log(currentLevel);
    // เรียกใช้งานฟังก์ชัน EXPCalculator เพื่อคำนวณเลเวลใหม่
    const newLevel = (await EXPCalculator(exp)) as number;
    console.log(newLevel);
    let specialPoint = 0;
    // ถ้าเลเวลใหม่มากกว่าเลเวลเดิม ให้คำนวณ Special Points
    if (newLevel > currentLevel) {
      specialPoint = await specialPointCalculator(lck);
    }
    console.log("sp ", specialPoint);
    return {
      newLevel,
      specialPoint,
    };
  } catch (error) {
    throw new Error("Error calculating level");
  }
};

export const EXPCalculator = async (
  exp: number,
  base: number = 100,
  growth: number = 1.5
) => {
  try {
    // คำนวณระดับเลเวลจาก EXP ที่มี
    const level = Math.floor(
      Math.floor(Math.log((exp + 100) / base) / Math.log(growth) + 1)
    );
    return level;
  } catch (error) {
    throw new Error("Error calculating EXP");
  }
};

export const specialPointCalculator = async (lck: number) => {
  try {
    // คำนวณ Special Points โดยใช้ค่า Luck (lck)
    const specialPoint = Math.floor(Math.random() * 4 + lck) + (2 + (lck - 1));
    return specialPoint;
  } catch (error) {
    throw new Error("Error calculating special points");
  }
};
