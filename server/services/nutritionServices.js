import { NutritionModel } from "../models/nutritionModel.js";

export const createNutrition = (nutrition) => NutritionModel.create(nutrition);

export const getAllNutritionByUserService = (userId) => {
    return NutritionModel.find({ user: userId }).populate('food').exec();
};

export const getNutritionByFood = (userID, food) =>
    NutritionModel.findOne({ user: userID, food });


export const getNutritionById = (userID, ID) =>
    NutritionModel.findOne({ user: userID, _id: ID }).populate('food').exec();

export const deleteNutrition = (userID, ID) =>
    NutritionModel.findByIdAndDelete({ user: userID, _id: ID });

export const updateNutrition = (userID, ID, updatedNutrition) =>
    NutritionModel.findByIdAndUpdate({ user: userID, _id: ID }, updatedNutrition, {
        new: true,
        useFindAndModify: false,
    });
