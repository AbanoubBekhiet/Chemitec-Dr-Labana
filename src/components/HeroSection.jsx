import React, { useState } from "react";
import { t, useLang } from "../context/LangContext";
// خلي عندك صورة poster خفيفة هنا
import heroPoster from "../assets/hero-poster.jpg";
// وحط الفيديو المضغوط في فولدر assets
import heroVideo from "../assets/hero-video.mp4";
// لو عندك نسخة webm للفيديو كمان هيفيد في بعض المتصفحات (اختياري)
// import heroVideoWebm from '../assets/hero-video.webm'
import { HashLink } from "react-router-hash-link";

export default function HeroSection() {
	const { lang } = useLang();
	const [videoLoaded, setVideoLoaded] = useState(false);

	return (
		<section className="relative w-full h-screen overflow-hidden">
			{/* صورة ثابتة أثناء تحميل الفيديو */}
			{!videoLoaded && (
				<img
					src={heroPoster}
					alt="hero placeholder"
					className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500"
				/>
			)}

			{/* الفيديو */}
			<video
				className="absolute inset-0 w-full h-full object-cover z-10"
				src={heroVideo}
				poster={heroPoster}
				autoPlay
				loop
				muted
				playsInline
				onCanPlayThrough={() => setVideoLoaded(true)}
				preload="auto"
			/>

			{/* overlay تدريجي أقوى في وسط الشاشة */}
			<div
				className="absolute inset-0 z-20 pointer-events-none"
				style={{
					background: `
        linear-gradient(
          to bottom, 
          rgba(17,24,39,0.72) 0%,    /* داكن جداً فوق */
          rgba(17,24,39,0.48) 40%,   /* متوسط */
          rgba(17,24,39,0.32) 75%,   /* أخف */
          rgba(17,24,39,0.16) 100%   /* شفاف في آخر الهيرو */
        )
      `,
				}}
			/>

			{/* المحتوى */}
			<div className="relative flex z-30 items-center justify-center h-full">
				<div className="container m-6">
					<div className="max-w-[850px]">
						<p
							className="uppercase text-body-medium text-text-secondary mb-2 drop-shadow-lg"
							style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)", color: "#fff" }}
						>
							{t(
								{
									en: "Quality You Can Trust",
									ar: "جودة تثق بها",
									fr: "Qualité digne de confiance",
								},
								lang
							)}
						</p>
						<h1
							className="text-h1 text-[#729b3c86] font-bold mb-4 drop-shadow-lg"
							// style={{ textShadow: '0 4px 16px rgba(0,0,0,0.7)' }}
							style={{
								color: "#fff",
								textShadow: "0 4px 16px rgba(0,0,0,0.7)",
							}}
						>
							{t(
								{
									en: "Specialized Raw Materials for Advanced Food Manufacturing",
									ar: "مواد خام متخصصة لتصنيع الأغذية المتقدمة",
									fr: "Matières premières spécialisées pour la fabrication alimentaire avancée",
								},
								lang
							)}
						</h1>
						<p
							className="text-body-medium text-text-secondary leading-relaxed mb-6 max-w-2xl drop-shadow-md"
							style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)", color: "#fff" }}
						>
							{t(
								{
									en: "We provide high-performance food-grade ingredients engineered to meet global standards in safety, consistency, and efficiency across industrial-scale production lines.",
									ar: "نقدم مكونات غذائية عالية الأداء مصممة لتلبية المعايير العالمية في السلامة والاتساق والكفاءة على خطوط الإنتاج الصناعية.",
									fr: "Nous fournissons des ingrédients alimentaires haute performance conçus pour répondre aux normes mondiales de sécurité, de cohérence et d’efficacité sur des lignes de production à l’échelle industrielle.",
								},
								lang
							)}
						</p>
						<div className="flex flex-wrap gap-4">
							<HashLink smooth to="/#contactUs">
								<button className="px-6 py-3 bg-primary text-white font-medium rounded drop-shadow-md">
									{t(
										{ en: "Contact Us", ar: "اتصل بنا", fr: "Contactez-nous" },
										lang
									)}
								</button>
							</HashLink>
							<button className="px-6 py-3 border border-primary text-primary font-medium rounded bg-transparent drop-shadow-md">
								{t(
									{
										en: "Learn More",
										ar: "اعرف المزيد",
										fr: "En savoir plus",
									},
									lang
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
