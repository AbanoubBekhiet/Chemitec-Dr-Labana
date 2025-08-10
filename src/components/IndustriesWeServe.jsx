import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosServices from "../utils/axios";
import { t, useLang } from "../context/LangContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://chemitic.surgi-web.com";

const getVisibleCards = () => {
	if (window.innerWidth >= 1024) return 3;
	if (window.innerWidth >= 768) return 2;
	return 1;
};

export default function IndustriesWeServe() {
	const [industries, setIndustries] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [start, setStart] = useState(0);
	const [direction, setDirection] = useState(0);
	const [visibleCards, setVisibleCards] = useState(getVisibleCards());
	const { lang } = useLang();
	const navigate = useNavigate();

	function navigateToService(id) {
		navigate(`industry/${id}`);
	}
	// Get industries from API
	useEffect(() => {
		let ignore = false;
		setLoading(true);
		axiosServices
			.get("/industries")
			.then((res) => {
				if (!ignore) {
					setIndustries(Array.isArray(res.data.data) ? res.data.data : []);
					setLoading(false);
				}
			})
			.catch(() => {
				if (!ignore) {
					setError(
						t(
							{
								en: "Error loading industries.",
								ar: "حدث خطأ أثناء تحميل الصناعات.",
								fr: "Erreur lors du chargement des secteurs.",
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
		// eslint-disable-next-line
	}, [lang]);

	// Responsive
	useEffect(() => {
		const onResize = () => setVisibleCards(getVisibleCards());
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	// navigation logic
	const canPrev = start > 0;
	const canNext = start + visibleCards < industries.length;

	const handleNext = () => {
		if (canNext) {
			setDirection(1);
			setStart((s) => Math.min(s + 1, industries.length - visibleCards));
		}
	};

	const handlePrev = () => {
		if (canPrev) {
			setDirection(-1);
			setStart((s) => Math.max(s - 1, 0));
		}
	};

	// Animation
	const slideVariants = {
		initial: { opacity: 0, scale: 0.97 },
		animate: {
			opacity: 1,
			scale: 1,
			transition: { opacity: { duration: 0.35 }, scale: { duration: 0.33 } },
		},
		exit: { opacity: 0, scale: 0.97, transition: { duration: 0.27 } },
	};

	const currentSlides = industries.slice(start, start + visibleCards);

	return (
		<section className="py-14 bg-white w-full">
			<motion.h2
				className="text-4xl md:text-5xl font-bold text-center mb-4"
				initial={{ opacity: 0, y: -40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, type: "spring" }}
				viewport={{ once: true }}
			>
				{t(
					{
						en: "Industries We Serve",
						ar: "الصناعات التي نخدمها",
						fr: "Secteurs que nous desservons",
					},
					lang
				)}
			</motion.h2>
			<motion.p
				className="text-gray-500 text-center max-w-2xl mx-auto mb-12 text-base md:text-lg"
				initial={{ opacity: 0, y: -20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				viewport={{ once: true }}
			>
				{t(
					{
						en: "From bakery and pasta to biscuits, noodles, and beyond — Chemitec provides essential ingredients tailored for diverse food production sectors.",
						ar: "من المخبوزات والمكرونة إلى البسكويت والنودلز وأكثر — تقدم Chemitec مكونات أساسية مصممة خصيصًا لمختلف قطاعات إنتاج الأغذية.",
						fr: "De la boulangerie et des pâtes aux biscuits, nouilles et au-delà — Chemitec fournit des ingrédients essentiels adaptés à divers secteurs de la production alimentaire.",
					},
					lang
				)}
			</motion.p>

			<div className="relative w-full max-w-[1200px] mx-auto flex flex-col">
				<div className="w-full flex justify-center">
					{loading ? (
						<div className="py-14 text-gray-400 text-center w-full">
							{t(
								{
									en: "Loading...",
									ar: "جارٍ التحميل...",
									fr: "Chargement...",
								},
								lang
							)}
						</div>
					) : error ? (
						<div className="py-14 text-red-500 text-center w-full">{error}</div>
					) : !industries.length ? (
						<div className="py-14 text-gray-400 text-center w-full">
							{t(
								{
									en: "No industries found.",
									ar: "لا توجد صناعات.",
									fr: "Aucune industrie trouvée.",
								},
								lang
							)}
						</div>
					) : (
						<AnimatePresence initial={false} custom={direction}>
							{currentSlides.map((item, i) => (
								<motion.div
									key={item.id + "-" + (start + i)}
									onClick={() => navigateToService(item.id)}
									custom={direction}
									variants={slideVariants}
									initial="initial"
									animate="animate"
									exit="exit"
									className={`bg-white rounded-2xl border border-gray-100 shadow-[0_2px_16px_0_rgba(20,24,31,0.06)]
                    flex flex-col items-center px-2 sm:px-6 pt-4 pb-8 mx-2
                    transition-all duration-300
                    ${
											visibleCards === 3
												? "w-1/3"
												: visibleCards === 2
												? "w-1/2"
												: "w-full"
										}
                    max-w-[390px] min-w-[270px]`}
									style={{ minHeight: 410 }}
								>
									<img
										src={item.image ? BASE_URL + item.image : "/no-img.png"}
										alt={item.name}
										className="w-full h-[260px] object-cover rounded-xl mb-7"
										draggable="false"
										onError={(e) => {
											e.target.src = "/no-img.png";
										}}
									/>
									<span
										className="text-2xl font-bold text-[#36507D] mb-2 text-center"
										style={{ letterSpacing: 0.3 }}
									>
										{/* {item.nameEn} */}
										{t(
											{
												en: item.nameEn,
												ar: item.nameAr,
												fr: item.nameFr,
											},
											lang
										)}
									</span>
								</motion.div>
							))}
						</AnimatePresence>
					)}
				</div>

				<div className="w-full flex justify-start mt-8">
					<div className="flex gap-3 ml-2">
						<button
							className={`w-12 h-12 rounded-full flex items-center justify-center bg-white shadow
                hover:bg-gray-100 border border-gray-200 text-2xl text-[#1b2537] transition
                ${!canPrev && "opacity-40 pointer-events-none"}`}
							onClick={handlePrev}
							aria-label="Previous"
							tabIndex={canPrev ? 0 : -1}
						>
							<span>&#8592;</span>
						</button>
						<button
							className={`w-12 h-12 rounded-full flex items-center justify-center bg-[#0097C3]
                shadow text-2xl text-white hover:bg-[#15b9ea] transition
                ${!canNext && "opacity-40 pointer-events-none"}`}
							onClick={handleNext}
							aria-label="Next"
							tabIndex={canNext ? 0 : -1}
						>
							<span>&#8594;</span>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
