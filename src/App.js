import React, { useCallback } from "react";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import { useEffect } from "react";
import ProtectRoute from "./Components/ProtectRoute";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logOutFun } from "./GlobalState/userSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Alert, CircularProgress } from "@mui/material";
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.user);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const getUserData = useCallback(async () => {
    dispatch(getUser({ id: localStorage.getItem("userId") }));
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserData();
    }
  }, [getUserData]);

  const logOut = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    dispatch(logOutFun());
    navigate("/login", { replace: true });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {error ? (
        <div className="col-10 m-auto text-center">
          <Alert severity="error" variant="filled">
            {error} — check your network
          </Alert>
        </div>
      ) : !isLoading ? (
        <>
          {!localStorage.getItem("userToken") && <NavBar logOut={logOut} />}
          <Routes>
            <Route
              path="/"
              element={
                <ProtectRoute>
                  <Home />
                </ProtectRoute>
              }
            />
            <Route path="login" element={<Login getUserData={getUserData} />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </>
      ) : (
        <div className="text-center mt-5">
          <CircularProgress color="secondary" size="28px" />
        </div>
      )}
    </ThemeProvider>
  );
};

export default App;
