import React, { useContext, useEffect } from "react";
import "../../css/main.css";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
// import { Image } from "react-bootstrap";
import { newContext } from "../../../App";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { Button } from "react-bootstrap";

function Main() {
  const { setDisplaybool } = useContext(newContext);
  useEffect(() => {
    setDisplaybool(true);
  }, []);

  return (
    <div id="main-div-main">
      <Carousel interval={3000} data-bs-theme="white">
        <Carousel.Item>
          <img
            className="d-block w-100 images-carousal"
            src={
              "https://www.petsy.online/cdn/shop/files/Pedigree-C_T-home-page-banner_1912x531.png"
            }
            alt="First slide"
          />
          <Carousel.Caption>
            {/* <h5>First slide label</h5> */}
            {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 image-fluid images-carousal"
            src={"https://www.petsy.online/cdn/shop/collections/3-BANNER.jpg"}
            alt="Second slide"
          />
          <Carousel.Caption>
            {/* <h5>Second slide label</h5> */}
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 images-carousal"
            src={
              "https://www.petsy.online/cdn/shop/files/Dog-Banner-1_1912x531.jpg"
            }
            alt="Third slide"
          />
          <Carousel.Caption>
            {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* <div className="container">
        <div className="row">
          <div className="col-6 col-md-3 divisions">
            <Link to={"/dog"}>
              <div className="img-div img-fluid" id="one"></div>
            </Link>
            <small>Dog</small>
          </div>
          <div className="col-6 col-md-3 divisions">
            <Link to={"/cat"}>
              <div className="img-div img-fluid" id="two"></div>
            </Link>
            <small>Cat</small>
          </div>
          <div className="col-6 col-md-3 divisions">
            <div className="img-div img-fluid" id="three"></div>
            <small>Puppy</small>
          </div>
          <div className="col-6 col-md-3 divisions">
            <div className="img-div img-fluid" id="four"></div>
            <small>Kitten</small>
          </div>
          <div className="col-6 col-md-3 divisions">
            <div className="img-div img-fluid" id="five"></div>
            <small>Birds</small>
          </div>
          <div className="col-6 col-md-3 divisions">
            <div className="img-div img-fluid" id="six"></div>
            <small>Reptiles</small>
          </div>
          <div className="col-6 col-md-3 divisions">
            <div className="img-div img-fluid" id="seven"></div>
            <small>Small Animals</small>
          </div>
          <div className="col-6 col-md-3 divisions">
            <div className="img-div img-fluid" id="eight"></div>
            <small>Fish</small>
          </div>
        </div>
      </div>*/}

      <div style={{ position: "relative", width: "100%" }}>
        <a href="#one" style={{ textDecoration: "none", color: "inherit" }}>
          <FaArrowCircleLeft className="left-btns" />
        </a>
        <div
          className="container Main-scroll-container d-flex"
          style={{ overflow: "auto" }}
        >
          <div className="col-3 col-md-2 divisions">
            <Link to={"/dog"}>
              <div className="img-div img-fluid" id="one"></div>
            </Link>
            <small>Dog</small>
          </div>
          <div className="col-3 col-md-2 divisions">
            <Link to={"/cat"}>
              <div className="img-div img-fluid" id="two"></div>
            </Link>
            <small>Cat</small>
          </div>
          <div className="col-3 col-md-2 divisions">
            <Link to={"/puppy"}>
              <div className="img-div img-fluid" id="three"></div>
            </Link>
            <small>Puppy</small>
          </div>
          <div className="col-3 col-md-2 divisions">
            <Link to={"/kitten"}>
              <div className="img-div img-fluid" id="four"></div>
            </Link>
            <small>Kitten</small>
          </div>
          <div className="col-3 col-md-2 divisions">
            <Link to={"/birds"}>
              <div className="img-div img-fluid" id="five"></div>
            </Link>
            <small>Birds</small>
          </div>
          <div className="col-3 col-md-2 divisions">
            <Link to={"/reptiles"}>
              <div className="img-div img-fluid" id="six"></div>
            </Link>
            <small>Reptiles</small>
          </div>
          <div className="col-3 col-md-2 divisions">
            <Link to={"/small_animals"}>
              <div className="img-div img-fluid" id="seven"></div>
            </Link>
            <small>Small Animals</small>
          </div>
          <div className="col-3 col-md-2 divisions">
            <Link to={"/fish"}>
              <div className="img-div img-fluid" id="eight"></div>
            </Link>
            <small>Fish</small>
          </div>
        </div>
        <a href="#eight" style={{ textDecoration: "none", color: "inherit" }}>
          <FaArrowCircleRight className="right-btns" />
        </a>
      </div>
    </div>
  );
}

export default Main;
