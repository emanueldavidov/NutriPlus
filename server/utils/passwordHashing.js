// Utility functions for password hashing
// - hashPassword: Uses bcrypt to hash a password before storing it in the database

import bcrypt from "bcryptjs"

export const hashPassword =(password)=>{
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password , salt);
  
}   