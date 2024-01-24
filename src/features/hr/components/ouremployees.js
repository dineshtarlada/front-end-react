import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash,  } from "@fortawesome/free-solid-svg-icons";

function MyEmployeesComponent() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [msg, setMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);


  useEffect(() => {
    const hrid = localStorage.getItem("id");
    
    axios
      .get(`http://localhost:8085/hr/allemployees/${hrid}`)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDeleteClick = (e) => {
    setEmployeeToDelete(e);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEmployeeToDelete(null);
  };

  const deleteEmployee = () => {
    if (employeeToDelete) {
      const empid = employeeToDelete.id;
      console.log(empid);
      axios
        .delete(`http://localhost:8085/employees/delete/${empid}`)
        .then((response) => {
          setMsg(response.data);
          handleModalClose();


          axios
            .get(
              `http://localhost:8085/hr/allemployees/${localStorage.getItem(
                "id"
              )}`
            )
            .then((response) => {
              setEmployees(response.data);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div>
      <nav
        className="navbar "
        style={{ width: "1100px", backgroundColor: "skyblue" }}
      >
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            <h4>MyEmployees</h4>
          </span>
          <button title="Logout" className="btn btn-secondary"  alignRight color='black' style={{color:'white',fontWeight:'bold'}} onClick={() => {
                localStorage.clear();
                navigate("/?msg=logged out successfully");
              }} >LogOut
           </button>
        </div>
      </nav>
      <br />
      <br />
      <br />
<div className="addEmployee" onClick={()=>navigate("/hr/dashboard/?page=addemployees")} style={{color:'white'}} ><span><FontAwesomeIcon icon={faAdd} size="2x" /><h5 fontWeight="bold">Add New Employee</h5></span>  </div>
<br/><br/>
     
      <div
        className="card border-secondary mb-3 mr-6"
        style={{
          height: "Auto",
          width: "68rem",
          alignContent: "center",
          justifyContent: "center",
          fontWeight: "bolder",
        }}
      >
        <div
          className="card-header"
          style={{ display: "flex", alignItems: "left", color: "gray" }}
        >
          <h2 style={{ marginLeft: "10px", color: "black" }}>MyEmployees</h2>
        </div>

        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  <h5>Name</h5>
                </th>
                <th>
                  <h5>EmpCode</h5>
                </th>
                <th>
                  <h5>Email</h5>
                </th>
                <th>
                  <h5>phone No</h5>
                </th>
                <th>
                  <h5>Date Of Birth</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id}>
                  <td>
                    <h6>{e.name}</h6>

                  </td>
                  <td>
                    <h6>{e.empCode}</h6>
                  </td>
                  <td>
                    <h6>{e.email}</h6>
                  </td>
                  <td>
                    <h6>{e.phone}</h6>
                  </td>
                  <td>
                    <h6>{e.dateofBirth}</h6>
                  </td>
                  <td> <div className="delete" onClick={() => handleDeleteClick(e)}>
                    <FontAwesomeIcon icon={faTrash} size="1x" color="darkred" />{" "}
                  </div></td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {employeeToDelete ?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteEmployee} >
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default MyEmployeesComponent;
