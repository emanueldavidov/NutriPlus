// FormikTextField Component: Formik-based text field component for forms.
// 
// Key Features:
// - Integrates seamlessly with Formik’s form state management.
// - Handles validation and displays error messages.
// - Styled for consistency with other form elements in the application.


import React from "react";
import { Field, useFormikContext } from "formik";
import TextField from "../TextField";
const FormikTextField = ({ name, ...props }) => {
  const formik = useFormikContext();
  return (
    <>
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
        {...props}
      />
      {formik.errors[name] && formik.touched[name] && (
        <div className="text-red-500">{formik.errors[name]}</div>
      )}
    </>
  );
};

export default FormikTextField;