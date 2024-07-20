import React from "react";
import { Field, useFormikContext } from "formik";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FormikSelect = ({ name, options, label, ...props }) => {
  const formik = useFormikContext();
  return (
    <FormControl
      fullWidth
      variant="outlined"
      margin="normal"
      sx={{
        "& .MuiInputLabel-root.Mui-focused": {
          color: "black",
          fontWeight: "bold",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#B81D33",
          },
          "&:hover fieldset": {
            borderColor: "#B81D33",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#B81D33",
          },
        },
      }}
    >
      <InputLabel id="unit-label">{label}</InputLabel>
      <Select
        name={name}
        value={formik.values[name]}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value);
        }}
        error={formik.errors[name]}
        touched={formik.touched[name]}
        helperText={formik.touched[name] && formik.errors[name]}
        required
        labelId="categort-label"
        id={name}
        label={label}
        sx={{
          "& .MuiInputLabel-root.Mui-focused": {
            color: "black",
            fontWeight: "bold",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#B81D33",
            },
            "&:hover fieldset": {
              borderColor: "#B81D33",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#B81D33",
            },
          },
        }}
        {...props}
      >
        {options.map((opt) => {
          return <MenuItem value={opt}>{opt}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

export default FormikSelect;
