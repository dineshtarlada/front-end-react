
import React from 'react';
import { NavDropdown, Navbar } from 'react-bootstrap';
import DisplayPoints from './display points';
import EmployeeDashboardImage from './employeedashboardimage';
import { useNavigate } from 'react-router';

function MainDashboard() {
  const navigate=useNavigate();
  return (
    <div>
      <span>
        <Navbar
          className="navbar"
          style={{
            width: '1100px',
            backgroundColor: 'skyblue',
            textAlign: 'left',
          }}
        >
          <div className="container-fluid">
            <Navbar.Brand>
              <h4>Dashboard</h4>
            </Navbar.Brand>
            <NavDropdown
            title="MyProfile"
            id="basic-nav-dropdown"
            alignRight
            color="black"
            style={{ color: "black", fontWeight: "bold" }}
          >
            <NavDropdown.Item onClick={()=>navigate("/employee/dashboard/?page=profile")}>Profile</NavDropdown.Item>
            <React.Fragment>
            <NavDropdown.Item
              onClick={() => {
                localStorage.clear();
                navigate("/?msg=logged out successfully");
              }}
            >
              LogOut
            </NavDropdown.Item>
            </React.Fragment>
           
          </NavDropdown>
          </div>
        </Navbar>
      </span>

      <div className="col-md-8 offset-md-4">
        <br />
        <br />
        <EmployeeDashboardImage />
        <br />
        <br />
        <div className='row' style={{color:'white'}}>  <div className='col-md-8'>
          <h3 >
            You have earned points
            <hr style={{fontWeight:'bold'}}/>
          
           <div className='col-md-12'>  <h3><DisplayPoints /></h3></div>
          </h3>
         
        </div></div>
      
      </div>
    </div>
  );
}

export default MainDashboard;
