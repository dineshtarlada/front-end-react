import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router";

function HistoryComponent() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [messages,setMessages]=useState([])
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const employeeId = localStorage.getItem("id");

    axios
      .get(`http://localhost:8085/employees/all/history/${employeeId}`)
      .then((response) => {
        setTransactions(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
useEffect(()=>{
  const employeeId = localStorage.getItem("id");
  
  axios
      .get(`http://localhost:8085/transaction/employee/all/${employeeId}`)
      .then((response) => {
        setMessages(response.data);
        console.log(response.data);
      })
      .catch((error)=>
      console.log(error))
  }, []);



  const deleteRecord = (t) => {
    const employeeId = localStorage.getItem("id");
    const id = t.id;
    console.log(id);
    axios
      .delete(`http://localhost:8085/employees/history/delete/${id}`)
      .then((response) => {
        setMsg(response.data);

        axios
          .get(`http://localhost:8085/employees/all/history/${employeeId}`)
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
  
  const deleteTransaction = (m) => {
    const employeeId = localStorage.getItem("id");
    
  
    const id = m.id;
    console.log(id);
    axios
      .delete(`http://localhost:8085/transaction/delete/${id}`)
      .then((response) => {
        setMsg(response.data);

       
  axios
  .get(`http://localhost:8085/transaction/employee/all/${employeeId}`)
  .then((response) => {
    setMessages(response.data);
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
      })
      .catch((error) => console.log(error));
  };


  return (
    <div>
      <nav className="navbar " style={{ width: "1100px", backgroundColor: "skyblue" }}>
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            <h4>History</h4>
          </span>
         
        </div>
      </nav>
      <br />
      <br />
      {transactions.length === 0 && messages.length===0 && <h3 style={{color:'white'}}>No records to show</h3>}
      <h6 style={{color:'white'}}>{msg}</h6>
      {transactions.length > 0 && (
        <div className="card-body">
          {transactions.map((t) => (
            <div key={t.id} className="history-card">
              <div className="history-content">
                <div style={{ fontWeight: "bolder" }}>
                  {t.dateoftransfer}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  You have transferred {t.transferredpoints} Points to {t.employeeName}..
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 
                  <div className="card-footer" onClick={() => deleteRecord(t)} style={{textAlign:'right'}}>
                    <FontAwesomeIcon icon={faTrash} size="1x" color="darkred" />{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
       {messages.length > 0 && (
        <div className="card-body">
          {messages.map((m) => (
            <div key={m.id} className="history-card">
              <div className="history-content">
               
                <div style={{ fontWeight: "bolder" }}>
                  {m.date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {m.manager.name} sent you {m.pointsGiven}points...
                  <br/>
                  <br/>
                 
                 Comment:<p style={{color:'green'}}>{m.comments}</p>
                  <div className="card-footer" onClick={() => deleteTransaction(m)} style={{textAlign:'right'}}>
                    <FontAwesomeIcon icon={faTrash} size="1x" color="darkred" />
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryComponent;
