import { useField } from "formik";
import { TextField } from "@mui/material";

const InputField = ({ name, ...rest }) => {
  const [field, meta] = useField(name);
  const configTextField = {
    name,
    ...field,
    ...rest,
    fullWidth: true,
    variant: "outlined",
  };
  return (
    <TextField
      {...configTextField}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    />
  );
};
export default InputField;
