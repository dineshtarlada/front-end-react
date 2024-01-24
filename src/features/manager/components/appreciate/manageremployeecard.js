import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

const ManagerAppreciate = ( {employee ,updatePoints}) => {
  const [points, setPoints] = useState(0);
  const [msg, setMsg] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };
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
    const ManagerId = localStorage.getItem("id");
    const toEmployeeId = employee.id;
    console.log(ManagerId);
    console.log(toEmployeeId);
    console.log(points);

    const transferPoints = Number(points);
    let commentsobj={
      'comments':comments
    }

    axios
      .post(
        `http://localhost:8085/transferpoints/managertoemployee/${ManagerId}/${toEmployeeId}/${transferPoints}`,commentsobj
      )
      .then((response) => {
        console.log(response.data);
        setMsg("Points Transferred Successfully");
        updatePoints(toEmployeeId,transferPoints)
      })
      .catch((error) => {
        console.error("Error transferring points", error);
        setMsg("Failed to transfer points");
      });
  };

  return (
    
      <div
        className="card border-secondary mb-3 mr-6"
        style={{ width: "40rem", height: "Auto" ,border: '2px solid #ccc',background: '#f8f9fa', borderRadius: '10px',  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease-in-out',}}
      >
        <div className="card-header" style={{ color: "black", fontFamily: "",backgroundColor:'gray' }}>
          <h3>Appreciation</h3>
        </div>
        <div >
          <div className="card-body">
            <h4>Name:{employee.name}</h4>

            <br />
            <InputGroup className="mb-3" style={{width:'20rem',textAlign:'center'}}>
              <InputGroup.Text><h6>Points</h6></InputGroup.Text>
              <Form.Control
                type="number"
                value={points}
                onChange={handlePointsChange}
              />
            </InputGroup>
            <br/>
            <InputGroup >
              <InputGroup.Text><h6>Comments</h6></InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                value={comments}
                onChange={handleCommentsChange}
                rows={2}
                cols={20}
                
              />
            </InputGroup>
          </div>
        </div>

        <div className="card-footer">
          <button className="btn btn-primary" onClick={handleTransfer}>
            Send Rewards
          </button>

          {console.log(points)}

          {msg && (
            <div
              style={{ color: msg.includes("Successfully") ? "green" : "red" }}
            >
              {msg}
            </div>
          )}
        </div>
      </div>
    
  );
};

export default ManagerAppreciate;
