import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function EmployeeProfile() {
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedContact, setUpdatedContact] = useState('');
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const employeeuserId = localStorage.getItem("id");
    axios.get(`http://localhost:8085/employees/user/${employeeuserId}`)
      .then((response) => {
        setEmployee([response.data]);
        // Set initial values for editing
        setUpdatedName(response.data.name);
        setUpdatedContact(response.data.phone);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleSaveChanges = async () => {
    try {
      const employeeuserId = localStorage.getItem("id");
      await axios.put(`http://localhost:8085/employees/update/${employeeuserId}`, {
        name: updatedName,
        phone: updatedContact,
      });
      // Refresh the employee data after updating
      const response = await axios.get(`http://localhost:8085/employees/user/${employeeuserId}`);
      setEmployee([response.data]);
      setEditMode(false);
    } catch (error) {
      console.log(error);
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
            <h4>My Profile</h4>
          </span>
        </div>
      </nav>
      <br /><br />
      <div style={{ textAlign: 'left' }}>
        <button className="btn btn-dark" style={{ color: 'white' }} onClick={() => navigate("/employee/dashboard")}>Back</button>
      </div>
      <br />
      <div>
        {employee.map((e, index) => (
          <div className="card" key={index} style={{ padding: "15px" }}>
            <div className="card-header">
              My Profile
              {!editMode && (
                <Button variant="primary" onClick={handleEditClick} style={{ float: "right" }}>
                  Edit
                </Button>
              )}
            </div>
            <div className="card-body">
              <Row>
                <Col>
                  <Form.Control
                    readOnly={!editMode}
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    readOnly={!editMode}
                    value={updatedContact}
                    onChange={(e) => setUpdatedContact(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            {editMode && (
              <div className="card-footer" style={{ textAlign: "right" }}>
                <Button variant="success" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={handleCancelClick} style={{ marginLeft: "10px" }}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeProfile;
