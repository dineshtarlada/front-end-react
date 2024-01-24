import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router";
import EmployeeCard from "./transfer/employeecard";

function TransferComponent() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [msg,setMsg]=useState('')


  useEffect(() => {
    // Fetch employee data from your API
    const Employeeid=localStorage.getItem("id")
    axios
      .get(`http://localhost:8085/employees/all/withoutThisUserId/${Employeeid}`)
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees", error));
  }, []);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };
  const updatepoints=(employeeid,transferredPoints)=>{
    setEmployees((employees)=>
    employees.map((emp)=>
    (emp.id===employeeid)?
    {...emp,pointsBalance:emp.pointsBalance+transferredPoints}:emp)
    )


  }
  return (
    <div>
      <nav
        class="navbar "
        style={{ width: "1100px", backgroundColor: "skyblue" }}
      >
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">
            <h4>Transfer</h4>
          </span>
        
        </div>
      </nav>
      <br />
      <br />
      <div>
        {selectedEmployee && <EmployeeCard employee={selectedEmployee} updatepoints={updatepoints} />}
      </div>
      <br />
      <br />
      <h2 style={{ textAlign: "left" ,color:'white'}}>Employee List</h2>
      <div className="card-body border-secondary mb-3 mr-6" style={{ textAlign: "left" }}>
       
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
                  <button key={employee.id} className="btn btn-secondary" onClick={() => handleEmployeeClick(employee)} >click here to transfer</button>
                </tr>
                   ))}
              </tbody>
            </table>
          </div>
     
      </div>
 
  );
}
export default TransferComponent;
