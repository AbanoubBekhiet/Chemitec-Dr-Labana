import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axiosServices from "../utils/axios";
import { t, useLang } from "../context/LangContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://chemitic.surgi-web.com"; // لو انت محتاج تربط الصور يدويًا

export default function ProductsSliderSection() {
	const { lang } = useLang();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	function goToAllProducts() {
		navigate("allProducts");
	}
	useEffect(() => {
		let ignore = false;
		setLoading(true);
		axiosServices
			.get("/products")
			.then((res) => {
				if (!ignore) {
					setProducts(Array.isArray(res.data.data) ? res.data.data : []);
					setLoading(false);
				}
			})
			.catch(() => {
				if (!ignore) {
					setError(
						t(
							{
								en: "Error loading products.",
								ar: "حدث خطأ أثناء تحميل المنتجات.",
								fr: "Erreur lors du chargement des produits.",
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
		<section className="w-full bg-white overflow-hidden">
			<div className="max-w-7xl mx-auto px-4">
				<h2 className="text-5xl md:text-6xl font-bold mb-3 text-center leading-tight">
					{t({ en: "Products", ar: "المنتجات", fr: "Produits" }, lang)}
				</h2>
				<p className="text-gray-400 mb-4 text-center max-w-2xl mx-auto text-lg">
					{t(
						{
							en: "Discover Chemitec’s core ingredients — designed to optimize production, simplify processing, and enrich every recipe with quality and consistency.",
							ar: "اكتشف مكونات Chemitec الأساسية — مصممة لتحسين الإنتاج وتبسيط المعالجة وإثراء كل وصفة بالجودة والاتساق.",
							fr: "Découvrez les ingrédients de base de Chemitec — conçus pour optimiser la production, simplifier le traitement et enrichir chaque recette avec qualité et cohérence.",
						},
						lang
					)}
				</p>

				<div className="relative">
					{loading ? (
						<div className="text-center py-12 text-gray-400">
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
						<div className="text-center py-12 text-red-500">{error}</div>
					) : !products.length ? (
						<div className="text-center py-12 text-gray-400">
							{t(
								{
									en: "No products found.",
									ar: "لا توجد منتجات.",
									fr: "Aucun produit trouvé.",
								},
								lang
							)}
						</div>
					) : (
						<>
							<Swiper
								modules={[Navigation]}
								slidesPerView={4}
								spaceBetween={24}
								navigation={{
									nextEl: ".products-slider-next",
									prevEl: ".products-slider-prev",
								}}
								breakpoints={{
									1024: { slidesPerView: 4 },
									768: { slidesPerView: 2.2 },
									0: { slidesPerView: 1.2 },
								}}
								dir="ltr"
								className="overflow-hidden"
							>
								{products.map((product, idx) => (
									<SwiperSlide
										key={product.id || idx}
										onClick={goToAllProducts}
									>
										<div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[340px] p-4">
											<img
												src={
													BASE_URL +
													(product.image || (product.images?.[0]?.url ?? ""))
												}
												alt={product.nameEn}
												className="w-full h-36 object-contain rounded-lg mb-4"
												loading="lazy"
												onError={(e) => (e.target.src = "/no-img.png")}
											/>
											<h3 className="font-semibold text-lg mb-2 line-clamp-2">
												{t(
													{
														en: product.nameEn,
														ar: product.nameAr,
														fr: product.nameFr,
													},
													lang
												)}
											</h3>
											<p className="text-gray-500 text-sm line-clamp-4 flex-1">
												{t(
													{
														en: product.descriptionEn,
														ar: product.descriptionAr,
														fr: product.descriptionFr,
													},
													lang
												)}
											</p>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
							<div className="absolute left-0 -bottom-14 flex items-center gap-3 z-10">
								<button className="products-slider-prev w-9 h-9 rounded-full flex items-center justify-center bg-white border shadow hover:bg-gray-100 transition">
									<svg width="22" height="22" fill="none" viewBox="0 0 22 22">
										<path
											d="M14.5 18L8.5 11L14.5 4"
											stroke="#3AA6B9"
											strokeWidth="2.2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
								<button className="products-slider-next w-9 h-9 rounded-full flex items-center justify-center bg-[#3AA6B9] shadow hover:bg-[#2494b3] transition">
									<svg width="22" height="22" fill="none" viewBox="0 0 22 22">
										<path
											d="M7.5 4L13.5 11L7.5 18"
											stroke="#fff"
											strokeWidth="2.2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</div>
							<a
								href="#"
								className="absolute right-0 -bottom-12 text-[#3AA6B9] font-medium hover:underline transition"
							>
								{t({ en: "See More", ar: "عرض المزيد", fr: "Voir plus" }, lang)}
							</a>
						</>
					)}
				</div>
			</div>
		</section>
	);
}
