import React, { useContext } from "react";
import "./navbar.css";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
//for icon
import { AiOutlineShoppingCart } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaBars } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { IoIosHeartEmpty } from "react-icons/io";
import NavDropdown from "react-bootstrap/NavDropdown";

function Navbarmain({
  state,
  displaybool,
  setSearch,
  displaylogin,
  usermail,
  cart,
  setShow,
  adminlogin,
}) {
  const navigate = useNavigate();
  function takeSearch(values) {
    let arr = state.filter((val) =>
      val.name.toLowerCase().includes(values.toLowerCase())
    );
    setSearch(arr);
    navigate("/search");
  }

  return (
    <div>
      {!adminlogin ? (
        <Navbar expand="md" className="d-flex align-item-center" id="navbar">
          <Container>
            <Navbar.Brand>
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3>
                  Pu<span style={{ color: "orange" }}>pp</span>y
                </h3>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={"offcanvasNavbar-expand-md"}>
              <FaBars />
            </Navbar.Toggle>

            <Navbar.Offcanvas
              id={"offcanvasNavbar-expand-md"}
              aria-labelledby={"offcanvasNavbarLabel-expand-md"}
              placement="end"
              className="canvas-main"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={"offcanvasNavbarLabel-expand-md"}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="input-nav">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {displaybool ? (
                    <>
                      <Nav.Link>
                        <Link
                          to={"/wishlist"}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <IoIosHeartEmpty style={{ fontSize: "1.6em" }} />
                        </Link>
                      </Nav.Link>

                      <Nav.Link style={{ position: "relative" }}>
                        <Link
                          to={"/cart"}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <Badge badgeContent={cart.length} color="error">
                            <AiOutlineShoppingCart
                              style={{ fontSize: "1.6em" }}
                            />
                          </Badge>
                        </Link>
                      </Nav.Link>
                    </>
                  ) : (
                    <></>
                  )}
                </Nav>
                <Form className="nav-inputs">
                  {displaybool ? (
                    <>
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2 inp-search"
                        aria-label="Search"
                        onChange={(e) => takeSearch(e.target.value)}
                      />
                      <Button variant="warning" style={{ marginRight: "10px" }}>
                        Search
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </Form>
                <div>
                  {!displaylogin ? (
                    <>
                      <Button
                        variant="primary"
                        style={{ marginRight: "10px" }}
                        onClick={() => navigate("/login")}
                      >
                        login
                      </Button>
                    </>
                  ) : (
                    <>
                      <span
                        style={{
                          width: "50px",
                          overflow: "hidden",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={usermail?.profile_Photo}
                          onClick={() => setShow(true)}
                        />
                      </span>
                    </>
                  )}
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ) : (
        <Navbar
          collapseOnSelect
          className="bg-dark"
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1,
            height: "65px",
          }}
        >
          <Container>
            <Navbar.Brand href="#home" style={{ color: "white" }}>
              <Link
                to={"/adminmain"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3>
                  Pu<span style={{ color: "orange" }}>pp</span>y
                </h3>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav">
              <FaBars style={{ color: "white" }} />
            </Navbar.Toggle>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link eventKey={2} className="d-flex justify-content-end">
                  {!displaylogin ? (
                    <>
                      <Button
                        variant="light"
                        style={{ marginRight: "10px" }}
                        onClick={() => navigate("/login")}
                      >
                        login
                      </Button>
                    </>
                  ) : (
                    <>
                      <span
                        style={{
                          width: "50px",
                          overflow: "hidden",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      >
                        <Avatar
                          style={{ backgroundColor: "lightgray" }}
                          alt="Remy Sharp"
                          src={usermail?.profile_Photo}
                          onClick={() => setShow(true)}
                        />
                      </span>
                    </>
                  )}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}

export default Navbarmain;
