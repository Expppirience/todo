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
import { Formik, FormikHelpers } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { Navigate } from "react-router-dom";
import { authSelector } from "./../../selectors/authSelectors";
import { loginRequestTC } from "./../../store/thunks/authThunks";

interface ILoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const Login = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(authSelector);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (authState.isAuth) {
  //     return navigate("/");
  //   }
  // }, [navigate, authState.isAuth]);

  if (authState.isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        validate={(values) => {
          if (!values.email) return { email: "Email is required" };
          if (!values.password) return { email: "password is required" };
        }}
        onSubmit={async (
          values: ILoginForm,
          forkmikHelpers: FormikHelpers<ILoginForm>
        ) => {
          const res = await dispatch(loginRequestTC(values));
          forkmikHelpers.setFieldError("", "");
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
