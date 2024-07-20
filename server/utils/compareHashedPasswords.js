import bcrypt from "bcryptjs"

export const compareHashedPassword= (passwordFormLogin , passwordFromDB)=>{
return bcrypt.compareSync(passwordFormLogin , passwordFromDB)
}