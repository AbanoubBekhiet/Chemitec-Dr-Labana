// src/components/InfoSlider.jsx
import React, { useRef, useState, useEffect } from "react";
import { t, useLang } from "../context/LangContext";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axiosServices from "../utils/axios";
import noImage from "../assets/Error.svg";

export default function InfoSlider() {
	const { lang } = useLang();
	const [slides, setSlides] = useState([]);
	const [current, setCurrent] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const sliderRef = useRef(null);
	const isRtl = lang === "ar";
	const justify = isRtl ? "justify-end" : "justify-start";
	const direction = isRtl ? "rtl" : "ltr";
	const navigate = useNavigate();

	// Fetch data from API
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError("");
			try {
				const res = await axiosServices.get("/successful-products");
				// Optional: ترجم البيانات حسب اللغة
				setSlides(res.data?.data || []);
			} catch (err) {
				setError(
					t(
						{
							en: "Failed to load data.",
							ar: "فشل تحميل البيانات.",
							fr: "Échec du chargement des données.",
						},
						lang
					)
				);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	// Helper to get display index (for RTL)
	const getDisplayIndex = (idx) => (isRtl ? slides.length - 1 - idx : idx);

	// Scroll handler
	const handleScroll = (dir) => {
		let newIndex = current + dir;
		if (newIndex < 0) newIndex = 0;
		if (newIndex > slides.length - 1) newIndex = slides.length - 1;
		setCurrent(newIndex);

		const scrollToIdx = getDisplayIndex(newIndex);
		const cardWidth = 861 + 24;
		if (sliderRef.current) {
			sliderRef.current.scrollTo({
				left: cardWidth * scrollToIdx,
				behavior: "smooth",
			});
		}
	};

	// Adjust scroll on lang/current change
	useEffect(() => {
		const scrollToIdx = getDisplayIndex(current);
		const cardWidth = 861 + 24;
		if (sliderRef.current) {
			sliderRef.current.scrollTo({
				left: cardWidth * scrollToIdx,
				behavior: "smooth",
			});
		}
		// eslint-disable-next-line
	}, [lang, slides]);

	if (loading) {
		return (
			<section className="w-full bg-white min-h-[420px] flex items-center justify-center">
				<div className="text-xl font-bold text-primary animate-pulse">
					{t(
						{
							en: "Loading...",
							ar: "جاري التحميل...",
							fr: "Chargement.",
						},
						lang
					)}
				</div>
			</section>
		);
	}

	if (error || !slides.length) {
		return (
			<section className="w-full bg-white min-h-[420px] flex items-center justify-center">
				<div className="text-xl font-bold text-red-500">
					{error ||
						t(
							{
								en: "No data found.",
								ar: "لا توجد بيانات",
								fr: "Aucune donnée trouvée..",
							},
							lang
						)}
				</div>
			</section>
		);
	}

	return (
		<section className="w-full bg-white" dir={direction}>
			<div className="md:container text-center mb-10">
				<h2 className="font-en font-bold text-[25px] md:text-[60px] leading-[48px] md:leading-[76px] md:tracking-[0.5px] text-center text-text-primary mb-4">
					{t(
						{
							en: "Behind Every Successful Product... an Exceptional Team",
							ar: "وراء كل منتج ناجح... فريق استثنائي",
							fr: "Derrière chaque produit réussi... une équipe exceptionnelle.",
						},
						lang
					)}
				</h2>
				<p className="max-w-4xl mx-auto font-en font-normal text-[18px] md:text-[24px] leading-[24px] md:leading-[30px] text-center text-text-secondary mb-10">
					{t(
						{
							en: "Diverse expertise, one shared vision, and a level of professionalism that truly makes a difference.",
							ar: "خبرات متنوعة، ورؤية مشتركة واحدة، ومستوى من الاحترافية يصنع الفارق فعلاً.",
							fr: "Une expertise diversifiée, une vision commune et un niveau de professionnalisme qui fait vraiment la différence..",
						},
						lang
					)}
				</p>
			</div>

			<div className="relative w-full max-w-[1300px] mx-auto">
				<div
					ref={sliderRef}
					dir="ltr"
					className="
            flex overflow-x-auto scrollbar-hide gap-6
            snap-x snap-mandatory transition
          "
					style={{ scrollSnapType: "x mandatory" }}
				>
					{(isRtl ? [...slides].reverse() : slides).map((slide, idx) => (
						<div
							key={slide.id || idx}
							className={`
                bg-white border rounded-[12px] p-6 flex-shrink-0 snap-start
                transition-all duration-500
                w-[861px] h-[340px]
                ${
									getDisplayIndex(current) === idx
										? "opacity-100"
										: "opacity-90"
								}
              `}
							style={{
								marginLeft: idx === 0 && isRtl ? "60px" : "",
								marginRight: idx === 0 && !isRtl ? "60px" : "",
								boxShadow:
									getDisplayIndex(current) === idx
										? "0 4px 24px #00000012"
										: "none",
							}}
						>
							<div className="flex gap-6 h-full">
								<img
									src={
										slide.image
											? slide.image.startsWith("/")
												? `https://chemitic.surgi-web.com${slide.image}`
												: slide.image
											: noImage
									}
									alt={slide.title || ""}
									className="rounded-lg w-[250px] h-[100%] object-cover border"
									draggable={false}
									onError={(e) => {
										e.target.src = noImage;
									}}
								/>
								<div className="flex flex-col justify-center flex-1">
									<h3 className="font-en font-bold text-[28px] md:text-[32px] leading-[38px] mb-4">
										{t(
											{
												en: slide.titleEn,
												ar: slide.titleAr,
												fr: slide.titleFr,
											},
											lang
										) ||
											slide.title ||
											""}
									</h3>
									<p className="font-en font-normal text-[18px] md:text-[20px] leading-[28px] text-text-secondary mb-4">
										{t(
											{
												en: slide.descriptionEn,
												ar: slide.descriptionAr,
												fr: slide.descriptionFr,
											},
											lang
										) ||
											slide.description ||
											""}
									</p>
									<button
										onClick={() => navigate("/services")}
										className="mt-2 px-5 py-2 bg-white border border-primary text-primary font-poppins rounded transition hover:bg-primary hover:text-white text-[16px] w-fit"
									>
										{t(
											{
												en: "Read More",
												ar: "اقرأ المزيد",
												fr: "En savoir plus.",
											},
											lang
										)}
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className={`absolute -bottom-14 w-full flex ${justify} px-8`}>
					<div className="flex gap-3">
						<button
							onClick={() => handleScroll(-1)}
							aria-label="Previous"
							disabled={current === 0}
							className={`
                bg-white border border-primary text-primary w-12 h-12 rounded-full flex items-center justify-center
                shadow transition hover:bg-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed
              `}
						>
							{isRtl ? (
								<span className="text-2xl">
									<IoIosArrowForward />
								</span>
							) : (
								<span className="text-2xl">
									<IoIosArrowBack />
								</span>
							)}
						</button>
						<button
							onClick={() => handleScroll(1)}
							aria-label="Next"
							disabled={current === slides.length - 1}
							className={`
                bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center
                shadow transition hover:scale-105 disabled:opacity-40
              `}
						>
							{isRtl ? (
								<span className="text-2xl">
									<IoIosArrowBack />
								</span>
							) : (
								<span className="text-2xl">
									<IoIosArrowForward />
								</span>
							)}
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
