import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

function LogIn() {
  const [param] = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(param.get("msg"));
  const navigate = useNavigate();

  const doLogin = () => {
    let token = window.btoa(username + ":" + password);

    axios
      .post(
        "http://localhost:8085/user/login",

        {},
        {
          headers: {
            Authorization: "Basic " + token,
          },
        }
      )
      .then(function (response) {
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("isLoggedIn", true);
        let role = response.data.role;

        switch (role) {
          case "EMPLOYEE":
            navigate("/employee/dashboard");
            break;
          case "MANAGER":
            navigate("/manager/dashboard");
            break;
          case "HR":
            navigate("/hr/dashboard");
            break;
          default:
        }
      })
      .catch(function (error) {
        //handle error
        setMsg("Invalid Credentials");
      });
  };

  return (
    <div className="container md-4">
      <div className="row">
        <div className="col-md-6 mt-4"></div>
        <div className="col-md-6 mt-4 ">
          <div
            className="card border-secondary mb-3 "
            style={{ width: "500px" }}
          >
            <div className="card-header ">
              <h3>Sign In</h3>
            </div>
            <div className="card-body">
              {msg !== null ? (
                <div className="alert alert-danger" role="alert">
                  {msg}
                </div>
              ) : (
                ""
              )}
              <div></div>
              <div className="row " style={{ textAlign: "left" }}>
                <div style={{ color: "black" }}>
                  <p className="textstyle">The key to joy is to login.</p>
                </div>

                <div className="col-md-6 ">
                  <label>Enter Email/Username</label>
                </div>
                <div></div>

                <div className="col-mb-6 md-6">
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ textAlign: "left" }}>
                <div>
                  <br></br>
                </div>
                <div className="col-md-6">
                  <label>Enter Password</label>
                </div>
                <div className="col-mb-6 md-4">
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="card-footer " style={{ textAlign: "right" }}>
              <div class="d-grid gap-1 ">
                <button
                  className="btn btn-secondary btn-lg "
                  style={{ color: "black", fontWeight: "bold" }}
                  onClick={() => doLogin()}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}
export default LogIn;
