import { ReactElement } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Grid } from "@mui/material";

import Form from "~/components/form/Form";
import { Button } from "~/components/form/button";
import { ControlledTextField } from "~/components/form/controlled";

// import { loginUser } from "~/redux/reducers/login";
import PasswordInput from "./components/password-input/PasswordInput";
import { loginSchema } from "./schema";
import { StyledLabel, StyledTitle } from "./components/auth-container";
import { getFieldError } from "~/components/form/utils";
import { Link } from "react-router-dom";

const Login = (): ReactElement => {
  // const dispatch = useDispatch();
  // const loginState = useSelector((state) => state.login);

  const loginForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnChange: false,
    onSubmit: (values) => console.log("values", values),
  });

  return (
    <Form instance={loginForm}>
      <Grid container>
        <StyledTitle>Sign In</StyledTitle>
        <Grid item xs={12}>
          <StyledLabel>Username</StyledLabel>
          <ControlledTextField
            fullWidth
            placeholder="Input username"
            name="username"
            helperText={getFieldError(loginForm.errors, "username")}
          />
        </Grid>
        <Grid item xs={12} pt={1} mb={3}>
          <StyledLabel>Password</StyledLabel>
          <PasswordInput
            placeholder="Input password"
            name="password"
            helperText={getFieldError(loginForm.errors, "password")}
          />
          <Link to={"/forgot-password"}>Forgot Password</Link>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth type="submit">
            Sign In
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default Login;
