import React, { useContext, useEffect, useState } from "react";
import { newContext } from "../../../App";
import "../../css/cart.css";
import { MdDelete } from "react-icons/md";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function Cart({ cart, setTotal, total }) {
  const {
    setDisplaybool,
    addtoCart,
    userCartfetch,
    displaycart,
    setDisplaycart,
  } = useContext(newContext);

  const navigate = useNavigate();

  async function incrementqty(id) {
    try {
      const tk = Cookies.get("tk");
      let dataobj = {
        userId: Cookies.get("userId"),
        elementId: id,
      };
      await axios.put("http://localhost:5275/api/Cart/increment", dataobj, {
        headers: {
          Authorization: `Bearer ${tk}`,
        },
      });
      await userCartfetch();
    } catch (err) {}
  }

  async function decrementqty(id) {
    try {
      const tk = Cookies.get("tk");
      let dataobj = {
        userId: Cookies.get("userId"),
        elementId: id,
      };
      await axios.put("http://localhost:5275/api/Cart/decrement", dataobj, {
        headers: {
          Authorization: `Bearer ${tk}`,
        },
      });
      await userCartfetch();
    } catch (err) {}
  }

  async function removeFromcart(id) {
    try {
      const tk = Cookies.get("tk");
      console.log(tk)
      let dataobj = {
        userId: Cookies.get("userId"),
        elementId: id,
      };
      await axios.delete("http://localhost:5275/api/Cart",{
        data:dataobj,
        headers:{
          "Authorization":`Bearer ${tk}`,
        }
      })
      await userCartfetch();
    } catch (err) {}
  }


useEffect(()=>{
  if (cart.length !== 0) {
    let total = cart.reduce((totalval, val) => totalval + parseInt(val.total), 0);
    setTotal(total);
    setDisplaycart(true);
  } else {
    setDisplaycart(false);
  }
},[cart])



  useEffect(() => {
    let token = Cookies.get("tk");
    if (token) {
      setDisplaybool(true);
      userCartfetch(true);
    } else {
      navigate("/login");
    }
  }, []);


  return (
    <div
      className="cart-main"
      style={{ marginTop: "70px", marginBottom: "80px" }}
    >
      <>
        <div className="container container-main">
          {displaycart ? (
            <>
              {cart.map((val, index) => (
                <div className="row cart-main-row mb-2">
                  <div className="col-12 ">
                    <div className="row cart-second-row">
                      <div className="col-3 cart-second-column">
                        <div
                          className="img-div-cart"
                          style={{ position: "relative" }}
                        >
                          <img src={val.img} />
                          <span
                            style={{ position: "absolute", bottom: "20px" }}
                            onClick={() => removeFromcart(val.id)}
                          >
                            <MdDelete
                              style={{
                                fontSize: "1.70em",
                                color: "red",
                                backgroundColor: "white",
                                borderRadius: "50%",
                                boxShadow: "0px 0px 20px black",
                              }}
                            />
                          </span>
                        </div>
                        <div className="btn-div-cart">
                          <Button
                            variant="secondary"
                            onClick={() => decrementqty(val.id)}
                          >
                            -
                          </Button>
                          &nbsp;{val.qty}&nbsp;
                          <Button
                            variant="secondary"
                            onClick={() => incrementqty(val.id)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="col-9 cart-second-column2">
                        <div className="cart-second-column2-div">
                          <h4>{val.name}</h4>
                          <small>
                            {val.detail.length > 50
                              ? val.detail.slice(0, 51)
                              : val.detail}
                            ..
                          </small>
                          <p>
                            {val.about.length > 90
                              ? val.about.slice(0, 91)
                              : val.about}
                            ..
                          </p>
                          <h6 style={{ color: "orange" }}>₹{val.total}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <h1 style={{ color: "orange" }}>Cart is empty</h1>
            </>
          )}
          <div className="cart-total-div">
            <div className="cart-total-div-inner">
              {displaycart ? (
                <>
                  <h4 style={{ color: "orange" }}>₹{total}</h4>
                  <br />
                  <Button
                    variant="warning"
                    style={{ padding: "10px 20px" }}
                    onClick={() => navigate("/payment")}
                  >
                    Pay Now
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default React.memo(Cart);
