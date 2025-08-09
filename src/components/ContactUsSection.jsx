import React, { useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { t, useLang } from "../context/LangContext";

const fadeUp = {
	hidden: { opacity: 0, y: 40 },
	visible: (custom) => ({
		opacity: 1,
		y: 0,
		transition: { delay: custom * 0.12, duration: 0.6, ease: "easeOut" },
	}),
};

// رابط جوجل ماب (ده لوكيشن تيست: وسط البلد القاهرة)
const MAP_URL =
	"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.0018225910463!2d31.23630287558422!3d30.050241818656498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145841104551c65d%3A0x395f393f8aab6e0d!2z2KfZhNio2Kgg2KfZhNmF2LXYp9ixINin2YTYt9mC2KfYqSDYp9mE2YXZitmI2KfZhiDYp9mE2YPYp9mE2YrYsdmK2Kkg2KfZhNio2Kgg2KfZhNiq2KfZhA!5e0!3m2!1sar!2seg!4v1718700000000!5m2!1sar!2seg";

export default function ContactUsSection() {
	const mapRef = useRef(null);
	const inView = useInView(mapRef, { once: true, margin: "-80px" });
	const controls = useAnimation();
	const { lang } = useLang();

	React.useEffect(() => {
		if (inView) {
			controls.start({
				scale: 1,
				opacity: 1,
				transition: { duration: 0.95, type: "spring", bounce: 0.17 },
			});
		}
	}, [inView, controls]);
	return (
		<section className="container py-12 px-12 mx-auto " id="contactUs">
			<motion.h2
				initial="hidden"
				animate="visible"
				variants={fadeUp}
				custom={0}
				className="text-4xl md:text-5xl font-bold text-center mb-3"
			>
				{t(
					{
						en: "Contact us",
						ar: "تواصل معنا",
						fr: "Contactez-nous",
					},
					lang
				)}
			</motion.h2>
			<motion.p
				initial="hidden"
				animate="visible"
				variants={fadeUp}
				custom={1}
				className="text-gray-400 text-center mb-12 max-w-4xl mx-auto"
			>
				{t(
					{
						en: "The harder you work for something, the greater you’ll feel when you achieve it.",
						ar: "كلما عملت بجد من أجل شيء ما، كلما شعرت بشعور أعظم عندما تحققه.",
						fr: "Plus vous travaillez dur pour quelque chose, plus vous vous sentirez fier lorsque vous l’aurez atteint.",
					},
					lang
				)}
			</motion.p>
			<div className="flex flex-col md:flex-row gap-10  items-center justify-center">
				{/* Form */}
				<motion.form
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeUp}
					custom={2}
					className="flex-1 flex flex-col gap-4 "
					onSubmit={(e) => e.preventDefault()}
				>
					<input
						type="text"
						placeholder={t(
								{
									en: "Your name",
									ar: "اسمك",
									fr: "Votre nom",
								},
								lang
							)}
						className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-200 text-[16px] transition"
					/>
					<div className="flex flex-col sm:flex-row gap-4">
						<input
							type="text"
							placeholder={t(
								{
									en: "Phone",
									ar: "رقم الهاتف",
									fr: "téléphone",
								},
								lang
							)}
							className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-200 text-[16px] flex-1 transition"
						/>
						<input
							type="email"
							placeholder={t(
								{
									en: "E-mail",
									ar: "الإيمال",
									fr: "E-mail",
								},
								lang
							)}
							className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-200 text-[16px] flex-1 transition"
						/>
					</div>
					<input
						type="text"
						placeholder={t(
							{
								en: "Subject",
								ar: "الموضوع",
								fr: "sujette",
							},
							lang
						)}
						className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-200 text-[16px] transition"
					/>
					<textarea
						placeholder={t(
							{
								en: "Description",
								ar: "وصف",
								fr: "Description",
							},
							lang
						)}
						className="border border-gray-200 rounded-md px-4 py-2 h-28 focus:outline-none focus:border-blue-200 text-[16px] transition resize-none"
					/>
					<motion.button
						whileHover={{ scale: 1.04 }}
						whileTap={{ scale: 0.97 }}
						type="submit"
						className="mt-2 w-[140px] h-10 bg-[#4b5e77] text-white rounded-md font-medium text-[16px] shadow transition"
					>
						{t(
							{
								en: "Send request",
								ar: "إرسال الطلب.",
								fr: "Envoyer une demande",
							},
							lang
						)}
					</motion.button>
				</motion.form>
				{/* Map */}
				<motion.div
					ref={mapRef}
					initial={{ scale: 0.88, opacity: 0 }}
					animate={controls}
					className="flex-1 flex items-center justify-end"
				>
					<div className="w-full h-[360px] md:w-[570px] md:h-[450px]  overflow-hidden bg-gray-100 shadow-sm flex items-center justify-center">
						<iframe
							title="Google Map"
							src={MAP_URL}
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen=""
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							className="w-full h-full"
						></iframe>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
