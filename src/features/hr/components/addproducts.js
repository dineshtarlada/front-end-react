import React from "react";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardText,
  CardTitle,
  Modal,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { isDisabled } from "@testing-library/user-event/dist/utils";

function HrAddProductsComponent(props) {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [qStr, setQStr] = useState("");
  const [msg, setMsg] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const [showAddProductCard, setShowAddProductCard] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const[page,setPage]=useState('')
  const[size,setSize]=useState(9)


  const [name, setName] = useState("");
  const [points, setPoints] = useState("");
  const [availability, setAvailability] = useState('');

  const handleAddProduct = () => {
    setShowAddProductCard(true);
  };

  const handleCancelAddProduct = () => {
    setShowAddProductCard(false);
    setName("");
    setPoints("");
  };

  const handleAddProductSubmit = (e) => {
    // Make a POST request to add the product to the database
    const hrId = localStorage.getItem("id");
    let productobj = {
      "name": name,
      "points": points,
      "availability": availability,
    };
    axios
      .post(`http://localhost:8085/product/add/${hrId}`, productobj)
      .then((response) => {
        setMsg("Product added successfully");

        setShowAddProductCard(false);
        setName("");
        setPoints("");

        // Fetch updated product list
        axios.get("http://localhost:8085/product/all").then((response) => {
          setProducts(response.data);
        });
      })
      .catch((error) => setMsg("Error in adding product"));
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

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  const handleDeleteClick = (p) => {
    setProductToDelete(p);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setProductToDelete(null);
  };

  const deleteproduct = () => {
    if (productToDelete) {
      const productId = productToDelete.id;
      console.log(productId);
      axios
        .delete(`http://localhost:8085/product/delete/${productId}`)
        .then((response) => {
          setMsg(response.data);
          handleModalClose();

          axios
            .get("http://localhost:8085/product/all")
            .then((response) => {
              setProducts(response.data);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <nav
        className="navbar "
        style={{ width: "1100px", backgroundColor: "skyblue" }}
      >
        <div className="container-fluid">
          <span class="navbar-brand mb-0 h1">
            <h4>Add Products</h4>
          </span>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <Form
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
            </Form>
          </div>
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
      {showAddProductCard && (
        <Card className="productcard">
          <CardHeader>Add Product</CardHeader>

          <CardBody>
            <Form>
              <Form.Group controlId="productName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="productPoints">
                <Form.Label>Points</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product points"
                  name="points"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="productAvailability">
                <Form.Label>Availability</Form.Label>
                <Form.Select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                >
                 <option value="" disabled>
    Select Product Availability
  </option>
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </CardBody>

          <CardFooter>
            <Button
              variant="primary"
              onClick={(e) => handleAddProductSubmit(e)}
            >
              Add
            </Button>{" "}
            <Button variant="secondary" onClick={handleCancelAddProduct}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      )}
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

      <div className="addEmployee" onClick={handleAddProduct} style={{color:'white'}}>
        <span>
          <FontAwesomeIcon icon={faAdd} size="2x" />
          <h5 fontWeight="bold">Add Product</h5>
        </span>{" "}
      </div>

      <br />
   
        <div className="row">
          {searchProducts.map((p) => (
            <div key={p.id} className="col-md-4 mb-4">
              <Card className="product-card">
                <CardHeader>Seach Results</CardHeader>

                <CardBody>
                <img  src={`/images/${p.image}`} style={{width:"180px", height:"200px"}} alt='Portrait' />
                  <CardTitle tag="h5">{p.name}</CardTitle>
                  <br />
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Points:{p.points}
                  </CardSubtitle>

                  <CardText>{p.availability}</CardText>
                  <CardFooter>
                    <div
                      className="delete"
                      onClick={() => handleDeleteClick(p)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="1x"
                        color="darkred"
                      />{" "}
                    </div>
                  </CardFooter>
                </CardBody>
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
          <div className="row">  {products.map((p, index) => (
            <div key={p.id} className="col-md-4 mr-4 ">
              
              <Card className="product-card">
                <CardHeader> Product</CardHeader>

                <CardBody>
              
                <img  src={`/images/${p.image}`} style={{width:"180px", height:"200px"}} alt='Portrait' />
                {console.log(`/images/${p.image}`)}
                  <CardTitle tag="h5">{p.name}</CardTitle>
                  <br />
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Points:{p.points}
                  </CardSubtitle>
                  <CardText>{p.availability}</CardText>
                </CardBody>
                <CardFooter>
                  <div className="delete" onClick={() => handleDeleteClick(p)}>
                    <FontAwesomeIcon icon={faTrash} size="1x" color="darkred" />{" "}
                  </div>
                </CardFooter>
              </Card>
              <mr />
            </div>
          ))}
        </div></div>
        
       
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {productToDelete?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteproduct}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
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
export default HrAddProductsComponent;
