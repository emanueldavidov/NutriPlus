import React from "react";
import { Field, useFormikContext } from "formik";
import { TextField } from "@mui/material";

const FormikTextField = ({ name, ...props }) => {
  const formik = useFormikContext();
  return (
    <Field
      name={name}
      component={TextField}
      value={formik.values[name]}
      onChange={(e) => {
        formik.setFieldValue(name, e.target.value);
      }}
      error={formik.errors[name]}
      touched={formik.touched[name]}
      helperText={formik.touched[name] && formik.errors[name]}
      type="text"
      fullWidth
      variant="outlined"
      margin="normal"
      className="mb-2.5"
     
      {...props}
    />
  );
};

export default FormikTextField;
