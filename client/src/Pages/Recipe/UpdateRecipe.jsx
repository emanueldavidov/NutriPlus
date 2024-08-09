import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios"; // Import Axios
import { Field, FieldArray, Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormikSelect from "../../Components/Form/FormikSelectField";
import FormikTextField from "../../Components/Form/FormikTextField";
import { fetchAllRecipes } from "../store/slices/recipesSlice";
import "./Recipe.css";
import { BACKEND_URL } from "../../config/config";
const UpdateRecipe = ({ recipe, openModal, setOpenModal }) => {
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
    unit: recipe?.unit ?? "",
    quantity: recipe?.quantity ?? "",
    ingredients: recipe?.ingredients ?? [],
    instructions: recipe?.instructions ?? [],
    image: recipe?.image ?? "",
    description: recipe?.description ?? "",
    category: recipe?.category ?? "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });
  console.log(formik.values.ingredients);

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
      // Send POST request to server
      const response = await axios.put(
        `${BACKEND_URL}/api/recipe/recipes/${recipe._id}`,
        { ...values, user: recipe?.user }
      );

      // Dispatch action to update Redux store
      dispatch(fetchAllRecipes());

      // Close the modal after submission
      setOpenModal(false);
    } catch (error) {
      console.error("Error saving recipe:", error);
      setErrorMessage("Failed to save recipe. Please try again later.");
    }
  }
  const handleIngredientUpdate = (index, ingredient) => {};
  const handleIngredientDelete = (index) => {};
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
<Modal
  open={openModal}
  onClose={handleModalClose}
  aria-labelledby="recipe-details-modal"
  aria-describedby="modal-for-entering-recipe-details"
  BackdropProps={{
    invisible: false, // Hides the backdrop
  }}
>
  <div
    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl p-4 border-2 rounded-lg ${
      darkMode ? 'bg-black text-white border-[#B81D33]' : 'bg-white text-black border-[#B81D33]'
    } max-h-[90vh] min-h-[300px] overflow-y-auto`}
  >
    <Typography
      variant="h6"
      component="h2"
      gutterBottom
      className="text-[#B81D33] text-center mb-5"
    >
      Update Recipe Details
    </Typography>
    {errorMessage && (
      <Alert severity="error" onClose={() => setErrorMessage("")}>
        {errorMessage}
      </Alert>
    )}
    <FormikProvider value={formik}>
      <Form>
        <FormikTextField
          name="recipeName"
          label="Recipe Name"
          required
          className="mb-2"
        />
        <FormikTextField
          name="image"
          label="Recipe Image URL"
          required
          className="mb-2"
        />
        <FormikTextField
          name="description"
          label="Recipe Description"
          required
          className="mb-2"
        />
        <FormikSelect
          name="category"
          label="Category"
          options={["starter", "main course", "dessert"]}
          className="mb-2"
        />

        <div className="space-y-2">
          <FieldArray name="ingredients">
            {({ push, remove }) => (
              <>
                {formik.values.ingredients.map((ing, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={4}>
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
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl
                        required
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      >
                        <InputLabel id="unit-label">Unit</InputLabel>
                        <Select
                          labelId="unit-label"
                          id="unit"
                          label="Unit"
                          name={`ingredients[${index}].unit`}
                          value={ing.unit}
                          onChange={(e) =>
                            formik.setFieldValue(
                              `ingredients[${index}].unit`,
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value="piece(s)">piece(s)</MenuItem>
                          <MenuItem value="g">g</MenuItem>
                          <MenuItem value="kg">kg</MenuItem>
                          <MenuItem value="ml">ml</MenuItem>
                          <MenuItem value="l">l</MenuItem>
                          <MenuItem value="pcs">pcs</MenuItem>
                          <MenuItem value="tsp">tsp</MenuItem>
                          <MenuItem value="tbsp">tbsp</MenuItem>
                          <MenuItem value="cup">cup</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <Field
                        required
                        component={TextField}
                        type="number"
                        name={`ingredients[${index}].quantity`}
                        value={ing.quantity}
                        onChange={(e) => {
                          if (parseInt(e.target.value) >= 0 || e.target.value === "")
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
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={() => remove(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    push({ ingredient: "", unit: "", quantity: "" })
                  }
                  className="mt-5 mb-2 "
                  style={{ backgroundColor: "#B81D33" }}
                >
                  Add Ingredient
                </Button>
              </>
            )}
          </FieldArray>
        </div>

        <FieldArray name="instructions">
          {({ push, remove }) => (
            <>
              {formik.values.instructions.map((inst, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={10} className="mb-2">
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
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => remove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={() => push("")}
                className="my-5 mb-2 "
                style={{ backgroundColor: "#B81D33" }}
              >
                Add Instruction
              </Button>
            </>
          )}
        </FieldArray>

        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="my-5 "
            style={{ backgroundColor: "#B81D33" }}
          >
            Update Recipe
          </Button>
        </div>
      </Form>
    </FormikProvider>
  </div>
</Modal>

  );
};

export default UpdateRecipe;
