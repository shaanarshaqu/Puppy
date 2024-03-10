import React, { useEffect } from "react";
import { newContext } from "../../../App";
import { useContext } from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";
import "./category.css";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { LoadingCategory } from "./LoadingCategory";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

const Category = () => {
  const { state, setState, setDisplaybool, addtoUserWishlist, wishlists,fetchUserWishList,removeFromUserWishList } =
    useContext(newContext);
  const { category } = useParams();
  const [totalCount, setTotalCount] = useState(0);

  const fetchproduct = async (page) => {
    try {
      let count = await axios.get(
        `http://localhost:5275/api/Products/totalinCtg/${category}`
      );
      setTotalCount(count.data);
      let Request = await axios.get(
        `http://localhost:5275/api/Products/ByCategory?category=${category}&pageNo=${page}&pageSize=12`
      );
      await fetchUserWishList();
      setState(Request.data);
    } catch (err) {
      setState([]);
    }
  };

  useEffect(() => {
    setDisplaybool(true);
    fetchproduct(1);
  }, []);

  return (
    <div className="category-section">
      {state.length != 0 ? (
        <div className="container">
          <div className="row card-row">
            {state?.map((val, index) => (
              <>
                <div className="col-6 col-sm-4 col-md-3 col-lg-2 my-2">
                  <Card
                    style={{ height: "370px", position: "relative" }}
                    key={val.id}
                  >
                    <Link
                      to={`/${category}/${val.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Card.Img
                        variant="top"
                        src={val.img}
                        style={{ maxHeight: "190px" }}
                      />
                      <Card.Body
                        style={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Card.Title>
                          {val.name.length > 28
                            ? val.name.slice(0, 28) + ".."
                            : val.name}
                        </Card.Title>
                        <Card.Text>
                          {val.detail.length > 28
                            ? val.detail.slice(0, 35) + ".."
                            : val.detail}
                        </Card.Text>
                        <h5
                          className="h5-category"
                          style={{ position: "absolute", bottom: 0 }}
                        >
                          ₹{val.price}
                        </h5>
                      </Card.Body>
                    </Link>
                    {wishlists?.some(item => item.product_id === val.id)  ? (
                      <IoMdHeart
                        style={{
                          position: "absolute",
                          right: 2,
                          top: "2",
                          fontSize: "1.5em",
                          color: "red",
                        }}
                        onClick={()=>removeFromUserWishList(val.id)}
                      />
                    ) : (
                      <IoIosHeartEmpty
                        style={{
                          position: "absolute",
                          right: 2,
                          top: "2",
                          fontSize: "1.5em",
                          color: "gray",
                        }}
                        onClick={() => addtoUserWishlist(val.id)}
                      />
                    )}
                  </Card>
                </div>
              </>
            ))}
          </div>
        </div>
      ) : (
        <LoadingCategory />
      )}
      <div
        className="d-flex"
        style={{
          width: "100%",
          justifyContent: "center",
          minHeight: "80px",
          alignItems: "center",
          paddingTop: "20px",
        }}
      >
        <Pagination
          count={totalCount / 12}
          onChange={(e, p) => fetchproduct(p)}
          variant="warning"
        />
      </div>
    </div>
  );
};

export default Category;
