import React from "react";
import { NavLink } from "react-router-dom";

// Mui Icon
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import {
  Explore,
  Home,
  ListAltOutlined,
  MessageOutlined,
  MoreHorizOutlined,
  NotificationImportant,
  Person2Outlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
const SideBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="d-flex flex-column justify-content-between position-fixed">
      <div className="links d-flex flex-column w-100 justify-content-between">
        <NavLink to={"/"}>
          <FacebookOutlinedIcon className="fs-1" />
        </NavLink>
        <NavLink to={"/"}>
          <Home className="me-3 fs-1" />
          <span className="fs-4">
            Home
          </span>
        </NavLink>
        <NavLink to={"/explore"}>
          <Explore className="me-3 fs-1" />
          <span className="fs-4"> Explore</span>
        </NavLink>
        <NavLink to={"/notifications"}>
          <NotificationImportant className="me-3 fs-1" />
          <span className="fs-4">Notifications</span>
        </NavLink>
        <NavLink to={"/messages"}>
          <MessageOutlined className="me-3 fs-1" />
          <span className="fs-4">Messages</span>
        </NavLink>
        <NavLink to={"/lists"}>
          <ListAltOutlined className="me-3 fs-1" />
          <span className="fs-4">Lists</span>
        </NavLink>
        <NavLink to={"/profile"}>
          <Person2Outlined className="me-3 fs-1" />
          <span className="fs-4">Profile</span>
        </NavLink>
      </div>

      <div className="main-account w-100 ">
        <NavLink to={"/"}>
          <img src={currentUser.imgProfile} alt="" className="img-account" />
          <div className="d-flex flex-column">
            <span className=" fw-bold">
              {currentUser.firstName} {currentUser.lastName}
            </span>
            <span className=" text-secondary">@{currentUser.username}</span>
          </div>
          <MoreHorizOutlined className="icon" />
        </NavLink>
      </div>
    </header>
  );
};

export default SideBar;
