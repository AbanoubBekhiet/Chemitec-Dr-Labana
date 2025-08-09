import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

export default function MainLayout() {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<ScrollToTop />
			<div className="flex-1">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
