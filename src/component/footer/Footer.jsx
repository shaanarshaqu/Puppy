import * as React from "react";

export const MyComponent=(props)=>{
    return (
        <>
          <div className="div">
            <div className="div-2">
              <div className="div-3">
                <div className="div-4">
                  <div className="div-5" style={{fontSize:"20px"}}>Pu<span style={{color:"orange"}}>pp</span>y</div>
                  <div className="div-6">
                    About <br />
                    Features <br />
                    Works <br />
                    Career{" "}
                  </div>
                </div>
                <div className="div-7">
                  <div className="div-8">Help</div>
                  <div className="div-9">
                    Customer Support
                    <br />
                    Delivery Details
                    <br />
                    Terms & Conditions
                    <br />
                    Privacy Policy
                  </div>
                </div>
                <div className="div-10">
                  <div className="div-11">Resources</div>
                  <div className="div-12">
                    Free eBooks
                    <br />
                    Development Tutorial
                    <br />
                    How to - Blog
                    <br />
                    Youtube Playlist
                  </div>
                </div>
                <div className="div-13">
                  <div className="div-14">Extra Links</div>
                  <div className="div-15">
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
              <div className="div-16">
                <div className="div-17">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e35c38dc093e88c16e13c83986e1bc900ab323ec22dccc21d9e9151426c5c4c?"
                    className="img"
                  />
                  <div className="div-18">
                    Privacy Policy Terms & Conditions Support
                  </div>
                  <div className="div-18">© Copyright 2024, All Rights Reserved</div>
                </div>
              </div>
            </div>
          </div>
          <style jsx>{`
            .div {
              background-color: #fff;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 49px 60px;
            }
            @media (max-width: 991px) {
              .div {
                padding: 0 20px;
              }
            }
            .div-2 {
              display: flex;
              margin-top: 32px;
              width: 100%;
              max-width: 1309px;
              flex-direction: column;
            }
            @media (max-width: 991px) {
              .div-2 {
                max-width: 100%;
              }
            }
            .div-3 {
              display: flex;
              padding-right: 30px;
              align-items: flex-start;
              justify-content: space-between;
              gap: 20px;
            }
            @media (max-width: 991px) {
              .div-3 {
                max-width: 100%;
                flex-wrap: wrap;
                padding-right: 20px;
              }
            }
            .div-4 {
              align-self: stretch;
              display: flex;
              flex-direction: column;
            }
            .div-5 {
              color: #191d23;
              white-space: nowrap;
              font: 700 31.5px Inter, sans-serif;
            }
            @media (max-width: 991px) {
              .div-5 {
                white-space: initial;
              }
            }
            .div-6 {
              color: #52525b;
              margin-top: 44px;
              font: 400 14px/44px Inter, -apple-system, Roboto, Helvetica,
                sans-serif;
            }
            @media (max-width: 991px) {
              .div-6 {
                margin-top: 40px;
              }
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
            @media (max-width: 991px) {
              .div-9 {
                margin-top: 40px;
              }
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
            @media (max-width: 991px) {
              .div-12 {
                margin-top: 40px;
              }
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
            @media (max-width: 991px) {
              .div-15 {
                margin-top: 40px;
              }
            }
            .div-16 {
              display: flex;
              margin-top: 99px;
              width: 100%;
              align-items: start;
              justify-content: space-between;
              gap: 20px;
            }
            @media (max-width: 991px) {
              .div-16 {
                max-width: 100%;
                flex-wrap: wrap;
                margin-top: 40px;
              }
            }
            .div-17 {
              display: flex;
              align-items: start;
              justify-content: space-between;
              gap: 20px;
            }
            @media (max-width: 991px) {
              .div-17 {
                max-width: 100%;
                flex-wrap: wrap;
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
}

