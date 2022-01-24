import axios from "axios";

    export const handlePaymentSuccess = async (response, onSuccess) => {
        console.log(response);
        try {
            let bodyData = new FormData();

            // we will send the response we've got from razorpay to the backend to validate the payment
            bodyData.append("response", JSON.stringify(response));
            const res = await axios.post(`${process.env.REACT_APP_API_URL}api/razorpay/payment/success/`, bodyData)
            console.log("Everything is OK!");
            // redirect to the appointment page
            if(res.status == 200){
                onSuccess()
                return true
            }

        } catch (error) {
            console.error(error?.response);
        }   
    };

    // this will load a script tag which will open up Razorpay payment card to make transactions
    export const loadScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
    };
    export const showRazorpay = async (id, onSuccess) => {
        const res = await loadScript();

        let bodyData = new FormData();

        // we will pass the amount and product name to the backend using form data 
        bodyData.append("appointment_id", id);
        let data = undefined
        try {
            data = await axios.post(`${process.env.REACT_APP_API_URL}api/razorpay/pay/`, bodyData)
            console.log(data);
            
        } catch (error) { 
            console.log(error.response);
            if(error?.response?.status === 400){
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
            handler: async function (response) {
                // we will handle success by calling handlePayment method and
                // will pass the response that we've got from razorpay
                await handlePaymentSuccess(response, onSuccess);
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

        var rzp1 = await new window.Razorpay(options);
        await rzp1.open();
    };
