import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  if (!localStorage.getItem("userToken")) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectRoute;
