import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField, Button, Alert, CircularProgress } from "@mui/material";
import axios from "axios";

const Register = () => {
  const [isLoading, setIsLoading] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  const initialValues = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  // validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required("username id required").min(3).max(30),
    firstName: Yup.string().required("firstName is required").min(3),
    lastName: Yup.string().required("lastName is required").min(3),
    email: Yup.string()
      .email("invalid email format")
      .required("email is required"),
    password: Yup.string().required("password is required").min(6),
  });
  const onSubmit = async (values) => {
    const user = { ...values };
    setIsLoading(true);
    await axios
      .post("http://localhost:8080/api/v1/register", user)
      .then((res) => {
        setIsLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setErr(error.response.data.msg);
        setIsLoading(false);
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <div className="container w-50 mt-3">
      <div className="row d-flex flex-column">
        <div className="col-10 ">
          <h1 className="text-center">Sign Up</h1>
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
            <div className=" col-12 col-sm-10 col-md-10 my-3">
              <TextField
                fullWidth
                name="username"
                id="username"
                label="Username"
                autoComplete="off"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </div>
            <div className="col-12 col-sm-5 col-md-5 my-3">
              <TextField
                fullWidth
                name="firstName"
                id="firstName"
                label="firstName"
                autoComplete="off"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </div>
            <div className="col-12 col-sm-5 col-md-5 my-3">
              <TextField
                fullWidth
                name="lastName"
                id="lastName"
                label="Last Name"
                autoComplete="off"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </div>
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
                  <CircularProgress color="secondary" size='28px' />
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

/*

<div className="row justify-content-center me-0">
      <div className="col-10 col-sm-8 col-md-8 col-lg-5 border border-2 rounded-3 mt-5 text-center p-4 shadow form-login">
        <Formik>
          <Form className="row " onSubmit={formik.handleSubmit}>
            <div className="col-12 my-4">
              <Typography variant="h3">Sign UP</Typography>
            </div>
            <div className="col-12 col-sm-10 col-md-10 my-3 align-items-center">
              <TextField
                fullWidth
                name="username"
                id="username"
                label="Username"
                autoComplete="off"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </div>
            <div className="col-12 col-sm-8 col-md-8 my-3">
              <TextField
                fullWidth
                name="firstName"
                id="firstName"
                label="firstName"
                autoComplete="off"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </div>
            <div className="col-12 col-sm-8 col-md-8 my-3">
              <TextField
                fullWidth
                name="lastName"
                id="lastName"
                label="Last Name"
                autoComplete="off"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </div>
            <div className="col-12 col-sm-8 col-md-8 my-2">
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
            <div className="col-12 col-sm-8 col-md-8 my-2">
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
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                {isLoading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );

*/
