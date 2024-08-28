// Utility function for comparing plain text passwords with hashed passwords
// - comparePasswords: Uses bcrypt to compare the passwords

import bcrypt from "bcryptjs"

export const compareHashedPassword= (passwordFormLogin , passwordFromDB)=>{
return bcrypt.compareSync(passwordFormLogin , passwordFromDB)
}