import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faHistory,
  faHomeUser,
  faRankingStar,
  faShoppingBag,
  faThumbsUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const HrSideBar = () => {
  const sidebarStyles = {
    height: "100vh",
    backgroundColor: "skyblue",
    position: "fixed",
    top: 0,
    left: 0,
    color: "black",
  };

  const iconStyles = {
    textAlign: "center",
    padding: "10px 0",
  };

  const usernameStyles = {
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "30px",
    color: "black",
  };

  return (
    <Sidebar style={sidebarStyles}>
      <div style={iconStyles}>
        <span>
          <FontAwesomeIcon icon={faHomeUser} size="3x" />
        </span>
      </div>
      <div style={usernameStyles}>
        <h5>{localStorage.getItem("username")}</h5>
      </div>
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: "black",
              color: "Background",
            },
          },
        }}
      >
        <MenuItem component={<Link to="/hr/dashboard/?page=myEmployees" />}>
          <br />
          <br />

          <FontAwesomeIcon icon={faThumbsUp} size="2x" />
          <h6>My Employees</h6>
        </MenuItem>

        <br />
        <br />
        <MenuItem component={<Link to="/hr/dashboard/?page=addproducts" />}>
          <br />
          <br />
          <FontAwesomeIcon icon={faShoppingBag} size="2x" />
          <h6>Add Products</h6>
        </MenuItem>

        <br />
        <br />
        <MenuItem
          component={<Link to="/hr/dashboard/?page=addemployees" />}
        >
          <br />
          <br />
          <FontAwesomeIcon icon={faUser} size="2x"></FontAwesomeIcon>
          <h6>Add Employees</h6>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default HrSideBar;
