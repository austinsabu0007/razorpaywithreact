import axios from "axios";
import React, { useState, useEffect } from "react";
function App() {
  const user_name = "rzp_test_kI0EKfmFGUcey3";
  const pswd = "gP3rAmtgApSOfvZbYHDcQABT";
  const [orderid, setOrderid] = useState(""); // these the the values provided for post request
  const requestBody = {
    amount: 50000,
    currency: "INR",
  };
  useEffect(() => {
    const handleSubmit = async () => {
      //function used to sent post request for backend(serverside)
      try {
        const response = await axios.post("v1/orders", requestBody, {
          auth: {
            username: user_name,
            password: pswd,
          },
          headers: {
            "access-control-allow-origin": "*",
            "Content-Type": "application/json",
          },
        });
        console.log(response);

        setOrderid(response.data.id);
      } catch (error) {
        console.log(error);
      }

      paymentokay();
    };
    document.getElementById("nameit").onclick = function (e) {
      handleSubmit();
      e.preventDefault();
    };
  });

  const paymentokay = async () => {
    //client side script for razorpay window
    var options = {
      key: user_name, // Enter the Key ID generated from the Dashboard
      amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderid, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  return (
    <div>
      <input type="text" />
      <button id="nameit">pay</button>
    </div>
  );
}
export default App;
