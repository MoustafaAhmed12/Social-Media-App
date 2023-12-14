import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button, Alert, CircularProgress } from "@mui/material";

const Login = ({ getUserData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string("Enter your password")
      .min(6, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const onSubmit = async (values) => {
    const user = { ...values };
    setIsLoading(true);
    await axios
      .post("http://localhost:8080/api/v1/login", user)
      .then((res) => {
        navigate("/", { replace: true });
        localStorage.setItem("userToken", res.data.userToken);
        getUserData();
        setIsLoading(false);
      })
      .catch((error) => {
        setErr(error.response.data.msg);
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="container w-50" style={{ marginTop: "4rem" }}>
      <div className="row d-flex flex-column">
        <div className="col-10 my-4">
          <h1 className="text-center">Sign In</h1>
        </div>
        {err && (
          <div className="col-10 my-3">
            <Alert severity="error" variant="filled">
              {err} — try again!
            </Alert>
          </div>
        )}
        <div className="col">
          <form className="row" onSubmit={formik.handleSubmit}>
            <div className="col-12 col-sm-10 col-md-10 my-3">
              <TextField
                fullWidth
                name="email"
                id="email"
                label="Email"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className="col-12 col-sm-10 col-md-10 my-3">
              <TextField
                fullWidth
                name="password"
                id="password"
                label="Password"
                type="password"
                autoComplete="off"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </div>
            <div className="col-12 my-4">
              <Button
                variant="outlined"
                color="primary"
                size="large"
                type="submit"
              >
                {isLoading ? (
                  <CircularProgress color="secondary" size="28px" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
