import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./../../store/store";

import { Formik } from "formik";
import { IAuthState } from "./../../store/reducers/auth/types";
import { authSelector } from "./../../selectors/authSelectors";
import { loginRequestTC } from "./../../store/thunks/authThunks";

export const Login = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector<IAuthState>(authSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState) {
      return navigate("/");
    }
  }, [navigate, authState]);

  // if (authState) {
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
        {({ errors, values, handleSubmit, isSubmitting, getFieldProps }) => (
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
