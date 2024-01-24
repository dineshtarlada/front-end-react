import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Card, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router";



function CartComponent(){
  const[purchasedproducts,setPurchasedProducts]=useState([]);
    const navigate=useNavigate();
    const Employeeid=localStorage.getItem("id")
    const [msg,setMsg]=useState('')
  
    useEffect(() => {
      axios.get(`http://localhost:8085/employees/purchasedproducts/all/${Employeeid}`)
        .then((response) => {
          setPurchasedProducts(response.data);
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [Employeeid]); 
  

    const deleteCartRecord = (p) => {
 
      const id = p.id;
      console.log(id);
      axios
        .delete(`http://localhost:8085/purchasedproducts/delete/${id}`)
        .then((response) => {
          setMsg(response.data);
  
          axios.get(`http://localhost:8085/employees/purchasedproducts/all/${Employeeid}`)
          .then((response) => {
            setPurchasedProducts(response.data);
            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
        })
        .catch((error) => console.log(error));
    };
   
      
    
    return(

        <div  >
            <nav class="navbar " style={{width:'1100px',backgroundColor: "skyblue"}}>
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1">
        <h4>Cart
            </h4></span>
           
  </div>
</nav>
<br/><br/>

{purchasedproducts.length === 0 && <h3 style={{color:'white'}}>No records to show</h3>}
      <h6>{msg}</h6>
      {purchasedproducts.length > 0 && (
<div>
        {purchasedproducts.map((p,index) => (
          <Card key={index} className="cart-card">
            <div className="row">
<div className="col">
<Card.Img
              variant="top"
              style={{width:'300px',height:'14rem',textAlign:'left'}}
              src={`/images/${p.productimage}`} // Make sure the property name is correct
              alt=''
            />
</div>
<div className="col"> <Card.Body>
              <Card.Title style={{ fontSize: '1.5rem', color: '#343a40' }}>
                {p.productname}
              </Card.Title>
              <br/>
              <Card.Subtitle className="mb-2 text-muted">
                <h4 style={{ fontSize: '1rem', color: '#6c757d' }}>
                  {p.productprice} points
                </h4>
              </Card.Subtitle>
              
            
              <Card.Text style={{ color: 'blue' }}>
                Purchase Date: {p.dateOfPurchase}
              </Card.Text>

              <Card.Text style={{ color: 'blue' }}>
               Order Id: {p.id}
              </Card.Text>

<br/>
              <Card.Text style={{ color: 'green', fontWeight: 'bold' }}>
                You have redeemed this product successfully
              </Card.Text>
              <button key={p.id} className="btn btn-secondary" style={{ textAlign: "right" }} onClick={() => deleteCartRecord(p)} >
                    Delete
                  </button>
            </Card.Body></div>
          </div>
            
           
          </Card>
        ))}
      </div>)}
      <br/><br/>

<br/>

 
        </div>
    )
}
export default CartComponent;