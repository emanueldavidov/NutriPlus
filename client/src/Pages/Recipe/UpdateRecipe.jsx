import { Dialog } from '@headlessui/react';
import axios from "axios"; // Import Axios
import { Field, FieldArray, Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import closeImage from "../../assets/images/close.svg";
import FormikSelect from "../../Components/Form/FormikSelectField";
import FormikTextField from "../../Components/Form/FormikTextField";
import SelectField from "../../Components/SelectField";
import TextField from "../../Components/TextField";
import { BACKEND_URL } from "../../config/config";
import { fetchAllRecipes } from "../store/slices/recipesSlice";

const UpdateRecipe = ({ recipe, openModal, setOpenModal }) => {
  const user = useSelector((state) => state.auth.user);
  // const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // Added category state
  const dispatch = useDispatch();

  const initialValues = {
    recipeName: recipe?.recipeName ?? "",
    ingredients: recipe?.ingredients ?? [
      { quantity: 1, unit: "", ingredient: "" },
    ],
    instructions: recipe?.instructions ?? [""],
    image: recipe?.image ?? "",
    description: recipe?.description ?? "",
    category: recipe?.category ?? "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  const handleModalClose = () => {
    setOpenModal(false);
    resetForm();
  };

  // Form reset function
  const resetForm = () => {
    setRecipeName("");
    setIngredient("");
    setUnit("");
    setQuantity("");
    setIngredients([]);
    setInstruction("");
    setInstructions([]);
    setImage("");
    setDescription("");
    setErrorMessage("");
    setCategory("");
  };

  // Add instruction to list
  const handleAddInstruction = () => {
    if (instruction.trim() !== "") {
      formik.setFieldValue("instructions", [
        ...formik.values.instructions,
        instruction,
      ]);
      setInstruction("");
    }
  };

  // Form submission
  async function handleSubmit(values) {
    try {
      if (recipe) {
        // Send PUT request to server
        const response = await axios.put(
          `${BACKEND_URL}/api/recipe/recipes/${recipe._id}`,
          { ...values, user: recipe?.user }
        );
      } else {
        const response = await axios.post(`${BACKEND_URL}/api/recipe/recipes`, {
          ...values,
          user: user?._id,
        });
      }
      // Dispatch action to update Redux store
      dispatch(fetchAllRecipes());

      // Close the modal after submission
      setOpenModal(false);
    } catch (error) {
      console.error("Error saving recipe:", error);
      setErrorMessage("Failed to save recipe. Please try again later.");
    }
  }
  
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    // <Dialog
    //   open={openModal}
    //   onClose={handleModalClose}
    //   aria-labelledby="recipe-details-modal"
    //   aria-describedby="modal-for-entering-recipe-details"
    //   BackdropProps={{
    //     invisible: false, // Hides the backdrop
    //   }}
    // >
     <Dialog open={openModal} onClose={handleModalClose}>
  <div
  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl p-4 border-2 rounded-lg modal-widths ${
    darkMode
      ? "bg-black text-white border-[#B81D33]"
      : "bg-white text-black border-[#B81D33]"
  } max-h-[90vh] min-h-[300px] overflow-y-auto`}
>

    <h2 className="text-xl font-semibold text-[#B81D33] text-center mb-5">
      {recipe ? "Update" : "Add"} Recipe Details
    </h2>
    {errorMessage && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        <span className="block sm:inline">{errorMessage}</span>
        <button
          onClick={() => setErrorMessage("")}
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
        >
          <svg
            className="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 10-1.414 1.414l2.934 2.934-2.934 2.934a1 1 0 101.414 1.414L10 10.828l2.934 2.934a1 1 0 101.414-1.414L11.828 10l2.934-2.934z" />
          </svg>
        </button>
      </div>
    )}

    <FormikProvider value={formik}>
      <Form>
        <FormikTextField
          name="recipeName"
          label="Recipe Name"
          required
          className="mb-2 w-full"
        />
        <FormikTextField
          name="image"
          label="Recipe Image URL"
          required
          className="mb-2 w-full"
        />
        <FormikTextField
          name="description"
          label="Recipe Description"
          required
          className="mb-2 w-full"
        />
        <FormikSelect
          name="category"
          label="Category"
          options={["starter", "main course", "dessert"]}
          className="mb-2 w-full"
        />

        <div className="space-y-2">
          <FieldArray name="ingredients">
            {({ push, remove }) => (
              <>
                {formik.values.ingredients.map((ing, index) => (
                  <div className="grid grid-cols-12 gap-2" key={index}>
                    <div className="col-span-5">
                      <Field
                        required
                        component={TextField}
                        type="text"
                        name={`ingredients[${index}].ingredient`}
                        value={ing.ingredient}
                        onChange={(e) =>
                          formik.setFieldValue(
                            `ingredients[${index}].ingredient`,
                            e.target.value
                          )
                        }
                        label="Ingredient"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        className="mb-2"
                      />
                    </div>
                    <div className="col-span-4">
                      <SelectField
                        required
                        options={[
                          "piece(s)",
                          "g",
                          "kg",
                          "ml",
                          "l",
                          "pcs",
                          "tsp",
                          "tbsp",
                          "cup",
                        ]}
                        label="Unit"
                        name={`ingredients[${index}].unit`}
                        value={ing.unit}
                        onChange={(e) =>
                          formik.setFieldValue(
                            `ingredients[${index}].unit`,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <Field
                        required
                        component={TextField}
                        type="number"
                        name={`ingredients[${index}].quantity`}
                        value={ing.quantity}
                        onChange={(e) => {
                          if (
                            parseInt(e.target.value) >= 0 ||
                            e.target.value === ""
                          )
                            formik.setFieldValue(
                              `ingredients[${index}].quantity`,
                              parseInt(e.target.value)
                            );
                        }}
                        label="Quantity"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        className="mb-2"
                      />
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <img
                        onClick={() => remove(index)}
                        className="cursor-pointer w-[20px]"
                        src={closeImage}
                        alt="Remove"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() =>
                    push({ ingredient: "", unit: "", quantity: "" })
                  }
                  className="mt-5 mb-2 bg-[#B81D33] hover:bg-[#A4162E] text-white py-2 px-4 rounded w-full"
                >
                  Add Ingredient
                </button>
              </>
            )}
          </FieldArray>
        </div>

        <FieldArray name="instructions">
          {({ push, remove }) => (
            <>
              {formik.values.instructions.map((inst, index) => (
                <div className="flex flex-wrap mb-2" key={index}>
                  <div className="w-5/6 mb-2">
                    <TextField
                      required
                      type="text"
                      value={inst}
                      onChange={(e) =>
                        formik.setFieldValue(
                          `instructions[${index}]`,
                          e.target.value
                        )
                      }
                      label="Instruction"
                      name={`instructions[${index}]`}
                      fullWidth
                    />
                  </div>
                  <div className="w-1/6 flex items-center justify-center">
                    <img
                      onClick={() => remove(index)}
                      className="cursor-pointer w-[20px]"
                      src={closeImage}
                      alt="Remove"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => push("")}
                className="my-5 mb-2 bg-[#B81D33] hover:bg-[#A4162E] text-white py-2 px-4 rounded w-full"
              >
                Add Instruction
              </button>
            </>
          )}
        </FieldArray>

        <div>
          <button
            type="submit"
            className="my-5 bg-[#B81D33] hover:bg-[#A4162E] text-white py-2 px-4 rounded w-full"
          >
            {recipe ? "Update" : "Add"} Recipe
          </button>
        </div>
      </Form>
    </FormikProvider>
  </div>
</Dialog>

    // </Modal>
  );
};

export default UpdateRecipe;
