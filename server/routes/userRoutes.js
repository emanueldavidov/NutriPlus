import express from "express"
import { createUser, getAllUsers, loginUser } from "../controllers/userControllers.js"

const router = express.Router()


router.post("/login", loginUser)
router.post("/register", createUser)
router.get("/allUsers", getAllUsers)

export default router
