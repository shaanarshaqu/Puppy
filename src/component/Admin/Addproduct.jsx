import React, { useContext, useEffect, useRef, useState } from "react";
import { newContext } from "../../App";
import images from "./pictures/items.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Addproduct() {
  const { adminlogin } = useContext(newContext);
  const navigate = useNavigate();
  //set img
  const [selectedImage, setSelectedImage] = useState("");
  const [updatingImage, setupdatingImage] = useState("");
  //type
  const [typeofItem, setTypeofItem] = useState("");
  const [Ctg_Id, setCtg_Id] = useState("");
  const productNameRef = useRef();
  const productDetailRef = useRef();
  const productAboutRef = useRef();
  const itemPriceRef = useRef();

  async function AddItem() {
    try{
      if(
        updatingImage != "" &&
        typeofItem != "" &&
        Ctg_Id != "" &&
        productNameRef.current.value != '' &&
        productDetailRef.current.value != "" &&
        productAboutRef.current.value != "" &&
        itemPriceRef.current.value != "" 
      ){
        const tk = Cookies.get("tk");
        let formDataObj = new FormData();
        formDataObj.append("product.Type",typeofItem);
        formDataObj.append("product.Name",productNameRef.current.value);
        formDataObj.append("product.Detail",productDetailRef.current.value);
        formDataObj.append("product.About",productAboutRef.current.value);
        formDataObj.append("product.Price",Number(itemPriceRef.current.value));
        formDataObj.append("product.Category_id",Number(Ctg_Id));
        formDataObj.append("image",updatingImage);
        await axios.post("http://localhost:5275/api/Products/Add",formDataObj,{
          headers:{
            Authorization:`Bearer ${tk}`
          }
        })
        alert("successs");
      }else{
        alert("please fill");
      }
    }catch(err){
      alert("error");
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setupdatingImage(file);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        color:"white",
        paddingBottom: "20px",
        paddingTop: "80px",
        minHeight: "100vh",
      }}
    >
      {adminlogin ? (
        <>
          <div className="container" style={{ paddingTop: "10px" }}>
            <div className="row">
              <div
                className="col-12 col-sm-12 col-md-6 d-flex"
                style={{ flexDirection: "column", alignItems: "center" }}
              >
                <div
                  className="d-flex"
                  style={{
                    overflow: "hidden",
                    borderRadius: "10px",
                    justifyContent: "center",
                    backgroundColor: "white",
                    alignItems: "center",
                    height: "250px",
                    width: "250px",
                    border: "2px solid black",
                  }}
                >
                  <label htmlFor="imageinp">
                    <img
                      src={selectedImage || images}
                      style={{
                        borderRadius: "10px",
                        width: "240px",
                        border: "1px solid black",
                        backgroundColor:"lightgray"
                      }}
                      className="img-fluid"
                    />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="input-file"
                    name="uploadimage"
                    id="imageinp"
                    style={{ textDecoration: "none", display: "none" }}
                  />
                </div>
                <p>Choose Image</p>
              </div>
              <div
                className="col-12 col-sm-12 col-md-6 d-flex"
                style={{
                  flexDirection: "column",
                  alignItems: "start",
                  // backgroundColor: "green",
                }}
              >
                {/* <h5>#id:{itemId}</h5> */}
                <br />
                <strong>Select Category</strong>
                <span className="row">
                  {[
                    { ctg_name: "Dog", ctg_id: 10 },
                    { ctg_name: "Cat", ctg_id: 11 },
                    { ctg_name: "Puppy", ctg_id: 12 },
                    { ctg_name: "Kitten", ctg_id: 13 },
                    { ctg_name: "Birds", ctg_id: 14 },
                    { ctg_name: "Reptiles", ctg_id: 15 },
                    { ctg_name: "Small Animal", ctg_id: 16 },
                    { ctg_name: "Fish", ctg_id: 17 },
                    { ctg_name: "Accessories", ctg_id: 26 },
                  ].map((cg) => (
                    <span className="col-6">
                      <input
                        type="radio"
                        name="ctg"
                        value="dog"
                        onChange={() => setCtg_Id(cg.ctg_id)}
                      />
                      {cg.ctg_name} &nbsp;
                    </span>
                  ))}
                </span>
                <strong>Select Type</strong>
                <span className="row">
                  {[{ Typ: "food" }, { Typ: "care" }].map((t) => (
                    <span className="col-6">
                      <input
                        type="radio"
                        name="type"
                        value={t.Typ}
                        onChange={() => setTypeofItem(t.Typ)}
                      />
                      {t.Typ} &nbsp;
                    </span>
                  ))}
                </span>
                <input
                  type="text"
                  placeholder="Product Name"
                  style={{ width: "100%" }}
                  ref={productNameRef}
                />

                <input
                  type="text"
                  placeholder="Details or Qty"
                  style={{ width: "100%" }}
                  ref={productDetailRef}
                />
                <input
                  type="text"
                  placeholder="description"
                  style={{ width: "100%" }}
                  ref={productAboutRef}
                />
                <span>
                  <b style={{ fontSize: "20px" }}>₹</b>&nbsp;&nbsp;
                  <input
                    type="number"
                    placeholder="Price"
                    min={1}
                    ref={itemPriceRef}
                  />
                </span>
                <br />
                <Button
                variant="light"
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    padding: "5px 50px",
                  }}
                  onClick={AddItem}
                >
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 style={{ color: "red", textAlign: "center" }}>Access Denied</h1>
      )}
    </div>
  );
}

export default Addproduct;
