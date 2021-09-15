import React, { useState, useContext } from "react";
import DoneIcon from "@material-ui/icons/Done";
import { UserStates } from "../PaymentPage";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../../App";
import CartProduct2 from "../cartProduct2";
import {
  useHistory
} from 'react-router-dom'
import logo from '../../../static/images/undraw_No_data_re_kwbl.svg'

const Order = () => {
  const history = useHistory();
  const {
    payOrder,
    email,
    setPayDeliver,
    setPayLogin,
    setPayOrder,
    setPayOption,
  } = useContext(UserStates);
  const { orderSummary } = useContext(UserContext);
  const [col, setCol] = useState(true);
  const [email2, setEmail2] = useState("");

  const change = () => {
    setPayDeliver(false);
    setPayOrder(true);
    setPayLogin(false);
    setPayOption(false);
    setCol(true);
  };

  const next = () => {
    setPayLogin(false);
    setPayDeliver(false);
    setEmail2(email);
    setPayOption(true);
    setPayOrder(false);

    // setCol(false)
  };

  return (
    <>
      <div className="pay_main">
        <div
          className="pay_head"
          style={{
            backgroundColor: col && payOrder ? "#2874f0" : "white",
          }}
        >
          <div className="first_div">
            <span
              style={{
                color: col && payOrder ? "white" : "black",
              }}
            >
              3
            </span>
            <div className="second_div">
              <span
                style={{
                  color: col && payOrder ? "white" : "black",
                }}
                className="header"
              >
                order summary{" "}
                <span
                  className="free"
                  style={{
                    display: payOrder || email2 === "" ? "none" : "inline",
                  }}
                >
                  {" "}
                  <DoneIcon fontSize="small" />{" "}
                </span>
              </span>
              <span
                style={{
                  display: payOrder || email2 === "" ? "none" : "inline",
                }}
                className="head_foot"
              >
                {orderSummary.length} ITEMS
              </span>
            </div>
          </div>
          <div
            className="pay_btn"
            style={{
              display: payOrder || email2 === "" ? "none" : "flex",
            }}
          >
            <Button variant="outlined" color="primary" onClick={change}>
              change
            </Button>
          </div>
        </div>
        <div
          className="pay_body"
          style={{
            display: payOrder ? "block" : "none",
          }}
        >
          <div>
            <div
              className="order_summary"
              style={{
                backgroundColor: "white",
                display:orderSummary.length===0?'none':'block'
              }}
            >
              {orderSummary.map((e) => {
                return <CartProduct2 obj={e} />;
              })}

              <div
                className="pay_head"
                style={{
                  marginTop: "1rem",
                  borderTop: "1px solid  rgba(255, 255, 255, 0.12)",
                }}
              >
                <div className="first_div">
                  <span></span>
                  <div className="second_div">
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                      }}
                    >
                      Order Confirmation email will be sent to{" "}
                      <span
                        style={{
                          fontWeight: "900",
                          margin: "0 0.5rem ",
                        }}
                      >
                        {email}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="deliver_here">
                  <button onClick={next}> CONTINUE</button>
                </div>
              </div>
            </div>
            <div className='empty_cart' style={{
                        display:orderSummary.length===0?'flex':'none',
                        backgroundColor:'white'
                    }}>
                        <div className="empty_container">
                            <img src={logo} alt="" />
                            <h5>Your Order Summary is empty!</h5>
                            <h6>Add items to it now.</h6>
                            <div className="back">
                                <button onClick={()=>history.push('/cart')} >Go To Cart</button>
                            </div>
                        </div>
                    </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
