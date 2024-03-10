import { Route, Routes, useNavigate } from "react-router-dom";
import "./component/css/App.css";
import Login from "./component/Login/Login";
import { createContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./component/User/SignUp/Signup";
import {
  validateEmail,
  validatePassword,
  validateCon_pass,
  validatePhone,
} from "./component/User/SignUp/Validate";
import Navbarmain from "./component/NavBar/Navbarmain";
import Main from "./component/User/UserHome/Main";
import SingleItem from "./component/SinglePageProduct/SingleItem";
import Cart from "./component/User/Cart/Cart";
import Payment from "./component/User/Payment/Payment";
import Search from "./component/User/Search/Search";
import AdminMain from "./component/Admin/AdminMain";
import Users from "./component/Admin/Users";
import Products from "./component/Admin/Products";
import adminlogo from "./component/Admin/pictures/users.png";
import logo1 from "./component/images/puppy.png";
import Singleuser from "./component/Admin/Singleuser";
import Addproduct from "./component/Admin/Addproduct";
import Editproduct from "./component/Admin/Editproduct";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Notfound } from "./component/User/Error/Notfound";
import { Footer } from "./component/Footer/Footer";
import { Button } from "react-bootstrap";
import { IoLogOut } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import Category from "./component/User/Category-Routes/Category";
import EmptyCart from "./component/User/Cart/EmptyCart";
import { TbTruckDelivery } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import WishList from "./component/User/WishList/WishList";
import Order from "./component/User/Order/Order";

export const newContext = createContext();

function App() {
  const [state, setState] = useState([]);
  const [cart, addtoCart] = useState([]);
  const [wishlists, setWishLists] = useState([]);

  const [displaybool, setDisplaybool] = useState(false);
  const [displaylogin, setdisplaylogin] = useState(false);
  const [search, setSearch] = useState("");
  const [fetchControll, setFetchControll] = useState(true);
  const [isCartfetchSuccess, isSetCartfetch] = useState(false);
  const [displaycart, setDisplaycart] = useState(false);

  const [adminlogin, setAdminlogin] = useState(false);
  const [inpemail, setemail] = useState("");
  const [inppass, setPass] = useState("");
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);

  // -------------------------------------------------offcanvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //-----------------------------------------------------

  const [usermail, setUsermail] = useState(null);

  const fetchUserWishList = async () => {
    try {
      const tk = Cookies.get("tk");
      const Request = await axios.get("http://localhost:5275/api/WishList", {
        headers: {
          Authorization: `Bearer ${tk}`,
        },
      });
      setWishLists(Request.data);
      console.log(Request.data);
    } catch (err) {}
  };

  const removeFromUserWishList = async (Product_Id) => {
    try {
      const tk = Cookies.get("tk");
      await axios.delete("http://localhost:5275/api/WishList", {
        data: {
          product_Id: Product_Id,
        },
        headers: {
          Authorization: `Bearer ${tk}`,
        },
      });
      await fetchUserWishList();
    } catch {}
  };

  const addtoUserWishlist = async (Product_Id) => {
    const tk = Cookies.get("tk");
    const User_Id = Cookies.get("userId");
    try {
      const wishlistAddobj = {
        user_Id: User_Id,
        product_Id: Product_Id,
      };
      await axios.post(
        "http://localhost:5275/api/WishList/AddWishList",
        wishlistAddobj,
        {
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        }
      );
      await fetchUserWishList();
    } catch (err) {
      alert("fail");
    }
  };

  const userCartfetch = async (Isneeded = false) => {
    try {
      const token = Cookies.get("tk");
      const response = await axios.get(
        "http://localhost:5275/api/Cart/UserCart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.length == 0 && Isneeded) {
        navigate("/emptycart");
      }
      addtoCart(response.data);
      setDisplaycart(true);
    } catch (err) {
      if (Isneeded) {
        navigate("/emptycart");
      }
    }
  };

  const setLogin = async (isneedlogin = false) => {
    try {
      const Token = Cookies.get("tk");
      if (Token) {
        const decoded = jwtDecode(Token);
        const role =
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        const userObj = await axios.get("http://localhost:5275/api/User/User", {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        await userCartfetch();
        if (role === "admin") {
          setUsermail(userObj.data);
          setAdminlogin(true);
          setdisplaylogin(true);
          setFetchControll(false);
          navigate("/adminmain");
        } else {
          setUsermail(userObj.data);
          setdisplaylogin(true);
          if (isneedlogin) {
            navigate("/");
          }
        }
      } else {
        const data = {
          email: inpemail.trim(),
          password: inppass,
        };
        let request = await axios.post(
          "http://localhost:5275/api/User/Login",
          data
        );
        if (request.data) {
          Cookies.set("tk", request.data.token, { expires: 1 });
          Cookies.set("userId", request.data.id, { expires: 1 });
          setLogin(true);
        }
      }
    } catch (err) {
      if (isneedlogin) {
        if (err.response.status === 401) {
          alert("Your Account is Blocked");
        } else {
          alert("No User Found");
        }
      }
    }
  };

  const Rgister = async (
    uname,
    mail,
    phone,
    address,
    pass,
    conpass,
    selectedImage
  ) => {
    if (
      validateEmail(mail) &&
      validatePassword(pass) &&
      validateCon_pass(pass, conpass) &&
      validatePhone(phone)
    ) {
      const testformData = new FormData();
      testformData.append("user.Name", uname);
      testformData.append("user.Email", mail);
      testformData.append("user.Password", pass);
      testformData.append("user.Place", address);
      testformData.append("user.Phone", phone);
      testformData.append("image", selectedImage);

      try {
        let request = await fetch("http://localhost:5275/api/User/Register", {
          method: "POST",
          body: testformData,
        });

        let response = await request.json();
        navigate("/login");
      } catch (error) {
        alert("User Already Exist", error);
      }
    }
  };

  function LogoutHandler() {
    addtoCart([]);
    setUsermail(null);
    setdisplaylogin(false);
    setAdminlogin(false);
    Cookies.remove("tk");
    Cookies.remove("userId");
    navigate("/");
    handleClose();
  }

  useEffect(() => {
    const tk = Cookies.get("tk");
    if(tk){
      setLogin();
      fetchUserWishList();
    }
    console.log("fetch set user triggered");
  }, []);

  return (
    <div className="App">
      <Navbarmain
        displaybool={displaybool}
        setSearch={setSearch}
        state={state}
        displaylogin={displaylogin}
        usermail={usermail}
        setUsermail={setUsermail}
        cart={cart}
        addtoCart={addtoCart}
        setdisplaylogin={setdisplaylogin}
        adminlogin={adminlogin}
        setShow={setShow}
      />

      <newContext.Provider
        value={{
          displaybool,
          setDisplaybool,
          setemail,
          setPass,
          state,
          setShow,
          setState,
          setFetchControll,
          addtoCart,
          userCartfetch,
          cart,
          usermail,
          setLogin,
          adminlogin,
          isCartfetchSuccess,
          displaycart,
          setDisplaycart,
          fetchUserWishList,
          wishlists,
          setWishLists,
          addtoUserWishlist,
          removeFromUserWishList,
        }}
      >
        <Routes>
          <Route path="/login" element={<Login setLogin={setLogin} />} />
          <Route path="/signup" element={<Signup Rgister={Rgister} />} />
          <Route path="/" element={<Main />} />
          <Route path="/:category" element={<Category />} />
          <Route
            path="/:category/:item_id"
            element={<SingleItem state={state} />}
          />
          <Route
            path="/product/:item_id"
            element={<SingleItem state={state} />}
          />
          <Route
            path="/cart"
            element={<Cart cart={cart} setTotal={setTotal} total={total} />}
          />
          <Route path="/order" element={<Order />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route
            path="/payment"
            element={<Payment usermail={usermail} total={total} />}
          />
          <Route path="/adminmain" element={<AdminMain />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<Singleuser />} />

          <Route path="/products" element={<Products state={state} />} />
          <Route path="/products/:id" element={<Editproduct />} />
          <Route path="/products/addproducts" element={<Addproduct />} />
          <Route path="/emptycart" element={<EmptyCart />} />
          <Route path="/search" element={<Search search={search} />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </newContext.Provider>
      <Footer adminlogin={adminlogin} />

      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {usermail ? (
            <>
              <div
                style={{
                  marginTop: "120px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "3px solid orange",
                }}
              >
                <img
                  src={usermail?.profile_Photo}
                  style={{ width: "110px", borderRadius: "50%" }}
                  className="img-fluid"
                />
              </div>
              <br />
              <h6>{usermail.name}</h6>
              <p style={{ margin: 0 }}>{usermail.email}</p>
              <p style={{ color: "gray", margin: 0, paddingBottom: "10px" }}>
                {usermail.place}
              </p>
              <span className="d-flex">
                {!adminlogin && (
                  <Button variant="light" title="Order Details" onClick={()=>navigate("/order")}>
                    <TbTruckDelivery style={{ fontSize: "1.2em" }} />
                  </Button>
                )}
                <Button
                  variant="light"
                  title="Settings"
                  style={{ marginLeft: "2px", marginRight: "2px" }}
                >
                  <CiSettings style={{ fontSize: "1.2em" }} />
                </Button>
                <Button
                  title="Logout"
                  variant="light"
                  className="d-flex"
                  style={{ alignItems: "center" }}
                  onClick={LogoutHandler}
                >
                  <IoLogOut style={{ fontSize: "1.2em" }} />
                </Button>
              </span>
            </>
          ) : (
            <></>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default App;
