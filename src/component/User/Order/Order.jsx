import React, { useContext, useEffect, useState } from "react";
import { newContext } from "../../../App";
import "./order.css";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function Order() {
  const {
    setDisplaybool
  } = useContext(newContext);
  const [order,setOrder] = useState([])
  const navigate = useNavigate();



const fetchuserorder = async()=>{
  try{
    const tk = Cookies.get("tk");
    console.log(tk)
    let responese = await axios.get("http://localhost:5275/api/Order/UserOrder",{
      headers:{
        Authorization:`Bearer ${tk}`
      }
    })
    setDisplaybool(true);
    console.log(responese.data)
    setOrder(responese.data)
  }catch(err){

  }
}




  useEffect(() => {
    let token = Cookies.get("tk");
    if (token) {
      fetchuserorder()
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div className="container container-main" style={{paddingTop:"80px",minHeight:"100vh"}}>
        {order.length != 0 ? (
          <>
            {order?.map((val, index) => (
              <div className="row order-main-row mb-2">
                <div className="col-12 ">
                  <div className="row order-second-row">
                    <div className="col-3 order-second-column">
                      <div
                        className="img-div-order"
                        style={{ position: "relative" }}
                      >
                        <img src={val.img} />
                      </div>
                      <div className="btn-div-order">
                        {val.qty}
                      </div>
                    </div>
                    <div className="col-9 order-second-column2">
                      <div className="order-second-column2-div">
                        <h4>{val.product_Name}</h4>
                        <p>
                          {val.price}
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
            <h5 style={{ color: "orange",marginTop:"100px" }}>No Orders Found</h5>
          </>
        )}
      </div>
    </div>
  );
}

export default Order;
