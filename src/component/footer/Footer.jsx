import * as React from "react";

export const Footer = (props) => {
  return (
    <>
      {!props.adminlogin ? (
        <div className="container-fluid">
          <div className="row" style={{ paddingBottom: "20px" }}>
            <div
              className="col-6 col-md-3 d-flex"
              style={{ justifyContent: "center" }}
            >
              <div className="div-6" style={{ width: "50%" }}>
                <strong style={{ fontSize: "20px" }}>
                  Pu<span style={{ color: "orange" }}>pp</span>y
                </strong>
                <br />
                About <br />
                Features <br />
                Works <br />
                Career{" "}
              </div>
            </div>
            <div
              className="col-6 col-md-3 d-flex"
              style={{ justifyContent: "center" }}
            >
              <div className="div-9">
                <div className="div-8">Help</div>
                Customer Support
                <br />
                Delivery Details
                <br />
                Terms & Conditions
                <br />
                Privacy Policy
              </div>
            </div>
            <div
              className="col-6 col-md-3 d-flex"
              style={{ justifyContent: "center" }}
            >
              <div className="div-12">
                <div className="div-11">Resources</div>
                Free eBooks
                <br />
                Development Tutorial
                <br />
                How to - Blog
                <br />
                Youtube Playlist
              </div>
            </div>
            <div
              className="col-6 col-md-3 d-flex"
              style={{ justifyContent: "center" }}
            >
              <div className="div-15">
                <div className="div-14">Extra Links</div>
                Customer Support
                <br />
                Delivery Details
                <br />
                Terms & Conditions
                <br />
                Privacy Policy
              </div>
            </div>
          </div>
          <div className="row" style={{ paddingBottom: "100px" }}>
            <div
              className="div-18 col-6 d-flex"
              style={{ justifyContent: "center" }}
            >
              Privacy Policy Terms & Conditions Support
            </div>
            <div
              className="div-18 col-6 d-flex"
              style={{ justifyContent: "center" }}
            >
              © Copyright 2024, All Rights Reserved
            </div>
            <div className="col-12 d-flex" style={{ justifyContent: "center" }}>
              <div className="div-17" style={{ paddingTop: "50px" }}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e35c38dc093e88c16e13c83986e1bc900ab323ec22dccc21d9e9151426c5c4c?"
                  className="img"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid" style={{backgroundColor:"black",color:"white"}}>
          <div className="row" style={{ paddingBottom: "20px" }}>
            <div
              className="col-6 col-md-3 d-flex"
              style={{ justifyContent: "center" }}
            >
              <div className="div-6" style={{ width: "50%" ,color:"white"}}>
                <strong style={{ fontSize: "20px",color:"white" }}>
                  Pu<span style={{ color: "orange" }}>pp</span>y
                </strong>
                <br />
                About <br />
                Features <br />
                Works <br />
                Career{" "}
              </div>
            </div>
            <div
              className="col-6 col-md-3 d-flex"
              style={{ justifyContent: "center" }}
            >
              <div className="div-9" style={{color:"white"}}>
                <div className="div-8" style={{color:"white"}}>Help</div>
                Customer Support
                <br />
                Delivery Details
                <br />
                Terms & Conditions
                <br />
                Privacy Policy
              </div>
            </div>
            <div
              className="col-6 col-md-3 d-flex"
              style={{ justifyContent: "center" }}
            >
              <div className="div-12" style={{color:"white"}}>
                <div className="div-11" style={{color:"white"}}>Resources</div>
                Free eBooks
                <br />
                Development Tutorial
                <br />
                How to - Blog
                <br />
                Youtube Playlist
              </div>
            </div>
            <div
              className="col-6 col-md-3 d-flex"
              style={{ justifyContent: "center" }}
            >
              <div className="div-15" style={{color:"white"}}>
                <div className="div-14" style={{color:"white"}}>Extra Links</div>
                Customer Support
                <br />
                Delivery Details
                <br />
                Terms & Conditions
                <br />
                Privacy Policy
              </div>
            </div>
          </div>
          <div className="row" style={{ paddingBottom: "100px" }}>
            <div
              className="div-18 col-6 d-flex"
              style={{ justifyContent: "center",color:"lightgray" }}
            >
              Privacy Policy Terms & Conditions Support
            </div>
            <div
              className="div-18 col-6 d-flex"
              style={{ justifyContent: "center" ,color:"lightgray"}}
            >
              © Copyright 2024, All Rights Reserved
            </div>
            <div className="col-12 d-flex" style={{ justifyContent: "center" }}>
              <div className="div-17" style={{ paddingTop: "50px" }}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e35c38dc093e88c16e13c83986e1bc900ab323ec22dccc21d9e9151426c5c4c?"
                  className="img"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
            .div {
              background-color: #fff;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 49px 60px;
            }
            
            
            .div-2 {
              display: flex;
              margin-top: 32px;
              width: 100%;
              max-width: 1309px;
              flex-direction: column;
            }
            
            .div-3 {
              display: flex;
              padding-right: 30px;
              align-items: flex-start;
              justify-content: space-between;
              gap: 20px;
            }
            
            .div-4 {
              align-self: stretch;
              display: flex;
              flex-direction: column;
            }
            
            
            .div-6 {
              color: #52525b;
              margin-top: 44px;
              font: 400 14px/44px Inter, -apple-system, Roboto, Helvetica,
                sans-serif;
            }
            
            .div-7 {
              align-self: start;
              display: flex;
              margin-top: 12px;
              flex-direction: column;
            }
            .div-8 {
              color: #191d23;
              font: 600 16px/175% Inter, -apple-system, Roboto, Helvetica,
                sans-serif;
            }
            .div-9 {
              color: #52525b;
              margin-top: 45px;
              font: 400 14px/44px Inter, -apple-system, Roboto, Helvetica,
                sans-serif;
            }
            
            .div-10 {
              align-self: start;
              display: flex;
              margin-top: 12px;
              flex-direction: column;
            }
            .div-11 {
              color: #191d23;
              font: 600 16px/175% Inter, -apple-system, Roboto, Helvetica,
                sans-serif;
            }
            .div-12 {
              color: #52525b;
              margin-top: 48px;
              font: 400 14px/44px Inter, -apple-system, Roboto, Helvetica,
                sans-serif;
            }
            
            .div-13 {
              align-self: start;
              display: flex;
              margin-top: 12px;
              flex-direction: column;
            }
            .div-14 {
              color: #191d23;
              font: 600 16px/175% Inter, -apple-system, Roboto, Helvetica,
                sans-serif;
            }
            .div-15 {
              color: #52525b;
              margin-top: 48px;
              font: 400 14px/44px Inter, -apple-system, Roboto, Helvetica,
                sans-serif;
            }
            
            .div-16 {
              display: flex;
              margin-top: 99px;
              width: 100%;
              align-items: start;
              justify-content: space-between;
              gap: 20px;
            }
            
            .div-17 {
              display: flex;
              align-items: start;
              justify-content: space-between;
              gap: 20px;
            }
            
            }
            .img {
              aspect-ratio: 9.43;
              object-fit: contain;
              object-position: center;
              width: 132px;
              overflow: hidden;
              max-width: 100%;
            }
            .div-18 {
              color: #52525b;
              flex-grow: 1;
              flex-basis: auto;
              font: 400 13px/154% Inter, -apple-system, Roboto, Helvetica,
                sans-serif;
            }
            .div-19 {
              color: #52525b;
              margin-top: 5px;
              flex-grow: 1;
              flex-basis: auto;
              font: 400 16px/162.5% Inter, -apple-system, Roboto, Helvetica,
                sans-serif;
            }
          `}</style>
    </>
  );
};
