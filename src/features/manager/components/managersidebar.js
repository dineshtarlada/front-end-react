import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faHistory, faHomeUser, faRankingStar, faShoppingBag, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const ManagerSideBar = () => {
 
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
        <span><FontAwesomeIcon icon={faHomeUser} size="3x" /></span></div>
        <div style={usernameStyles}>
        <h5>{localStorage.getItem('username')}</h5>
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
          <MenuItem
            component={<Link to="/manager/dashboard/?page=appreciations" />}
            
          >
          
            <br />
            <br />
            
            <FontAwesomeIcon icon={faThumbsUp} size="2x" />
            <h6>Appreciations</h6>
          </MenuItem>
         
          <br />
          <br />
          <MenuItem
            component={<Link to="/manager/dashboard/?page=history" />}
          >
            <br />
            <br />
            <FontAwesomeIcon icon={faHistory} size="2x" />
            <h6>History</h6>
          </MenuItem>
          
         
          <br/><br/>
          <MenuItem
            component={<Link to="/manager/dashboard/?page=leaderboard" />}
          >
            <br />
            <br />
            <FontAwesomeIcon icon={faRankingStar} size="2x"></FontAwesomeIcon>
            <h6>LeaderBoard</h6>
          </MenuItem>
          

         
        </Menu>
      </Sidebar>
    
  );
};

export default ManagerSideBar; 