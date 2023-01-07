import React from "react";
import chairImg from "../../../assets/images/chair.png";
import bannerBg from "../../../assets/images/bg.png";
import { DayPicker } from "react-day-picker";

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
	return (
		<section className="my-16 sm:mx-10">
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
					<div className="lg:mr-20">
						<DayPicker
							mode="single"
							selected={selectedDate}
							onSelect={setSelectedDate}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AppointmentBanner;
