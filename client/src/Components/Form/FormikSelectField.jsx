// FormikSelectField Component: Formik-based select field component for forms.
// 
// Key Features:
// - Integrates with Formik for form management.
// - Supports validation and error handling as part of a Formik form.
// - Customizable options and layout, suitable for dynamic form content.

import React from "react";
import { Field, useFormikContext } from "formik";
import { useSelector } from "react-redux";
import SelectField from "../SelectField";

const FormikSelect = ({ name, ...props }) => {
  const formik = useFormikContext();
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  return (
    <>
      <Field
        name={name}
        component={SelectField}
        value={formik.values[name]}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value);
        }}
        error={formik.errors[name]}
        touched={formik.touched[name]}
        helperText={formik.touched[name] && formik.errors[name]}
        {...props}
      />
      {formik.errors[name] && formik.touched[name] && (
        <div className="text-red-500">{formik.errors[name]}</div>
      )}
    </>
  );
};

export default FormikSelect;