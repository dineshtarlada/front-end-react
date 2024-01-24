import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  faDashboard,
  faExchangeAlt,
  faHistory,
  faHome,
  faHomeUser,
  faRanking,
  faRankingStar,
  faShoppingBag,
  faShoppingCart,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MySidebar = () => {
  
  const sidebarStyles = {
    height: "100vh",
    backgroundColor: "skyblue",
    position: "fixed",
    top: 0,
    left: 0,
    color:"black"
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
        <FontAwesomeIcon icon={faHomeUser} size="3x" />
      </div>

      <div style={usernameStyles}>
        <h5>{localStorage.getItem('username')}</h5>
      </div>

      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: "black",
              color: "white",
            },
          },
        }}
      >
        <MenuItem component={<Link to="/employee/dashboard/?page=dashboard" />}>
          <FontAwesomeIcon icon={faDashboard} size="2x" />
          <h6>Dashboard</h6>
        </MenuItem>
        <br/><br/>

        <MenuItem component={<Link to="/employee/dashboard/?page=products" />}>
          <FontAwesomeIcon icon={faShoppingBag} size="2x" />
          <h6>Products</h6>
        </MenuItem>
        <br/><br/>

        <MenuItem component={<Link to="/employee/dashboard/?page=transfer" />}>
          <FontAwesomeIcon icon={faExchangeAlt} size="2x"></FontAwesomeIcon>
          <h6>Transfer</h6>
        </MenuItem>
        <br/><br/>

        <MenuItem component={<Link to="/employee/dashboard/?page=history" />}>
          <FontAwesomeIcon icon={faHistory} size="2x"></FontAwesomeIcon>
          <h6>History</h6>
        </MenuItem>
        <br/><br/>

        <MenuItem component={<Link to="/employee/dashboard/?page=cart" />}>
          <FontAwesomeIcon icon={faShoppingCart} size="2x"></FontAwesomeIcon>
          <h6>Cart</h6>
        </MenuItem>
        <br/><br/>

        <MenuItem component={<Link to="/employee/dashboard/?page=leaderboard" />}>
          <FontAwesomeIcon icon={faRankingStar} size="2x"></FontAwesomeIcon>
          <h6>LeaderBoard</h6>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default MySidebar;