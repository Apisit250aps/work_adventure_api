import bcrypt from "bcrypt"

const saltRounds = 10
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (error) {
    throw new Error("Error hashing password")
  }
}

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword)
    return match
  } catch (error) {
    throw new Error("Error comparing passwords")
  }
}
