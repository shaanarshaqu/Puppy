import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Cookies from "js-cookie";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const AdminDashBord = () => {
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  async function Purchase_Revenue() {
    try {
      const tk = Cookies.get("tk");
      let ResponsePurchase = await axios.get(
        "http://localhost:5275/api/Order/TotalParchase",
        {
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        }
      );
      setTotalPurchase(ResponsePurchase.data);
      const ResponseRevenue = await axios.get(
        "http://localhost:5275/api/Order/TotalRevenue",
        {
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        }
      );
      setTotalRevenue(ResponseRevenue.data);
    } catch (err) {
      console.log("something went wrong...");
    }
  }

  useEffect(() => {
    Purchase_Revenue();
  }, []);

  return (
    <div
      style={{
        paddingTop: "80px",
        paddingBottom: "20px",
        backgroundColor: "#212121",
        minHeight: "120vh",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 d-flex justify-content-end">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "300px",
                backgroundColor: "lightgray",
                height: 150,
                borderRadius: "5px",
                position: "relative",
              }}
            >
              <h3 style={{ color: "green" }}>{"₹ "+totalRevenue}</h3>
              <p style={{position:"absolute",top:0,left:5}}>Revenue :</p>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-start">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "300px",
                backgroundColor: "lightgray",
                height: 150,
                borderRadius: "5px",
                position: "relative",
              }}
            >
              <h3 style={{ color: "black" }}>{totalPurchase}</h3>
              <p style={{position:"absolute",top:0,left:5}}>Purchases :</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBord;
