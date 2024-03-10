import React, { useRef, useState } from "react";
import "./signup.css";
import { Button } from "react-bootstrap";
import userlogo from "../../images/userlogo.png";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function Signup({ Rgister }) {
  const nameRef = useRef("");
  const mailRef = useRef("");
  const passRef = useRef("");
  const conpassRef = useRef("");
  const phoneRef = useRef("");
  const addressRef = useRef("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      setSelectedImage(selectedFile);
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="signup-window">
      <Navbar className="bg-body-tertiary" id="navbar">
        <Container fluid>
          <Navbar.Brand>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IoIosArrowBack style={{ fontSize: "1.2em" }} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="signup-div">
        <div className="signup">
          <div className="userlogo-div-sign d-flex align-items-center">
            <label htmlFor="imginput">
              <img src={image || userlogo} alt="logo" className="logo" />
            </label>
          </div>
          <h6>Set a profile photo.</h6>
          <div className="input-div" style={{ overflow: "auto" }}>
            {/* name */}
            <input
              type="text"
              placeholder="Name"
              ref={nameRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  mailRef.current.focus();
                }
              }}
            />
            {/* mail */}
            <input
              type="text"
              placeholder="Email"
              ref={mailRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  phoneRef.current.focus();
                }
              }}
            />
            {/* Phone */}
            <input
              type="tel"
              placeholder="Phone or Mobile"
              pattern="[0-9]*"
              maxLength="10"
              ref={phoneRef}
              style={{
                appearance: "textfield",
                MozAppearance: "textfield",
                WebkitAppearance: "textfield",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addressRef.current.focus();
                }
              }}
            />
            {/* Place */}
            <input
              type="text"
              placeholder="Address"
              ref={addressRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  passRef.current.focus();
                }
              }}
            />
            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              ref={passRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  conpassRef.current.focus();
                }
              }}
            />
            {/* ConPass */}
            <input
              type="password"
              placeholder="Conform Password"
              ref={conpassRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  Rgister(
                    nameRef.current.value.trim(),
                    mailRef.current.value.trim(),
                    phoneRef.current.value.trim(),
                    addressRef.current.value.trim(),
                    passRef.current.value.trim(),
                    conpassRef.current.value.trim(),
                    selectedImage
                  );
                }
              }}
            />
            {/* Image */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input-file"
              id="imginput"
              name="uploadimage"
              style={{ display: "none" }}
            />
            {/* Button */}
            <Button
              variant="primary"
              style={{ marginTop: "10px" }}
              onClick={() =>
                Rgister(
                  nameRef.current.value.trim(),
                  mailRef.current.value.trim(),
                  phoneRef.current.value.trim(),
                  addressRef.current.value.trim(),
                  passRef.current.value.trim(),
                  conpassRef.current.value.trim(),
                  selectedImage
                )
              }
              id="btn-login"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
