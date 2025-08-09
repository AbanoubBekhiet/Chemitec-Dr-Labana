import brandsBg from "../assets/hero.jpg";
import axiosServices from "../utils/axios";
import { t, useLang } from "../context/LangContext";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import SecondHeader from "../components/SecondHeader";
import { useParams } from "react-router-dom";
const BASE_URL = "https://chemitic.surgi-web.com";
function AllProducts() {
	const { lang } = useLang();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

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
		<div>
			<SecondHeader
				h={t({ en: "Products", ar: "المنتجات", fr: "Produits" }, lang)}
				p={t(
					{
						en: "Discover Chemitec’s core ingredients — designed to optimize production, simplify processing, and enrich every recipe with quality and consistency.",
						ar: "اكتشف مكونات Chemitec الأساسية — مصممة لتحسين الإنتاج وتبسيط المعالجة وإثراء كل وصفة بالجودة والاتساق.",
						fr: "Découvrez les ingrédients de base de Chemitec — conçus pour optimiser la production, simplifier le traitement et enrichir chaque recette avec qualité et cohérence.",
					},
					lang
				)}
				image={brandsBg}
			/>
			<div className="flex  justify-around flex-wrap gap-5 mb-10 mt-10">
				{products.map((p) => (
					<Product
						key={p.id} 
						name={t(
							{
								en: p.nameEn,
								fr: p.nameFr,
								ar: p.nameAr,
							},
							lang
						)}
						description={t(
							{
								en: p.descriptionEn,
								fr: p.descriptionFr,
								ar: p.descriptionAr,
							},
							lang
						)}
						image={`${BASE_URL}${p.image}`}
					/>
				))}
			</div>
		</div>
	);
}

export default AllProducts;
