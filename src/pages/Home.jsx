// src/pages/Home.jsx
import React from "react";
import { Helmet } from "react-helmet";
import HeroSection from "../components/HeroSection";
import StatsCounters from "../components/StatsCounters";
import InfoSlider from "../components/InfoSlider";
import ProductsGallerySlider from "../components/ProductsGallerySlider";
import ProductsSliderSection from "../components/ProductsSliderSection";
import OurBrands from "../components/OurBrands";
import IndustriesWeServe from "../components/IndustriesWeServe";
import CertificatesSection from "../components/CertificatesSection";
import TeamSection from "../components/TeamSection";
import ContactUsSection from "../components/ContactUsSection";
import { t, useLang } from "../context/LangContext";

export default function Home() {
	const { lang } = useLang();

	return (
		<>
			<Helmet>
				<title>Chemitec Dr-Labana | Specialized Raw Materials</title>
				<meta
					name="description"
					content="Specialized raw materials for advanced food manufacturing. Quality you can trust."
				/>
			</Helmet>

			{/* هيرو full-width */}
			<HeroSection />

			{/* أي سكشن تاني تحطه هنا داخل container */}
			<div className="container py-16 bg-white">
				<StatsCounters />
			</div>
			<div className="container  bg-white">
				<InfoSlider />
			</div>
			<div className="container py-12  bg-white">
				<ProductsGallerySlider />
			</div>
			<div className="container ">
				<ProductsSliderSection />
			</div>
			<div className="container  ">
				<OurBrands />
			</div>
			<div className="container  ">
				<IndustriesWeServe />
			</div>
			<div className="container  ">
				<CertificatesSection />
			</div>
			<div className="container  ">
				<h2 className="text-5xl md:text-6xl font-bold mb-3 text-center leading-tight mt-5">
					{t(
						{
							en: "Our team",
							ar: "فريقنا",
							fr: "Notre équipe",
						},
						lang
					)}
				</h2>
				<TeamSection />
			</div>
			<div className="container  ">
				<ContactUsSection />
			</div>
		</>
	);
}
