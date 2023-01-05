import React from "react";
import { Link } from "react-router-dom";
import footerImg from "../../assets/images/footer.png";

const Footer = () => {
	return (
		<footer
			className="p-10"
			style={{
				backgroundImage: `url(${footerImg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="footer">
				<div>
					<span className="footer-title">Services</span>
					<Link className="link link-hover">Branding</Link>
					<Link className="link link-hover">Design</Link>
					<Link className="link link-hover">Marketing</Link>
					<Link className="link link-hover">Advertisement</Link>
				</div>
				<div>
					<span className="footer-title">Company</span>
					<Link className="link link-hover">About us</Link>
					<Link className="link link-hover">Contact</Link>
					<Link className="link link-hover">Jobs</Link>
					<Link className="link link-hover">Press kit</Link>
				</div>
				<div>
					<span className="footer-title">Legal</span>
					<Link className="link link-hover">Terms of use</Link>
					<Link className="link link-hover">Privacy policy</Link>
					<Link className="link link-hover">Cookie policy</Link>
				</div>
			</div>
			<div className="mt-16 text-center">
				<p>
					Copyright © {new Date().getFullYear()} - All right reserved by{" "}
					<span className="text-success font-semibold">Doctors Portal Ltd</span>
					.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
