import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router";

function ManagerHistoryComponent(){
    const navigate=useNavigate();
    
  const [transactions, setTransactions] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const managerUserId = localStorage.getItem("id");

    axios
      .get(`http://localhost:8085/transaction/manager/all/${managerUserId}`)
      .then((response) => {
        setTransactions(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  
  const deleteTransaction = (t) => {
    const managerUserId = localStorage.getItem("id");
  
    const id = t.id;
    console.log(id);
    axios
      .delete(`http://localhost:8085/transaction/delete/${id}`)
      .then((response) => {
        setMsg(response.data);

        axios
      .get(`http://localhost:8085/transaction/manager/all/${managerUserId}`)
      .then((response) => {
        setTransactions(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      })
      .catch((error) => console.log(error));
  };


    return(
        <div>
            <nav class="navbar " style={{width:'1100px',backgroundColor: "skyblue"}}>
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1">
        <h4>History
            </h4></span>
            <button title="Logout" className="btn btn-secondary"  alignRight color='black' style={{color:'white',fontWeight:'bold'}} onClick={() => {
                localStorage.clear();
                navigate("/?msg=logged out successfully");
              }} >LogOut
           </button>
  </div>
</nav>
<br/><br/>
{transactions.length === 0 && <h3 style={{color:'white'}}>No records to show</h3>}
      <h6>{msg}</h6>
      {transactions.length > 0 && (
        <div className="card-body">
          {transactions.map((t) => (
            <div key={t.id} className="history-card">
              <div className="history-content">
                <div style={{ fontWeight: "bolder" }}>
                  {t.date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  You have Appreciated {t.pointsGiven} Points to {t.employeeName}..
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 EmpCode:{t.employee.empCode}
                 <div style={{ textAlign: "right" ,border:'black'}}> <button className="btn btn-secondary"  onClick={() => deleteTransaction(t)}>
                    Delete
                  </button></div>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

        </div>
    )
}
export default ManagerHistoryComponent;