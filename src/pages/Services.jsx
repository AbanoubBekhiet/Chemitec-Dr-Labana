import { motion } from "framer-motion";
import { t, useLang } from "../context/LangContext";
const BASE_URL = "https://chemitic.surgi-web.com";
import factory1 from "../assets/sliderImage.jpg";
import factory2 from "../assets/sliderImage.jpg";
import factory3 from "../assets/sliderImage.jpg";
import hero from "../assets/hero.jpg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosServices from "../utils/axios";

const heroBg = hero;

export default function Services() {
	const { lang } = useLang();
	const [product, setProduct] = useState([]);
	const [discription, setDescription] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const serviceId = useParams();

	const isAr = lang === "ar";
	const isFr = lang === "fr";
	useEffect(() => {
		let ignore = false;
		setLoading(true);
		axiosServices
			.get(`/successful-products/${serviceId.id}`)
			.then((res) => {
				if (!ignore) {
					setProduct(res.data);
					setDescription(
						t(
							{
								en: res.data.descriptionEn,
								ar: res.data.descriptionAr,
								fr: res.data.descriptionFr,
							},
							lang
						)
					);
					console.log(res.data);
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

	// mainTitle بالـ 3 لغات
	// const mainTitle = isAr
	// 	? "الكفاءة في كل خطوة. التميز في كل منتج"
	// 	: isFr
	// 	? "Efficacité à chaque étape. Excellence dans chaque produit"
	// 	: "Efficiency in Every Step. Excellence in Every Product";

	// // paragraphs بالـ 3 لغات
	// const paragraphs = isAr
	// 	? [
	// 			"في كيميتك، تم تصميم عمليات الإنتاج لدينا لتحقيق الكفاءة والدقة والجودة المتسقة في كل مرحلة. نحن نشغل خطوط إنتاج متقدمة مزودة بأحدث التقنيات التي تضمن أعلى معايير النظافة والسلامة.",
	// 			"في كيميتك، تم تصميم عمليات الإنتاج لدينا لتحقيق الكفاءة والدقة والجودة المتسقة في كل مرحلة. نحن نشغل خطوط إنتاج متقدمة مزودة بأحدث التقنيات التي تضمن أعلى معايير النظافة والسلامة.",
	// 			"في كيميتك، تم تصميم عمليات الإنتاج لدينا لتحقيق الكفاءة والدقة والجودة المتسقة في كل مرحلة. نحن نشغل خطوط إنتاج متقدمة مزودة بأحدث التقنيات التي تضمن أعلى معايير النظافة والسلامة.",
	// 	  ]
	// 	: isFr
	// 	? [
	// 			"Chez Chemitec, nos processus de production sont conçus pour garantir l'efficacité, la précision et une qualité constante à chaque étape. Nous exploitons des lignes de production avancées équipées de technologies de pointe qui assurent les normes d'hygiène et de sécurité les plus élevées.",
	// 			"Chez Chemitec, nos processus de production sont conçus pour garantir l'efficacité, la précision et une qualité constante à chaque étape. Nous exploitons des lignes de production avancées équipées de technologies de pointe qui assurent les normes d'hygiène et de sécurité les plus élevées.",
	// 			"Chez Chemitec, nos processus de production sont conçus pour garantir l'efficacité, la précision et une qualité constante à chaque étape. Nous exploitons des lignes de production avancées équipées de technologies de pointe qui assurent les normes d'hygiène et de sécurité les plus élevées.",
	// 	  ]
	// 	: [
	// 			"At Chemitec, our production processes are designed to deliver efficiency, precision, and consistent quality at every stage. We operate advanced production lines equipped with state-of-the-art technologies that ensure the highest standards of hygiene and safety.",
	// 			"At Chemitec, our production processes are designed to deliver efficiency, precision, and consistent quality at every stage. We operate advanced production lines equipped with state-of-the-art technologies that ensure the highest standards of hygiene and safety.",
	// 			"At Chemitec, our production processes are designed to deliver efficiency, precision, and consistent quality at every stage. We operate advanced production lines equipped with state-of-the-art technologies that ensure the highest standards of hygiene and safety.",
	// 	  ];

	// // sectionTitle بالـ 3 لغات
	// const sectionTitle = isAr
	// 	? "مصانعنا — الريادة في تصنيع الغذاء في مصر"
	// 	: isFr
	// 	? "Nos usines — Un modèle de fabrication alimentaire en Égypte"
	// 	: "Our Factories — Pioneering Food Manufacturing in Egypt";

	// // bullets بالـ 3 لغات
	// const bullets = isAr
	// 	? [
	// 			"من خلال مرافق متطورة وتقنيات حديثة، تقف مصانعنا في طليعة صناعة الأغذية في مصر. نحن ملتزمون بتقديم مواد خام موثوقة وعالية الجودة تدعم الإنتاج المحلي وتلبي المعايير العالمية.",
	// 			"من خلال مرافق متطورة وتقنيات حديثة، تقف مصانعنا في طليعة صناعة الأغذية في مصر. نحن ملتزمون بتقديم مواد خام موثوقة وعالية الجودة تدعم الإنتاج المحلي وتلبي المعايير العالمية.",
	// 			"من خلال مرافق متطورة وتقنيات حديثة، تقف مصانعنا في طليعة صناعة الأغذية في مصر. نحن ملتزمون بتقديم مواد خام موثوقة وعالية الجودة تدعم الإنتاج المحلي وتلبي المعايير العالمية.",
	// 	  ]
	// 	: isFr
	// 	? [
	// 			"Grâce à des installations ultramodernes et à une technologie de pointe, nos usines sont à l'avant-garde de l'industrie alimentaire égyptienne. Nous nous engageons à fournir des matières premières fiables et de haute qualité qui soutiennent la production locale et répondent aux normes mondiales.",
	// 			"Grâce à des installations ultramodernes et à une technologie de pointe, nos usines sont à l'avant-garde de l'industrie alimentaire égyptienne. Nous nous engageons à fournir des matières premières fiables et de haute qualité qui soutiennent la production locale et répondent aux normes mondiales.",
	// 			"Grâce à des installations ultramodernes et à une technologie de pointe, nos usines sont à l'avant-garde de l'industrie alimentaire égyptienne. Nous nous engageons à fournir des matières premières fiables et de haute qualité qui soutiennent la production locale et répondent aux normes mondiales.",
	// 	  ]
	// 	: [
	// 			"With state-of-the-art facilities and cutting-edge technology, our factories stand at the forefront of Egypt’s food industry. We are committed to delivering reliable, high-quality raw materials that power local production and meet global standards.",
	// 			"With state-of-the-art facilities and cutting-edge technology, our factories stand at the forefront of Egypt’s food industry. We are committed to delivering reliable, high-quality raw materials that power local production and meet global standards.",
	// 			"With state-of-the-art facilities and cutting-edge technology, our factories stand at the forefront of Egypt’s food industry. We are committed to delivering reliable, high-quality raw materials that power local production and meet global standards.",
	// 	  ];

	return (
		<div
			className="w-full min-h-screen bg-white flex flex-col"
			dir={isAr ? "rtl" : "ltr"}
		>
			{/* الهيدر الكبير بصورة باكجراوند */}
			<div className="relative w-full h-[220px] md:h-[340px] flex items-end">
				<img
					src={`${BASE_URL}${product.image}`}
					alt="city"
					className="absolute inset-0 w-full h-full object-cover"
					style={{ zIndex: 1 }}
					draggable={false}
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-[#fff8] via-[#fff7] to-[#fff] z-10" />
			</div>

			{/* العنوان والمقدمة */}

			<motion.section
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.6 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="container max-w-7xl mx-auto -mt-20 md:-mt-32 relative z-20 px-4"
			>
				<div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-8">
					<h2 className="font-bold text-lg md:text-2xl mb-3 text-gray-900">
            {t(
							{
								en:product.titleEn ,
								ar: product.titleAr,
								fr: product.titleFr,
							},
							lang
						)}
					</h2>
					{discription.map((p, i) => (
						<p key={i} className="text-gray-700 mb-2 text-base md:text-lg">
							{p}
						</p>
					))}
				</div>
			</motion.section>

			{/* السكشنات التانية: */}
			<div className="container max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
			{/* سكشن نصوص + صورة */}
			<motion.div
					initial={{ opacity: 0, x: isAr ? 60 : -60 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="flex flex-col justify-center"
				>
					<h3 className="text-primary text-lg md:text-xl font-semibold mb-3">
						{t(
							{
								en:product.titleEn ,
								ar: product.titleAr,
								fr: product.titleFr,
							},
							lang
						)}
					</h3>
					<ul className="space-y-3 text-gray-700 text-base md:text-lg">
						{discription.map((b, i) => (
							<li key={i}>{b}</li>
						))}
					</ul>
				</motion.div>

			{/* صور مصانع */}
			<motion.div
					initial={{ opacity: 0, x: isAr ? -60 : 60 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="flex flex-col gap-6"
				>
					<div className="rounded-2xl overflow-hidden shadow-lg">
						<img
							src={`${BASE_URL}${product.image}`}
							alt="factory"
							className="w-full object-cover h-[160px] md:h-[190px]"
							loading="lazy"
						/>
					</div>
					<div className="rounded-2xl overflow-hidden shadow-lg">
						<img
							src={`${BASE_URL}${product.image}`}
							alt="factory"
							className="w-full object-cover h-[160px] md:h-[190px]"
							loading="lazy"
						/>
					</div>
				</motion.div>

			{/* صور مصانع تانية */}
			<motion.div
					initial={{ opacity: 0, x: isAr ? 60 : -60 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="flex flex-col gap-6"
				>
					<div className="rounded-2xl overflow-hidden shadow-lg">
						<img
							src={`${BASE_URL}${product.image}`}
							alt="factory"
							className="w-full object-cover h-[160px] md:h-[190px]"
							loading="lazy"
						/>
					</div>
					<div className="rounded-2xl overflow-hidden shadow-lg">
						<img
							src={`${BASE_URL}${product.image}`}
							alt="factory"
							className="w-full object-cover h-[160px] md:h-[190px]"
							loading="lazy"
						/>
					</div>
				</motion.div>
			{/* سكشن نصوص + صورة */}
			<motion.div
					initial={{ opacity: 0, x: isAr ? -60 : 60 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="flex flex-col justify-center"
				>
					<h3 className="text-primary text-lg md:text-xl font-semibold mb-3">
						{t(
							{
								en:product.titleEn ,
								ar: product.titleAr,
								fr: product.titleFr,
							},
							lang
						)}
					</h3>
					<ul className="space-y-3 text-gray-700 text-base md:text-lg">
						{discription.map((b, i) => (
							<li key={i}>{b}</li>
						))}
					</ul>
				</motion.div>
			</div>
		</div>
	);
}
