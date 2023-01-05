import React from "react";
import chairImg from "../../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";

const AppointmentBanner = () => {
	return (
		<section>
			<div className="hero ">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<img
						src={chairImg}
						className="max-w-sm rounded-lg shadow-2xl"
						alt=""
					/>
					<div>
						<DayPicker />
					</div>
				</div>
			</div>
		</section>
	);
};

export default AppointmentBanner;
