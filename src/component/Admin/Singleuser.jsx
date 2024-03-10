import React, { useContext, useEffect, useState } from "react";
import { newContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";
import { deepOrange, green } from "@mui/material/colors";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Singleuser() {
  let { id } = useParams();
  const navigate = useNavigate();
  const { adminlogin } = useContext(newContext);
  const [currentuser, setCurrentuser] = useState({});

  const fetchCurrentUser = async () => {
    try {
      let tk = Cookies.get("tk");
      let user = await axios.get(`http://localhost:5275/api/User/User/${id}`, {
        headers: {
          Authorization: `Bearer ${tk}`,
        },
      });
      setCurrentuser(user.data);
      console.log(user.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  //modelshow--------------------------------
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //--------------------------------------------

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  async function BlockUser() {
    try {
      const tk = Cookies.get("tk");
      await axios.put(
        `http://localhost:5275/api/User/BlockUser/${currentuser.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        }
      );
      fetchCurrentUser();
      handleClose();
    } catch (err) {}
  }
  async function UnBlockUser() {
    try {
      const tk = Cookies.get("tk");
      await axios.put(
        `http://localhost:5275/api/User/UnBlockUser/${currentuser.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        }
      );
      fetchCurrentUser();
      handleClose();
    } catch (err) {}
  }

  return (
    <div
      style={{
        paddingTop: "70px",
        paddingBottom: "20px",
        backgroundColor: "black",
      }}
    >
      {adminlogin ? (
        <>
          <div className="container" style={{ minHeight: "100vh" }}>
            <div className="row">
              <div
                className="col-12 col-sm-12 col-md-3 d-flex"
                style={{
                  height: "250px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="single-img-div">
                  <Avatar
                    alt="Remy Sharp"
                    src={currentuser.profile_Photo}
                    sx={{ width: 150, height: 150, backgroundColor: "white" }}
                  />
                </div>
              </div>
              <div
                className="col-12 col-sm-12 col-md-9 d-flex"
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  color: "white",
                }}
              >
                <h3 style={{ color: "white" }}>{currentuser.name}</h3>
                <p style={{ color: "white" }}>
                  <i>{currentuser.email}</i>
                  <br />
                  Phone : {currentuser.phone}
                  <br />
                  Previlage : {currentuser.role}
                  <br />
                  Place : {currentuser.place}
                </p>
                {currentuser.status === "Active" ? (
                  <Button
                    variant="danger"
                    className="d-flex"
                    style={{
                      width: "150px",
                      alignSelf: "flex-end",
                      justifyContent: "center",
                    }}
                    onClick={handleShow}
                  >
                    Block User
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    className="d-flex"
                    style={{
                      width: "150px",
                      alignSelf: "flex-end",
                      justifyContent: "center",
                    }}
                    onClick={handleShow}
                  >
                    Activate User
                  </Button>
                )}
              </div>
            </div>
            <br />
            {/* <ListGroup
              as="ul"
              className="list ad-user-list"
              style={{ width: "100%",color:"white" }}
            >
              <h6>Order Details</h6>
              <ListGroup.Item style={{ border: "none" }}>
                <div className="row">
                  <div className="col-1 ">
                    <b># OrderId</b>
                  </div>
                  <div className="col-2 ">
                    <b># Id</b>
                  </div>
                  <div className="col-3 ">
                    <b>Over View</b>
                  </div>
                  <div className="col-2 ">
                    <b>Price</b>
                  </div>
                  <div className="col-2 ">
                    <b>Qty</b>
                  </div>
                  <div className="col-2 ">
                    <b>Total</b>
                  </div>
                </div>
              </ListGroup.Item>
              {currentuser.orders ? (
                currentuser.orders.map((val, index) => (
                  <ListGroup.Item key={index} style={{backgroundColor:"black",color:"white"}}>
                    <div className="row">
                      <div className="col-1 ">{val.id}</div>
                      <div className="col-2 ">{val.product_Id}</div>
                      <div className="col-3 ">
                        <Avatar
                          alt="Remy Sharp"
                          src={val.img}
                          sx={{ width: 56, height: 56 }}
                        />
                      </div>
                      <div className="col-2 ">{val.price}</div>
                      <div className="col-2 ">{val.qty}</div>
                      <div className="col-2 ">{val.total}</div>
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <h5 style={{ textAlign: "center", marginTop: "20px" }}>
                  No items ordered.
                </h5>
              )}
            </ListGroup> */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell># OrderId</TableCell>
                    <TableCell># Id</TableCell>
                    <TableCell>Over View&nbsp;</TableCell>
                    <TableCell>Price&nbsp;</TableCell>
                    <TableCell>Qty&nbsp;</TableCell>
                    <TableCell>Total&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentuser.orders ? (
                    currentuser.orders.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell>{row.product_Id}</TableCell>
                        <TableCell className="d-flex">
                          <Avatar
                            alt="Remy Sharp"
                            src={row.img}
                            sx={{ width: 50, height: 50 }}
                          />
                        </TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.qty}</TableCell>
                        <TableCell>{row.total}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <h5 style={{ textAlign: "center", marginTop: "20px" }}>
                      No items ordered.
                    </h5>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {currentuser.status === "Active"
                  ? "Block User"
                  : "Activate User"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              {currentuser.status === "Active"
                ? "Block User "
                : "Activate User "}
              {currentuser.email} ?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              {currentuser.status === "Active" ? (
                <Button variant="danger" onClick={BlockUser}>
                  Block User
                </Button>
              ) : (
                <Button variant="success" onClick={UnBlockUser}>
                  Unblock User
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <h1 style={{ color: "red", textAlign: "center" }}>Access Denied!</h1>
      )}
    </div>
  );
}

export default Singleuser;
