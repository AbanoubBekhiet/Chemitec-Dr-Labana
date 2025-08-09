import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

export default function MainLayout() {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			{/* Scroll Restoration */}
			<ScrollToTop />
			{/* دا اللي هيظهر فيه كل صفحات الراوت */}
			<div className="flex-1">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
