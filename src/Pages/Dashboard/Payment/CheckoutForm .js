import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ booking }) => {
	const [cardError, setCardError] = useState("");
	const [success, setSuccess] = useState("");
	const [processing, setProcessing] = useState(false);
	const [transactionId, setTransactionId] = useState("");
	const [clientSecret, setClientSecret] = useState("");
	const stripe = useStripe();
	const elements = useElements();
	const { _id, price, email, patientName } = booking;

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("http://localhost:5000/create-payment-intent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${localStorage.getItem("asscessToken")}`,
			},
			body: JSON.stringify({ price }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [price]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);

		if (card === null) {
			return;
		}

		const { error } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (error) {
			console.log(error);
			setCardError(error.message);
		} else {
			setCardError("");
		}

		setSuccess("");
		setProcessing(true);
		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						name: patientName,
						email: email,
					},
				},
			});

		if (confirmError) {
			setCardError(confirmError.message);
			return;
		}

		if (paymentIntent.status === "succeeded") {
			const payment = {
				patientName,
				email,
				transactionId: paymentIntent.id,
				bookingId: _id,
				price,
			};

			fetch("http://localhost:5000/payments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `bearer ${localStorage.getItem("asscessToken")}`,
				},
				body: JSON.stringify(payment),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					if (data.insertedId) {
						setSuccess("Congrats! your payment completed");
						setTransactionId(paymentIntent.id);
					}
				});
		}
		setProcessing(false);
		console.log("paymentIntent", paymentIntent);
	};
	return (
		<form onSubmit={handleSubmit}>
			<CardElement
				options={{
					style: {
						base: {
							fontSize: "16px",
							color: "#424770",
							"::placeholder": {
								color: "#aab7c4",
							},
						},
						invalid: {
							color: "#9e2146",
						},
					},
				}}
			/>
			<button
				className="btn btn-primary text-white mt-6 btn-sm"
				type="submit"
				disabled={!stripe || !clientSecret || processing}
			>
				Pay
			</button>
			<p className="text-red-500 mt-3">{cardError}</p>
			{success && (
				<div>
					<p className="text-green-500">{success}</p>
					<p>
						Transaction Id: <span className="font-bold">{transactionId}</span>
					</p>
				</div>
			)}
		</form>
	);
};

export default CheckoutForm;
