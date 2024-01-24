import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router";
import ManagerControlledEmployees from "../redux/employees";

function ManagerLeaderBoardComponent(){
    const navigate=useNavigate();
    return(
        <div>
            <nav class="navbar " style={{width:'1100px',backgroundColor: "skyblue"}}>
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1">
        <h4>LeaderBoard
            </h4></span>
            <button title="Logout" className="btn btn-secondary"  alignRight color='black' style={{color:'white',fontWeight:'bold'}} onClick={() => {
                localStorage.clear();
                navigate("/?msg=logged out successfully");
              }} >LogOut
           </button>
  </div>
</nav>
<br/><br/>
<div><ManagerControlledEmployees/></div>
        </div>
    )
}
export default ManagerLeaderBoardComponent;