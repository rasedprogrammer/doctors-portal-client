import React from "react";
import doctor from "../../../assets/images/doctor-small.png";
import appointment from "../../../assets/images/appointment.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const MakeAppointment = () => {
	return (
		<section
			className="text-white lg:mt-64"
			style={{ backgroundImage: `url(${appointment})` }}
		>
			<div className="hero mt-6">
				<div className="hero-content flex-col lg:flex-row pb-0">
					<img
						src={doctor}
						className="lg:w-1/2 -mt-32 hidden md:block lg:block rounded-lg shadow-2xl mr-24"
						alt=""
					/>
					<div>
						<h3 className="text-xl font-bold text-success">Appointment</h3>
						<h1 className="text-4xl font-bold">Make an appointment Today</h1>
						<p className="py-6">
							It is a long established fact that a reader will be distracted by
							the readable content of a page when looking at its layout. The
							point of using Lorem Ipsumis that it has a more-or-less normal
							distribution of letters,as opposed to using 'Content here, content
							here', making it look like readable English. Many desktop
							publishing packages and web page
						</p>
						<PrimaryButton>Get Appointment</PrimaryButton>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MakeAppointment;
