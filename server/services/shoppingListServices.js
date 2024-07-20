import { ShoppingListModel } from "../models/shoppingListModel.js";

export const createShoppingList = (shoppingList) => ShoppingListModel.create(shoppingList);

export const getAllShoppingListByUserService = (userId) => {
    return ShoppingListModel.find({ user: userId });
};

export const getShoppingListByName = (userID, name) =>
    ShoppingListModel.findOne({ user: userID, name });


export const getShoppingListById = (userID, ID) =>
    ShoppingListModel.findOne({ user: userID, _id: ID });

export const deleteShoppingList = (userID, ID) =>
    ShoppingListModel.findByIdAndDelete({ user: userID, _id: ID });

export const updateShoppingList = (userID, ID, updatedShoppingList) =>
    ShoppingListModel.findByIdAndUpdate({ user: userID, _id: ID }, updatedShoppingList, {
        new: true,
        useFindAndModify: false,
    });
