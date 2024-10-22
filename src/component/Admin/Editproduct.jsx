import React, { useContext, useEffect, useRef, useState } from "react";
import images from "./pictures/items.png";
import { newContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";

function Editproduct() {
  const { id } = useParams();
  const { adminlogin } = useContext(newContext);
  const navigate = useNavigate();
  const [element, setElement] = useState({});
  //set img
  const [selectedImage, setSelectedImage] = useState("");
  const [updatingImage, setupdatingImage] = useState("");

  const itemNameRef = useRef();
  const itemDetailRef = useRef();
  const [itemCtg, setitemCtg] = useState("");
  const [itemType, setitemType] = useState("");
  const itemAboutRef = useRef();
  const itemPriceRef = useRef();

  const Categoryobj = {
    Dog: 10,
    Cat: 11,
    Puppy: 12,
    Kitten: 13,
    Birds: 14,
    Reptiles: 15,
    Small_Animals: 16,
    Fish: 17,
    Accessories: 26,
  };

  async function editstate() {
    const tk = Cookies.get("tk");
    try {
      if (
        itemNameRef.current.value != "" &&
        itemDetailRef.current.value != "" &&
        itemType != "" &&
        Categoryobj[itemCtg] != null &&
        itemAboutRef.current.value != "" &&
        itemPriceRef.current.value != ""
      ) {
        let formData = new FormData();
        formData.append("product.Type", itemType);
        formData.append("product.Name", itemNameRef.current.value);
        formData.append("product.Detail", itemDetailRef.current.value);
        formData.append("product.About", itemAboutRef.current.value);
        formData.append("product.Price", Number(itemPriceRef.current.value));
        formData.append("product.Category_id", Number(Categoryobj[itemCtg]));
        if (!updatingImage) {
          let imageFetch = await fetch(element.img, {
            headers: {
              Authorization: `Bearer ${tk}`,
            },
          });
          let blob = await imageFetch.blob();
          console.log(blob);
          formData.append("image", blob);
        } else {
          formData.append("image", updatingImage);
        }

        await axios.put(
          `http://localhost:5275/api/Products/Update/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${tk}`,
            },
          }
        );
        alert("success");
      }
    } catch (err) {
      console.log("error");
    }
  }

  const fetchProduct = async () => {
    try {
      const item = await axios.get(`http://localhost:5275/api/Products/${id}`);
      setElement(item.data);
      setitemCtg(item.data.ctg);
      setitemType(item.data.type);
    } catch (err) {}
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  function removeitem() {}

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setupdatingImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        marginTop: "65px",
        backgroundColor: "black",
        color:"white",
        paddingBottom: "20px",
        minHeight: "100vh",
      }}
    >
      {adminlogin ? (
        <div className="container" style={{ paddingTop: "20px" }}>
          <div className="row">
            <div
              className="col-12 col-sm-12 col-md-5 d-flex justify-content-center"
              style={{ flexDirection: "column", alignItems: "center" }}
            >
              <div
                className="d-flex"
                style={{
                  overflow: "hidden",
                  borderRadius: "10px",

                  // backgroundColor: "yellow",
                  alignItems: "center",
                  height: "250px",
                  width: "250px",
                  border: "2px solid black",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <label htmlFor="uploadimage">
                  <img
                    src={selectedImage || element.img}
                    style={{ borderRadius: "10px", height: "240px" }}
                    className="img-fluid"
                  />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="input-file"
                  id="uploadimage"
                  style={{ textDecoration: "none", display: "none" }}
                />
              </div>
              <p>Choose Image</p>
              <Button
                variant="danger"
                onClick={removeitem}
                style={{
                  borderRadius: "25%",
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 10px",
                }}
              >
                <MdDeleteForever style={{ fontSize: "1.6em" }} />
              </Button>
            </div>
            <div
              className="col-12 col-sm-12 col-md-7 d-flex"
              style={{ justifyContent: "center" }}
            >
              <div
                className="d-flex"
                style={{ flexDirection: "column", width: "100%" }}
              >
                <strong style={{ fontSize: "18px" }}>#id:{element.id}</strong>
                <br />
                Name:
                <input
                  type="text"
                  style={{ width: "100%" }}
                  defaultValue={element.name}
                  ref={itemNameRef}
                />
                Detail:
                <input
                  type="text"
                  style={{ width: "100%" }}
                  defaultValue={element.detail}
                  ref={itemDetailRef}
                />
                <strong>Ctg:</strong>
                <span className="row">
                  {[
                    "Dog",
                    "Cat",
                    "Puppy",
                    "Kitten",
                    "Birds",
                    "Reptiles",
                    "Small_Animals",
                    "Fish",
                    "Accessories",
                  ].map((cg, i) => (
                    <span className="col-6" key={i}>
                      <input
                        type="radio"
                        name="ctg"
                        checked={itemCtg === cg}
                        onChange={() => {
                          setitemCtg(cg);
                        }}
                      />
                      {cg}&nbsp;
                    </span>
                  ))}
                </span>
                <strong>Type:</strong>
                <span>
                  <input
                    type="radio"
                    name="type"
                    checked={itemType === "food"}
                    onChange={() => setitemType("food")}
                  />
                  Food&nbsp;
                  <input
                    type="radio"
                    name="type"
                    checked={itemType === "care"}
                    onChange={() => setitemType("care")}
                  />
                  Care
                </span>
                About item:
                <input
                  type="text"
                  style={{ width: "100%" }}
                  defaultValue={element.about}
                  ref={itemAboutRef}
                />
                <span>
                  <b style={{ marginRight: "10px", fontSize: "20px" }}>₹</b>
                  <input
                    type="number"
                    style={{ width: "150px" }}
                    min={1}
                    defaultValue={element.price}
                    ref={itemPriceRef}
                  />
                </span>
                <span className="d-flex" style={{ justifyContent: "center" }}>
                  <Button
                    variant="secondary"
                    style={{ width: "90px", marginTop: "20px" }}
                    onClick={() => navigate("/products")}
                  >
                    Cancel
                  </Button>
                  &nbsp;
                  <Button
                    style={{ width: "150px", marginTop: "20px" }}
                    onClick={editstate}
                  >
                    Save Changes
                  </Button>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{ color: "red", textAlign: "center" }}>Access Denied!</h1>
      )}
    </div>
  );
}

export default Editproduct;
