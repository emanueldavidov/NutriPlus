// Business logic for user-related operations
// - registerUser: Registers a new user in the database
// - loginUser: Authenticates a user and returns a JWT token
// - getUserById: Retrieves a user by their ID
// - updateUserProfile: Updates a user's profile details
// - hashPassword: Hashes a user's password for secure storage
// - comparePasswords: Compares a plain text password with a hashed password

import { UserModel } from "../models/userModel.js";

export const getAllUsersService = () => UserModel.find({});
export const getUserByIdService = (userId) => UserModel.findById(userId);
export const createUserService = (user) => UserModel.create(user);
export const getUserByUsername = (username) =>
  UserModel.findOne({ username: username });
