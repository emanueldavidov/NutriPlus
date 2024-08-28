// API routes for user-related operations
// - POST /users/register: Registers a new user
// - POST /users/login: Logs in a user
// - GET /users/profile: Retrieves the profile of a logged-in user
// - PUT /users/profile: Updates the profile details of a logged-in user

import express from "express"
import { createUser, getAllUsers, loginUser } from "../controllers/userControllers.js"

const router = express.Router()

router.post("/login", loginUser)
router.post("/register", createUser)
router.get("/allUsers", getAllUsers)

export default router
