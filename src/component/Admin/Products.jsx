import React, { useContext, useEffect, useState } from "react";
import { newContext } from "../../App";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import AddIcon from "@mui/icons-material/Add";

function Products({Ctg, setCtg}) {
  const { adminlogin } = useContext(newContext);
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();


  const fetchProductByCtg = async (cg, pageNo = 1) => {
    try {
      let ProductsByCtg = await axios.get(
        `http://localhost:5275/api/Products/ByCategory?category=${cg}&pageNo=${pageNo}&pageSize=10`
      );
      setProduct(ProductsByCtg.data);
    } catch (err) {}
  };



  useEffect(() => {
    fetchProductByCtg(Ctg);
  }, [Ctg]);

  return (
    <div
      style={{
        paddingTop: "80px",
        paddingBottom: "20px",
        backgroundColor: "#212121",
        minHeight: "120vh",
      }}
    >
      {adminlogin ? (
        <>
          <div className="container">
            <div className="d-flex" style={{ justifyContent: "flex-end" }}>
              <Box
                sx={{
                  minWidth: 190,
                  color: "white", // Text color for the selected option
                  backgroundColor: "black", // Background color for the select box
                  "& .MuiSelect-select": {
                    color: "white", // Text color for the dropdown menu items
                  },
                  "& .MuiMenuItem-root": {
                    color: "white", // Text color for the dropdown menu items
                    backgroundColor: "black", // Background color for the dropdown menu items
                  },
                  "& .MuiSelect-icon": {
                    color: "white", // Color of the dropdown arrow icon
                  },
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Products
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Ctg}
                    label="ctg"
                    onChange={(e) => {
                      setCtg(e.target.value);
                      fetchProductByCtg(e.target.value);
                    }}
                  >
                    <MenuItem value={"Dog"}>Dog</MenuItem>
                    <MenuItem value={"Cat"}>Cat</MenuItem>
                    <MenuItem value={"Puppy"}>Puppy</MenuItem>
                    <MenuItem value={"Kitten"}>Kitten</MenuItem>
                    <MenuItem value={"Reptiles"}>Reptiles</MenuItem>
                    <MenuItem value={"Small_Animals"}>Small Animals</MenuItem>
                    <MenuItem value={"Birds"}>Birds</MenuItem>
                    <MenuItem value={"Fish"}>Fish</MenuItem>
                    <MenuItem value={"Accessories"}>Accessories</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="row">
              {products.map((val) => (
                <>
                  <div className="col-6 col-sm-4 col-md-3 col-lg-2 my-2">
                    <Link
                      to={`/products/${val.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        style={{
                          height: "330px",
                          overflow: "hidden",
                          position: "relative",
                        }}
                        key={val.id}
                      >
                        <Card.Img
                          variant="top"
                          src={val.img}
                          style={{ height: "150px", width: "140px" }}
                        />
                        <Card.Body>
                          <Card.Title>
                            {val.name.length > 30
                              ? val.name.slice(0, 31) + ".."
                              : val.name}
                          </Card.Title>
                          <Card.Text>
                            {val.detail.length > 20
                              ? val.detail.slice(0, 20) + ".."
                              : val.detail}
                            <br />
                            <h5
                              className="h5-cat"
                              style={{
                                color: "black",
                                position: "absolute",
                                bottom: 3,
                                right: 10,
                              }}
                            >
                              <b>₹{val.price}</b>
                            </h5>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>
                </>
              ))}
            </div>
            <div className="row">
              <div
                className="col-12 d-flex"
                style={{ justifyContent: "center" }}
              >
                <Pagination
                  count={2}
                  onChange={(e, p) => fetchProductByCtg(Ctg, p)}
                />
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            style={{
              padding: "25px",
              borderRadius: "15%",
              position: "fixed",
              right: "30px",
              bottom: "30px",
            }}
            onClick={() => navigate("/products/addproducts")}
          >
            <AddIcon />
          </Button>
        </>
      ) : (
        <h1 style={{ color: "red", textAlign: "center" }}>Access Denied</h1>
      )}
    </div>
  );
}

export default Products;
