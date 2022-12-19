import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { Formik } from "formik";
import { authSelector } from "./../../selectors/authSelectors";
import { loginRequestTC } from "./../../store/thunks/authThunks";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(authSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isAuth) {
      return navigate("/");
    }
  }, [navigate, authState.isAuth]);

  // if (authState.isAuth) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        validate={(values) => {
          if (!values.email) return { email: "Email is required" };
          if (!values.password) return { email: "password is required" };
        }}
        onSubmit={({ email, password, rememberMe }, { setSubmitting }) => {
          dispatch(loginRequestTC(email, password, rememberMe)).then(() => {
            setSubmitting(false);
          });
        }}
      >
        {({ errors, values, handleSubmit, getFieldProps }) => (
          <Grid container justifyContent="center">
            <Grid item xs={4}>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel>
                    <Typography>Login</Typography>
                  </FormLabel>
                  <FormGroup>
                    <TextField
                      label="email"
                      margin="normal"
                      {...getFieldProps("email")}
                    />
                    {errors.email ? <p>{errors.email}</p> : ""}
                    <TextField
                      label="password"
                      margin="normal"
                      type="password"
                      {...getFieldProps("password")}
                    />
                    <FormControlLabel
                      label="Remember me"
                      control={
                        <Checkbox
                          {...getFieldProps("rememberMe")}
                          checked={values.rememberMe}
                        />
                      }
                    />
                  </FormGroup>
                </FormControl>
                <button type="submit">Log in</button>
              </form>
            </Grid>
          </Grid>
        )}
      </Formik>
    </>
  );
};
