import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosServices from "../utils/axios";
import { t, useLang } from "../context/LangContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://chemitic.surgi-web.com";

export default function OurBrands() {
	const { lang } = useLang();
	const [brands, setBrands] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	function goToBrands() {
		navigate("brandsPage");
	}
	useEffect(() => {
		let ignore = false;
		setLoading(true);
		axiosServices
			.get("/brands")
			.then((res) => {
				if (!ignore) {
					setBrands(Array.isArray(res.data.data) ? res.data.data : []);
					setLoading(false);
				}
			})
			.catch(() => {
				if (!ignore) {
					setError(
						t(
							{
								en: "Error loading brands.",
								ar: "حدث خطأ أثناء تحميل العلامات التجارية.",
								fr: "Erreur lors du chargement des marques.",
							},
							lang
						)
					);
					setLoading(false);
				}
			});
		return () => {
			ignore = true;
		};
	}, [lang]);

	return (
		<section className="py-12 bg-white">
			<h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
				{t(
					{
						en: "Our Brands",
						ar: "علاماتنا التجارية",
						fr: "Nos marques",
					},
					lang
				)}
			</h2>
			<div onClick={goToBrands} className="flex flex-wrap justify-center gap-8 md:gap-14 items-center">
				{loading ? (
					<div className="py-10 text-gray-400 text-center w-full">
						{t(
							{ en: "Loading...", ar: "جارٍ التحميل...", fr: "Chargement..." },
							lang
						)}
					</div>
				) : error ? (
					<div className="py-10 text-red-500 text-center w-full">{error}</div>
				) : !brands.length ? (
					<div className="py-10 text-gray-400 text-center w-full">
						{t(
							{
								en: "No brands found.",
								ar: "لا توجد علامات تجارية.",
								fr: "Aucune marque trouvée.",
							},
							lang
						)}
					</div>
				) : (
					brands.map((brand, idx) => (
						<motion.div
							key={brand.id || idx}
							className="w-36 md:w-44 flex justify-center items-center"
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.6,
								delay: idx * 0.14,
								type: "spring",
							}}
							whileHover={{
								scale: 1.08,
								boxShadow: "0 6px 30px rgba(0,0,0,0.08)",
							}}
						>
							<img
								src={brand.logo ? BASE_URL + brand.logo : "/no-img.png"}
								alt={brand.name}
								className="w-full h-auto max-h-24 object-contain"
								draggable="false"
								onError={(e) => {
									e.target.src = "/no-img.png";
								}}
							/>
						</motion.div>
					))
				)}
			</div>
		</section>
	);
}
