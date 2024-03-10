import React, { useState } from "react";
import "../../css/paymentsection.css";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { newContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Payment({ usermail, total }) {
  const { users, setUser, cart } = useContext(newContext);
  const [Raz, setRaz] = useState(null);
  const [AddressState, setAddressState] = useState({
    name: "",
    phone: "",
    pin: "",
    city: "",
    address: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  const OrderDetailsOfUser = () =>
    `${"Name:" + AddressState.name +
      " Phone:" + AddressState.phone +
      " PIN:" + AddressState.pin +
      " City:" + AddressState.city +
      " Location:" + AddressState.address}`;

  const loadScript = (src) => {
    return new Promise((res) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        res(true);
      };
      script.onerror = () => {
        res(false);
      };
      document.body.appendChild(script);
    });
  };


  
  async function VerifySignatureRazorPay() {
    try {
      if (Raz) {
        const tk = Cookies.get("tk");
        console.log(Raz, "hdjkshdkjfh");
        const response = await axios.post(
          "http://localhost:5275/api/Order/payment",
          Raz,
          {
            headers: {
              Authorization: `Bearer ${tk}`,
            },
          }
        );
        return true;
      }
    } catch (err) {
      console.log("VerifySignatureRazorPay failed");
      return false;
    }
  }

  async function RazorPayApiCalling(_order_id) {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("You are offline");
        return false;
      }
      const options = {
        order_id: _order_id,
        name: "Puppy Pvt LTD",
        description: "Thank you for purchasing",
        handler: function (res) {
          setRaz({
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_order_id: res.razorpay_order_id,
            razorpay_signature: res.razorpay_signature,
          });
        },
        prefill: {
          name: usermail.name,
          email: usermail.email,
        },
      };
      console.log(options, "options");
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      return true;
    } catch (err) {
      return false;
    }
  }

  async function GetOrderId() {
    try {
      const tk = Cookies.get("tk");
      if (total > 0) {
        const priceObj = {
          price: total,
        };
        let ResponseCreateOrder = await axios.post(
          "http://localhost:5275/api/Order/order-create",
          priceObj,
          {
            headers: {
              Authorization: `Bearer ${tk}`,
            },
          }
        );
        return ResponseCreateOrder.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function TakeOrder() {
    try {
      if (total > 0) {
        const userId = Cookies.get("userId");
        const tk = Cookies.get("tk");
        const Order_Id = await GetOrderId();
        let IsEverithingSuccess = await RazorPayApiCalling(Order_Id);
        if (IsEverithingSuccess) {
          const isPaymentSucess = await VerifySignatureRazorPay();
          if (isPaymentSucess) {
            const orderDetails = {
              user_Id: userId,
              delivaryAddress: OrderDetailsOfUser(),
            };
            await axios.post(
              "http://localhost:5275/api/Order/place-Order",
              orderDetails,
              {
                headers: {
                  Authorization: `Bearer ${tk}`,
                },
              }
            );
            setModalShow(true);
            console.log("success");
          }
        }
      }
    } catch (err) {}
  }

  return (
    <div className="container paymentsection">
      <div className="row">
        <div className=".col-12 .col-sm-12 col-md-6 payment-inp-main">
          <div className="payment-inp">
            <p>Name:</p>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setAddressState({ ...AddressState, name: e.target.value })
              }
            />
            <p>Phone No</p>
            <input
              type="text"
              placeholder="Phone No"
              onChange={(e) =>
                setAddressState({ ...AddressState, phone: e.target.value })
              }
            />
            <p>PIN</p>
            <input
              type="text"
              placeholder="PIN Code"
              onChange={(e) =>
                setAddressState({ ...AddressState, pin: e.target.value })
              }
            />
            <p>City</p>
            <input
              type="text"
              placeholder="City"
              onChange={(e) =>
                setAddressState({ ...AddressState, city: e.target.value })
              }
            />
            <p>Address</p>
            <textarea
              rows={5}
              placeholder="Address"
              onChange={(e) =>
                setAddressState({ ...AddressState, address: e.target.value })
              }
            />
          </div>
        </div>
        <div className=".col-12 .col-sm-12 col-md-6 payment-inp-main2">
          <div className="payment-inp-main2-payment">
            <h3 style={{ color: "orange", marginBottom: "20px" }}>₹{total}</h3>
            <input type="radio" name="gatway" id="cashondelivery" />
            Cash on Delivery
            <br />
            <input type="radio" name="gatway" id="upi" />
            UPI
            <br />
            <input type="radio" name="gatway" id="netbanking" />
            Net Banking
            <br />
            <input type="radio" name="gatway" id="Debit-Credit" />
            Debit/Credit Card
            <br />
            <Button variant="warning" onClick={TakeOrder}>
              Proceed
            </Button>
          </div>
        </div>
      </div>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={() => setModalShow(false)}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "green", textAlign: "center" }}
          >
            Success
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{ color: "green" }}>Order Successfull</h4>
          <p>Your order will be delivered within 24 hours..</p>
        </Modal.Body>
        <Modal.Footer>
          <span onClick={() => navigate("/")}>
            <Button variant="success" onClick={() => setModalShow(false)}>
              Ok
            </Button>
          </span>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Payment;
