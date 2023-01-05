import React, { useState } from "react";
import chairImg from "../../../assets/images/chair.png";
import bannerBg from "../../../assets/images/bg.png";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

const AppointmentBanner = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	return (
		<section className="my-16">
			<div
				className="hero"
				style={{
					backgroundImage: `url(${bannerBg})`,
					backgroundPosition: `center`,
					backgroundSize: `cover`,
					backgroundRepeat: "no-repeat",
					width: "100%",
				}}
			>
				<div className="hero-content flex-col lg:flex-row-reverse">
					<img
						src={chairImg}
						className="lg:w-1/2 rounded-lg shadow-2xl"
						alt=""
					/>
					<div className="mr-20">
						<DayPicker
							mode="single"
							selected={selectedDate}
							onSelect={setSelectedDate}
						/>
						<p>You have selected date: {format(selectedDate, "PPP")}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AppointmentBanner;
