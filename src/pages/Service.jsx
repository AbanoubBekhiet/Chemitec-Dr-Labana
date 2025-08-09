import { useEffect, useState } from "react";
import SecondHeader from "../components/SecondHeader";
import { t, useLang } from "../context/LangContext";
import { useParams } from "react-router-dom";
import axiosServices from "../utils/axios";

const BASE_URL = "https://chemitic.surgi-web.com";

function Service() {
	const { lang } = useLang();
	const [industry, setIndustry] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const { id } = useParams(1);
	useEffect(() => {
		let ignore = false;
		setLoading(true);
		axiosServices
			.get(`/industries/${id}`)
			.then((res) => {
				if (!ignore) {
					setIndustry(res.data);
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
		<div>
			<SecondHeader
				image={`${BASE_URL}${industry.image}`}
				h={t(
					{
						en: "Services",
						ar: "خدمات",
						fr: "Services",
					},
					lang
				)}
				p={t(
					{
						en: "From bakery and pasta to biscuits, noodles, and beyond — Chemitec provides essential ingredients tailored for diverse food production sectors.",
						ar: "من المخبوزات والمعكرونة إلى البسكويت والمعكرونة وأكثر من ذلك - توفر شركة Chemitec مكونات أساسية مصممة خصيصًا لقطاعات إنتاج الأغذية المتنوعة.",
						fr: "De la boulangerie et des pâtes aux biscuits, aux nouilles et au-delà, Chemitec fournit des ingrédients essentiels adaptés à divers secteurs de production alimentaire.",
					},
					lang
				)}
			/>
			<div
				className="flex flex-col md:flex-row items-center gap-6 max-w-7xl mx-auto py-10 px-4"
				style={{ color: "#4f5f83" }}
			>
				<div className="w-full md:w-1/2">
					<img
						src={`${BASE_URL}${industry.image}`}
						alt="Bakery products"
						className="rounded-lg w-full h-auto object-cover"
					/>
				</div>

				<div className="w-full md:w-1/2">
					<h2 className="text-2xl font-bold text-[#1D3557] mb-4">
						{t(
							{
								en: industry.nameEn,
								ar: industry.nameAr,
								fr: industry.nameFr,
							},
							lang
						)}
					</h2>

					{[...Array(3)].map((_, i) => (
						<p key={i} className="text-gray-500 mb-4 leading-relaxed max-w-9xl">
							{t(
							{
								en: industry.descriptionEn,
								ar: industry.descriptionAr,
								fr: industry.descriptionFr,
							},
							lang
						)}
						</p>
					))}
				</div>
			</div>
		</div>
	);
}

export default Service;
