import React, { useState, useEffect } from "react";
import "./CartContainer.css";
import { createOrder } from "../../../api/userAction";

import io from "socket.io-client";

const CartContainer = ({ cart, table_number, setCart, handleChange }) => {
  const [price, setPrice] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const socket = io("http://202.52.248.120:8000");

  const handlePrice = () => {
    let ans = 0;
    cart?.map((item) => (ans += item.quantity * item.price));   //question mark require to increase price
    setPrice(ans);
  };

  const handleRemove = (menu_id) => {
    const arr = cart.filter((item) => item.menu_id !== menu_id);
    setCart(arr);
  };

  const handlePopupDone = () => {
    setShowPopup(true);
  };

  const handleDone = (e) => {
    e.preventDefault();
   
setShowThankYou(true);
    // Prepare the order data to be sent to the backend
    const cartData = {
      cartItems: cart.map((item) => ({
        menu_id: item.menu_id,
        quantity: item.quantity,
      })),

      table_number: table_number[0],
    };
    
    createOrder(cartData)
      .then((response) => {
        // console.log(response.data);
        setShowPopup(false); // Close the confirmation popup after confirming the order
       
        
        setCart([]);       
      
  })        
      .catch((error) => {
        console.error("Error:", error);
      });
      
    socket.emit("order", {cart, table_number }); // Emit a socket event with the order details
    // console.log("values--------", values)
    window.location.href = "/";
  };

 
  // useEffect(() => {
  //   const generatedCode = '456'; // Generate the code here
  //   setCodenum(generatedCode); // Set the generated code to the state
  //   const generatedTableNumber = 2; // Generate the table number here
  //   setTableNumber(generatedTableNumber);
  // }, []);


  useEffect(()=>{
      handlePrice();
  })
  if (cart.length === 0) {
    return <p className='empty'> Your cart is empty. </p>;
  }
 

  return (
    <article>
      {cart?.map((item) => (
        <div className="cart_box">
          <div className="cart_img">
            <p>{item.item_name}</p>
          </div>
          <div className="quantity">
            <button onClick={() => handleChange(item, +1)}> + </button>
            <button>{item.quantity}</button>
            <button onClick={() => handleChange(item, -1)}> - </button>
          </div>
          <div>
            <span>Rs.{item.price}</span>
            <button onClick={() => handleRemove(item.menu_id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total Price of your Cart</span>
        <span>Rs - {price}</span>
      </div>
      <br></br>
      <button className="done-button" onClick={handlePopupDone}>
        Continue
      </button>
    
      {showPopup && (
        <div className="popup">
          <div className="popup-container">
            <p>
            <span>Are you sure you want to confirm this order?</span>

              {/* <span>There is your code:</span> <br></br>
              <span>{values}</span>
              <br></br>
              <span>Please save or take a screenshot of it.</span> */}
            </p>

            <button
              type="submit"
              className="done-button"
              onClick={handleDone}
            >
              confirm
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
  {/* {showThankYou && (
        <div className="thank-you">
          <p>Thank you. Your order is successfully placed...</p>
        </div>
      )} */}
    </article>
  );
};

export default CartContainer;
