import React, { useEffect, useState } from "react";
import { CardFooter, CardHeader, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Col, Form, Row } from "react-bootstrap";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Nav,
} from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function ProductComponent(props) {
  const navigate = useNavigate();
  const [param] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [qStr, setQStr] = useState("");
  const [msg, setMsg] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const[page,setPage]=useState('')
  const[size,setSize]=useState(9)

  const handlePurchasedProducts = (p) => {
    const Employeeid = localStorage.getItem("id");
    const productpoints = p.points;
    console.log(Employeeid);
    console.log(p.id);
    const availablepoints = localStorage.getItem("pointsBalance");
    console.log("Available Points:", availablepoints);
    console.log("Product Points:", productpoints);

    if (availablepoints < productpoints) {
      console.log("Not enough points to purchase");
      setMsg(
        `Not enough points to purchase this product. Available points: ${availablepoints}`
      );
      return;
    } else {
      let productobj = [
        {
          productId: p.id,
        },
      ];

      axios
        .post(
          `http://localhost:8085/purchasedproducts/add/${Employeeid}`,
          productobj
        )

        .then((response) => {
          console.log(response.data);
          setMsg("product is purchased successfully");
          navigate("/employee/dashboard/?page=cart")
        })

        .catch(function (error) {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    if (props.strVal !== "") {
      axios
        .get("http://localhost:8085/product/search/" + props.strVal)
        .then((response) => {
          console.log("Search Results:", response.data);
          setSearchProducts(response.data);
        });
    } else {
      setSearchProducts([]);
    }
  }, [props.strVal]);

  useEffect(() => {
    const getAllProducts = async () => {
      const response = await axios.get(
        "http://localhost:8085/product/all?page=" + page + "&size=" + size
      );
      setProducts(response.data);
    };
    getAllProducts();
  }, [page, size]);
  const getProducts = (direction) => {
    let temp = page;
    if (direction === "prev" && page > 0) {
      setPage(--temp);
    } else {
      setPage(++temp);
    }
  };

  return (
    <div>
      <div >
        <nav
          className="navbar "
          style={{ width: "1100px", backgroundColor: "skyblue" }}
        >
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">
              <h4>Products</h4>
            </span> 
           
           
          </div>
        </nav>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div> <Form
        onSubmit={(e) => {
          e.preventDefault();
          props.func(qStr);
        }}
      >
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search Products"
              className=" mr-sm-2"
              onChange={(e) => setQStr(e.target.value)}
            />
          </Col>
        </Row>
      </Form></div>
     

      <br />
      <br />
      {msg && (
          <div
            style={{
              color: msg.includes("Successfully") ? "green" : "red",
            }}
          >
            {msg}
          </div>
        )}
      <br />
      <br />
      
   
        <div className="row">
          {searchProducts.map((p, index) => (
            <div key={index} className="col-md-4 mb-4">
              <Card
               className="product-card"
              >
                <CardHeader>Seach Results</CardHeader>

                <CardBody>
                <img  src={`/images/${p.image}`} style={{width:"180px", height:"200px"}} alt='Portrait' />
                  <CardTitle tag="h5">{p.name}</CardTitle>
                  <br />
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Points:{p.points}
                  </CardSubtitle>

                  <CardText>{p.availability}</CardText>
                </CardBody>
                <CardFooter>
                  {" "}
                  <Button key={p.id} onClick={() => handlePurchasedProducts(p)}>
                    Redeem
                  </Button>
                </CardFooter>
              </Card>
              <br />
              <Nav.Link> </Nav.Link>
            </div>
          ))}
    

        <div className="row">
          {searchProducts.length !== 0 ? (
            <div>
              <hr />
            </div>
          ) : (
            ""
          )}
             {products.length === 0? <div>No more products to show...</div>:''}
        <div className="row"> {products.map((p, index) => (
            <div key={index} className="col-md-4 mr-4 ">
              <Card
               className="product-card"
              >
                <CardHeader> Product</CardHeader>

                <CardBody>
                <img  src={`/images/${p.image}`} style={{width:"180px", height:"200px"}} alt='Portrait' />
                  <CardTitle tag="h5">{p.name}</CardTitle>
                  <br />
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Points:{p.points}
                  </CardSubtitle>
                  <CardText>{p.availability}</CardText>
                </CardBody>
                <CardFooter>
                  <Button key={p.id} onClick={() => handlePurchasedProducts(p)}>
                   Redeem
                  </Button>
                </CardFooter>
              </Card>
              <mr />
            </div>
          ))}
         
        </div></div>
         
       
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className={`page-link ${page === 0 ? 'disabled' : ''}`}
              onClick={() => getProducts('prev')}
              disabled={page === 0} // Disable the button if page is 0
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            {products.length === 0 ? (
              <Nav.Link className="page-link disabled" onClick={() => getProducts('next')}>
                Next
              </Nav.Link>
            ) : (
              <Nav.Link className="page-link" onClick={() => getProducts('next')}>
                Next
              </Nav.Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
 
}

export default ProductComponent;
