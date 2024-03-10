import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { newContext } from "../../../App";
import { IoMdHeart } from "react-icons/io";

function WishList() {
  const { fetchUserWishList, wishlists, setWishLists ,removeFromUserWishList} = useContext(newContext);

  useEffect(() => {
    fetchUserWishList();
  }, []);

  return (
    <div
      className="container"
      style={{ paddingTop: "80px", minHeight: "95vh" }}
    >
      <div className="row">
        {wishlists.length != 0 ?
        wishlists?.map((val) => (
          <>
            <div className="col-6 col-sm-4 col-md-3 col-lg-3 my-2 d-flex" style={{justifyContent:"center"}}>
              <Card
                style={{
                  height: "300px",
                  width:"187px",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "inherit",
                  border:"none"
                }}
                key={val.id}
              >
                <Link
                  to={`/product/${val.product_id}`}
                  style={{ textDecoration: "none",color:"inherit" }}
                >
                  <Card.Img
                    variant="top"
                    src={val.img}
                    style={{ height: "150px", width: "auto" }}
                  />
                  <Card.Body>
                    <Card.Title>
                      {val.name?.length > 30
                        ? val.name.slice(0, 31) + ".."
                        : val.name}
                    </Card.Title>
                    <Card.Text>
                      {val.detail?.length > 20
                        ? val.detail.slice(0, 20) + ".."
                        : val.detail}
                      <br />
                      <h5
                        className="h5-cat"
                        style={{
                          color: "white",
                          position: "absolute",
                          bottom: 3,
                        }}
                      >
                        ₹{val.price}
                      </h5>
                    </Card.Text>
                  </Card.Body>
                </Link>
                <IoMdHeart
                        style={{
                          position: "absolute",
                          right: 2,
                          top: "2",
                          fontSize: "1.5em",
                          color: "red",
                        }}
                        onClick={()=>removeFromUserWishList(val.product_id)}
                      />
              </Card>
            </div>
          </>
        )) : <h1 style={{marginTop:"50px"}}>{`No Wishes :) `}</h1>}
      </div>
    </div>
  );
}

export default WishList;
