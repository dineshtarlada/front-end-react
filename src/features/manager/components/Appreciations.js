import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router";
import ManagerAppreciate from "./appreciate/manageremployeecard";



function AppreciationComponent() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee,setSelectedEmployee]=useState(null)

  


  useEffect(() => {
    // Fetch employee data from your API
    axios
      .get(
        "http://localhost:8085/managers/employees/all/" +
          localStorage.getItem("id")
      )
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees", error));
  }, []);
  const handleEmployeeClick=(employee)=>{
    setSelectedEmployee(employee);

  }
  const updatePoints = (employeeId, transferredPoints) => {

    setEmployees((employees) =>
      employees.map((emp) =>
        emp.id === employeeId
          ? { ...emp, pointsBalance: emp.pointsBalance + transferredPoints }
          : emp
      )
    );
  };
  return (
    <div>
      <nav
        class="navbar "
        style={{ width: "1100px", backgroundColor: "skyblue" }}
      >
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">
            <h4>Appreciations</h4>
          </span>
          <button title="Logout" className="btn btn-secondary"  alignRight color='black' style={{color:'white',fontWeight:'bold'}} onClick={() => {
                localStorage.clear();
                navigate("/?msg=logged out successfully");
              }} >LogOut
           </button>
        </div>
      </nav>
      <br/><br/>
      <div>
      {selectedEmployee && <ManagerAppreciate employee={selectedEmployee} updatePoints={updatePoints} />}
      </div>
      <br/><br/>
     
      <h2 style={{ textAlign: "left" }}>Employee List</h2>
      <br/>
      <div
        className="card-body border-secondary mb-3 mr-6"
        style={{ textAlign: "left" }}
      >
        <table className="table table-stripped">
          <thead>
            <tr>
              <th>Name</th>
              <th>EmpCode</th>
              <th>points</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr>
                <td>
                  <h5 style={{ fontFamily: "initial" }}>{employee.name}</h5>
                </td>
                <td>{employee.empCode}</td>
                <td>{employee.pointsBalance}</td>
                <td>
                  <button key={employee.id} className="btn btn-secondary" onClick={() => handleEmployeeClick(employee)}>
                    Appreciate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AppreciationComponent;
