import React, { useContext, useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import "./css/users.css";
import { Link, useNavigate } from "react-router-dom";
import { newContext } from "../../App";
import axios from "axios";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";

function Users() {
  const [users, setUser] = useState([]);

  const navigate = useNavigate();
  const { adminlogin } = useContext(newContext);

  const fetchAllUsers = async () => {
    try {
      let tk = Cookies.get("tk");
      let userlist = await axios.get("http://localhost:5275/api/User", {
        headers: {
          Authorization: `Bearer ${tk}`,
        },
      });
      setUser(userlist.data);
      console.log(userlist.data);
    } catch (err) {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div
      style={{
        paddingTop: "80px",
        backgroundColor: "#212121",
        minHeight: "100vh",
      }}
    >
      {adminlogin ? (
        <div className="container container-main">
          <ListGroup
            as="ul"
            className="list ad-user-list"
            style={{ width: "100%", padding: 0 }}
          >
            {users?.map((val, index) => {
              if (val.role === "admin") {
                return <></>;
              }
              return (
                <>
                  <Link
                    to={`/users/${val.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ListGroup.Item
                      style={{
                        width: "100%",
                        height: "70px",
                        borderRadius: "10px",
                        border: "1px solid black",
                        marginBottom: "2px",
                        paddingTop: "13px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    
                      }}
                      key={index}
                    >
                      <div className="row" style={{ width: "100%" }}>
                        <div
                          className="col-1 ad-user-img-div d-flex"
                          style={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <Avatar alt="Remy Sharp" src={val.profile_Photo} />
                        </div>
                        <div
                          className="col-9 ad-user-mail-div d-flex"
                          style={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <h6
                            style={{
                              fontFamily: "sans-serif",
                              paddingLeft: "30px",
                            }}
                          >
                            {val.email}
                          </h6>
                        </div>

                        <div
                          className="col-2 ad-bage d-flex"
                          style={{
                            justifyContent: "flex-end",
                            paddingBottom: "10px",
                          }}
                        >
                          <Badge
                            bg="dark"
                            pill
                            style={{ width: "20px", height: "20px" }}
                            className="ad-user-badge"
                          >
                            {val.orders &&
                              val.orders.length != 0 &&
                              val.orders.length}
                          </Badge>
                          &nbsp;
                          {val.status == "Blocked" &&
                          <Badge
                            bg={"danger"}
                            pill
                            style={{ padding:"5px 1 0px" }}
                            className="ad-user-badge"
                          >
                            {val.status}
                            {/* {val.carts &&
                              val.carts.length != 0 &&
                              val.carts.length} */}
                          </Badge>}
                        </div>
                      </div>
                    </ListGroup.Item>
                  </Link>
                </>
              );
            })}
          </ListGroup>
        </div>
      ) : (
        <h1 style={{ color: "red", textAlign: "center" }}>Access Denied !</h1>
      )}
    </div>
  );
}

export default Users;
