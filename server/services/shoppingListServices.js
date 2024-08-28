// Business logic for shopping list-related operations
// - createShoppingList: Creates a new shopping list in the database
// - getAllShoppingListsByUserService: Retrieves all shopping lists associated with a specific user
// - getShoppingListById: Retrieves a shopping list by its ID
// - deleteShoppingList: Deletes a shopping list by its ID
// - updateShoppingList: Updates the details of a shopping list by its ID

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
