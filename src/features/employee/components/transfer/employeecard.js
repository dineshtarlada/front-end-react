// EmployeeCard.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

const EmployeeCard = ({ employee,updatepoints }) => {
  const [points, setPoints] = useState(0);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    // Reset points and msg when a new employee is rendered
    setPoints(0);
    setMsg("");
  }, [employee]);

  const handlePointsChange = (event) => {
    setPoints(event.target.value);
  };

  const handleTransfer = () => {
    // Add logic for transferring points
    const fromEmployeeId = localStorage.getItem("id");
    const toEmployeeId = employee.id;
    console.log(fromEmployeeId);
    console.log(toEmployeeId);
    console.log(points);
    const userpoints= Number(localStorage.getItem("pointsBalance"));
    const transferPoints = Number(points);
    {console.log(userpoints)}

  
    if (isNaN(transferPoints) || transferPoints < 0) {
      setMsg("Invalid points value");
      return;
    }
  
    if (transferPoints > userpoints) {
      setMsg("Cannot transfer more points than available");
      return;
    }
    if (transferPoints <= userpoints && transferPoints > 0) {
     
      axios
        .post(
          `http://localhost:8085/transferpoints/employeetoemployee/${fromEmployeeId}/${toEmployeeId}/${transferPoints}`
        )
        .then((response) => {
          console.log(response.data);
          setMsg("Points Transferred Successfully");
          updatepoints(toEmployeeId,transferPoints)
        
        })
        .catch((error) => {
          console.error("Error transferring points", error);
          setMsg("Failed to transfer points");
         
        });
    } else {
      setMsg("Invalid points value");
    }
  };
   

  return (

    <div className="card border-secondary mb-3 mr-6" style={{ width: "30rem" ,border: '2px solid #ccc',background: '#f8f9fa', borderRadius: '10px',  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease-in-out',}}>
      <div className="card-header" style={{ color: "black", fontFamily: "" }}>
        <h3>{employee.name}</h3>
      </div>
      <div>
        <div className="card-body">
        <InputGroup className="mb-3">
            <InputGroup.Text>Points</InputGroup.Text>
            <Form.Control
              type="number"
              value={points}
              onChange={handlePointsChange}
            />
          
          </InputGroup>
        </div>
      </div>

      <div className="card-footer">
        <button className="btn btn-primary" onClick={handleTransfer}>
          Transfer
        </button>
       
        {console.log(points)}

        {msg && (
          <div style={{ color: msg.includes("Successfully") ? "green" : "red" }}>
            {msg}
          </div>
        )}
       
      </div>
    </div>
  );
};

export default EmployeeCard;
