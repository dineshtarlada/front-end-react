import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, NavDropdown, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

function HrAddEmployeesComponent() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [empCode, setEmpCode] = useState("");
  const [state, setState] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dateofBirth, setDateofBirth] = useState("");
  const [points, setPoints] = useState("");
 const [employee,setEmployee]=useState('')
 const [countries, setCountries] = useState([]);
 
 const [usernameMsg, setUserNameMsg] = useState("");
 const [emailMsg, setEmailMsg] = useState("");
 const [passwordMsg, setPasswordMsg] = useState("");
 const [contactMsg, setContactMsg] = useState("");

 const [showPassword, setShowPassword] = useState(false);

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [selectedManager, setSelectedManager] = useState(null); // Manager selection state
  const [managers, setManagers] = useState([]); // List of managers

  const saveEmployee = (e) => {
    e.preventDefault()
   

    if (!name || !contact || !email || !country || !city || !empCode || !state || !username || !password || !dateofBirth || !points || !selectedManager) {
      setMsg("All fields are required");
      e.preventDefault()
      return ;
    }
    if (!selectedManager) {
      setMsg("Please select a manager");
      return;
    }
    const managerId = selectedManager.id;
    const hrId = localStorage.getItem("id");
    
    let employeeobj = {
      "name": name,
      "email": email,
      "empCode": empCode,
      "phone": contact,
      "dateofBirth": dateofBirth,
      "pointsBalance": points,
      "user": {
        "username": username,
        "password": password,
      },
      "address": {
        "city": city,
        "state": state,
        "country": country,
      },
    };

    console.log("employee added")
    axios
      .post(
        `http://localhost:8085/employees/address/add/${hrId}/${managerId}`,
        employeeobj
      )
      .then((response) => {
        setEmployee(response.data);
        console.log(employee)
        setMsg("");

      
        setMsg("Employee added successfully");
  
        navigate("/hr/dashboard/?page=myEmployees")
        
      })
      .catch(function (error) {
        console.log("Issue in adding Employee")
      });
  };

  useEffect(() => {
    axios.get('http://localhost:8085/managers/all')
      .then(response => {
        setManagers(response.data);
      })
      .catch(error => {
        console.error("Error fetching managers", error);
      });
  }, []); 
  
return (
    <div>
      <nav
        className="navbar "
        style={{ width: "1100px", backgroundColor: "skyblue" }}
      >
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            <h4>Add Employees</h4>
          </span>
          <button
            title="Logout"
            className="btn btn-secondary"
            alignRight
            color="black"
            style={{ color: "white", fontWeight: "bold" }}
            onClick={() => {
              localStorage.clear();
              navigate("/?msg=logged out successfully");
            }}
          >
            LogOut
          </button>
        </div>
      </nav>
      <br />
      <br />{" "}
     
             
          
      <div
        className="card"
        style={{ height: "Auto", width: "900px", padding: "15px" }}
      >
        <div className="card-header" style={{ textAlign: "left" }}>
          <h4>Add Employee Details:</h4>
        </div>
        <div className="card-body">
        <span style={{color:"red"}}><h4>{msg}</h4></span> 
          <Form onSubmit={(e) => saveEmployee(e)}>
            <br />
            <br />
            <Row>
              <Col>
                <Form.Control
                  placeholder="Employee name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />{" "}
              </Col>
              <Col>
                <Form.Control
                  placeholder="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (e.target.value === "") {
                      setUserNameMsg("Username is required");
                    } else if (
                      !/^[a-zA-Z]+[a-zA-Z0-9_]*$/.test(e.target.value)
                    ) {
                      setUserNameMsg(
                        "Small and capital characters (a-z, A-Z) with optional underscores and numbers are allowed"
                      );
                    } else {
                      setUserNameMsg("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{usernameMsg}</span>
              </Col>
            </Row>{" "}
            <br />
            <br />
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter contact number"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    if (e.target.value === "") {
                      setContactMsg("contact is required");
                    }

                    if (!/^[0-9\s]+$/.test(e.target.value)) {
                      setContactMsg(
                        "Contact number should only contain digits and spaces"
                      );
                    } else {
                      setContactMsg("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{contactMsg}</span>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>points</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter points"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Select date of birth"
                  max="2003-12-31"
                  value={dateofBirth}
                  onChange={(e) => setDateofBirth(e.target.value)}
                />
              </Form.Group>
            </Row>
            <br />
            <br />
            <Row >
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value === "") {
                      setEmailMsg("Email is required");
                    } else if (
                      !/(^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[a-zA-Z]+$)/.test(
                        e.target.value
                      )
                    ) {
                      setEmailMsg(
                        "email should be valid: ex. hexaware@example.com"
                      );
                    } else {
                      setEmailMsg("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{emailMsg}</span>
              </Form.Group>













             
              
              <Form.Group as={Col} controlId="formGridManager">
                <Form.Label>Manager</Form.Label>
                <Form.Select
                  value={selectedManager ? selectedManager.id : ""}
                  onChange={(e) => {
                    const selectedManagerId = e.target.value;
                    const manager = managers.find(
                      (m) => m.id.toString() === selectedManagerId
                    );
                    setSelectedManager(manager);
                  }}
                >
                  <option value="" disabled>
                    Select a manager
                  </option>
                  {managers.map((manager) => (
                    <option key={manager.id} value={manager.id}>
                      {manager.name}
                    </option>
                  ))}
                </Form.Select>
                </Form.Group>
              
           
             
              
            </Row>{" "}
            <br/>
            <Row><col></col> <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value === "") {
                      setPasswordMsg("password is required");
                    } else if (
                      !/(^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$)/.test(
                        e.target.value
                      )
                    ) {
                      setPasswordMsg(
                        "password must have one special char, at least capital letter, at least 1 digit 0-9"
                      );
                    } else {
                      setPasswordMsg("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{passwordMsg}</span>
                <br/>

              </Form.Group>
              <Form.Group controlId="formBasicCheckbox" style={{textAlign:'left',}}>
                <Form.Check
                  type="checkbox"
                  label="Show Password"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <br/>
              </Form.Group><Form.Group as={Col}>
                <Form.Label>Employee Code</Form.Label>
                <Form.Control
                  placeholder="Enter Employee Code"
                  value={empCode}
                  onChange={(e) => setEmpCode(e.target.value)}
                />
              </Form.Group></Row>{''}
            <br />
            <br />
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>State</Form.Label>
                <Form.Control
                  placeholder="Enter State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>country</Form.Label>
                <Form.Control
                  placeholder="Enter country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Form.Group>
             
            </Row>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => saveEmployee(e)}
            >
              save
            </Button>
           
          </Form>
        </div>
      </div>
      <div></div>
    </div>
  );
}
export default HrAddEmployeesComponent;
