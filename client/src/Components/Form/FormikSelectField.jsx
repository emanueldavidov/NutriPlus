import React from "react";
import { Field, useFormikContext } from "formik";
import { useSelector } from "react-redux";
import SelectField from "../SelectField";

const FormikSelect = ({ name, ...props }) => {
  const formik = useFormikContext();
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  return (
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
  );
};

export default FormikSelect;
