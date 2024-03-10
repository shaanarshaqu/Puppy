import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./seperate.css";
import { Button } from "react-bootstrap";
// import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { newContext } from "../../App";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Notfound } from "../User/Error/Notfound";
import Cookies from "js-cookie";
import { SnackbarContent } from "@mui/material";

function SingleItem({ state }) {
  const { item_id } = useParams();
  const [product, setProduct] = useState(null);
  const { setDisplaybool, setFetchControll, userCartfetch } =
    useContext(newContext);

  //--------------------success alert-------------------------------------
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  //-------------------------------------------------------------------------

  const setcart = async () => {
    try {
      const token = Cookies.get("tk");
      const userid = Cookies.get("userId");
      if (!token || !userid) {
        throw new Error("UnAutorized");
      }
      const dataobj = {
        userId: userid,
        product_Id: item_id,
      };
      await axios.post("http://localhost:5275/api/Cart/AddUserCart", dataobj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFetchControll(true);
      await userCartfetch();
      handleClick();
    } catch (err) {
      alert("sorry an error occured");
    }
  };

  const fetchProduct = async (id) => {
    try {
      let obj = await axios.get(`http://localhost:5275/api/Products/${id}`);
      setProduct(obj.data);
    } catch (err) {
      console.log("item not found");
      setProduct(null);
    }
  };

  useEffect(() => {
    fetchProduct(item_id);
    setDisplaybool(true);
  }, [item_id]);

  return (
    <>
      {product != null ? (
        <div className="container seperate-div" style={{ minHeight: "100vh" }}>
          <div className="row seperate-row">
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 seperate-col1">
              <img src={product.img} alt="img.png" id="img-seperate" />
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-8 seperate-col2">
              <div className="seperate-col2-product">
                <h2
                  style={{
                    color: "rgb(229, 149, 0)",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  {product.name}
                </h2>
                <span style={{ marginTop: "50px" }}>
                  <small
                    className="d-flex"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    {product.detail}
                  </small>
                  <br />
                  <br />
                  <h6 style={{ color: "gray", fontSize: "15px" }}>About:</h6>
                  <p>{product.about}</p>
                </span>
              </div>
            </div>
            <div
              className="col-12 col-sm-12 col-md-12 col-lg-12"
              id="seperate-button-div"
            >
              <h4>
                <span style={{ color: "orange" }} id="seperate-price">
                  {"₹"+" "+product.price}
                </span>
              </h4>
              <span className="seperate-span">
                <Button
                  variant="warning"
                  style={{ padding: "10px 70px" }}
                  onClick={setcart}
                >
                  Add to cart
                </Button>
              </span>
            </div>
          </div>
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            message="Product successfully added to your cart!"
            variant="outlined"
          >
            <SnackbarContent
              style={{ color: "orange" ,backgroundColor:"white"}}
              message="Product successfully added to your cart!"
            />
          </Snackbar>
        </div>
      ) : (
        <Notfound />
      )}
    </>
  );
}

export default SingleItem;
