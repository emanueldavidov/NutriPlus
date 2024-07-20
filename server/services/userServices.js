import { UserModel } from "../models/userModel.js";

export const getAllUsersService = () => UserModel.find({});
export const getUserByIdService = (userId) => UserModel.findById(userId);
export const createUserService = (user) => UserModel.create(user);
export const getUserByUsername = (username) =>
  UserModel.findOne({ username: username });
