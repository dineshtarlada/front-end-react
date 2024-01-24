import axios from "axios";
import React, { useEffect, useState } from "react";
import LeadershipIcon from "./leadershipicon";
import { NavDropdown } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router";

function LeaderBoard() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8085/employees/leaderboard")
      .then((response) => setEmployees(response.data));
  }, []);

  return (
    <div>
      <nav
        class="navbar "
        style={{ width: "1100px", backgroundColor: "skyblue" }}
      >
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">
            <h4>LeaderBoard</h4>
          </span>
          
        </div>
      </nav>

      <br />
      <br />
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
          <LeadershipIcon />
          <h2 style={{ marginLeft: "10px", color: "black" }}>Leader Board</h2>
        </div>

        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  <h5>Rank</h5>
                </th>
                <th>
                  <h5>Name</h5>
                </th>
                <th>
                  <h5>Points</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e, index) => (
                <tr key={index}>
                  <td>
                    <h6>{index + 1}</h6>
                  </td>
                  <td>
                    <h6>{e.name}</h6>
                  </td>
                  <td>
                    <h6>{e.pointsBalance}</h6>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
