import React, { useState } from 'react';
import axios, { Axios } from 'axios';
import {useHistory} from 'react-router-dom'

export default function Payment({ match }) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [appointmentData, setAppointmentData] = useState(null);


    const handlePaymentSuccess = async (response) => {
        console.log(response);
        try {
            let bodyData = new FormData();

            // we will send the response we've got from razorpay to the backend to validate the payment
            bodyData.append("response", JSON.stringify(response));
            const res = await axios.post(`${process.env.REACT_APP_API_URL}api/razorpay/payment/success/`, bodyData)
            console.log("Everything is OK!");
            // redirect to the appointment page
            if(res.status == 200){
                history.push(`/appointments/${res.data.appointment.id}/`)
            }

        } catch (error) {
            console.error(error?.response);
            history.goBack()
        }   
    };

    // this will load a script tag which will open up Razorpay payment card to make transactions
    const loadScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
    };
    const history = useHistory()
    const showRazorpay = async () => {
        const res = await loadScript();

        let bodyData = new FormData();

        // we will pass the amount and product name to the backend using form data
        bodyData.append("amount", amount.toString());
        bodyData.append("name", name);
        bodyData.append("appointment_id", match.params.id);
        let data = undefined
        try {
            data = await axios.post(`${process.env.REACT_APP_API_URL}api/razorpay/pay/`, bodyData)
            console.log(data);
            
        } catch (error) { 
            if(error?.response?.status === 400){
                history.goBack();
            }
        }


        // console.log(data)

        // in data we will receive an object from the backend with the information about the payment
        //that has been made by the user

        var options = {
            key_id: `${process.env.REACT_APP_RAZOR_KEY_ID}`,
            key_secret: `${process.env.REACT_APP_RAZOR_KEY_SECRET}`,
            amount: data?.data?.payment?.amount,
            currency: "INR",
            name: "Local Doctor",
            description: "Test teansaction",
            image: "", // add image url
            order_id: data?.data?.payment?.id,
            handler: function (response) {
                // we will handle success by calling handlePayment method and
                // will pass the response that we've got from razorpay
                handlePaymentSuccess(response);
            },
            prefill: {
                name: "User's name",
                email: "User's email",
                contact: "User's phone",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <>

            <div className="container" style={{ marginTop: "20vh" }}>
                <form>
                    <h1>Payment page</h1>

                    <div className="form-group">
                        <label htmlFor="name">Product name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Amount</label>
                        <input
                            type="text"
                            className="form-control"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </form>
                <button onClick={showRazorpay} className="btn btn-primary btn-block">
                    Pay with razorpay
                </button>
            </div>

        </>

    );
}
