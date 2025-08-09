import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import axiosServices from "../utils/axios";
import { t, useLang } from "../context/LangContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://chemitic.surgi-web.com";

const getFullImage = (img) => (img ? BASE_URL + img : "/no-img.png");

function TeamCard({ img, name, position, bio, i }) {
	return (
		<motion.div
			custom={i}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: i * 0.07, duration: 0.4 }}
			className="flex flex-col items-center bg-white"
			style={{
				width: 312.5,
				height: 444,
				borderRadius: 12,
				boxShadow: "2px 2px 2px 0px #0000000D, 2px 2px 2px 0px #0000000D inset",
				padding: "24px 24px 32px 24px",
				boxSizing: "border-box",
			}}
		>
			<div
				className="overflow-hidden"
				style={{
					width: "100%",
					height: 340,
					borderRadius: 12,
					marginBottom: 16,
				}}
			>
				<motion.img
					src={getFullImage(img)}
					alt={name}
					className="object-cover w-full h-full transition-transform duration-300"
					whileHover={{ scale: 1.04 }}
					transition={{ type: "spring", stiffness: 250, damping: 20 }}
					onError={(e) => {
						e.target.src = "/no-img.png";
					}}
				/>
			</div>
			<div className="flex flex-col items-center w-full">
				<h3
					className="text-[17px] font-bold text-[#384d6c] text-center"
					style={{ margin: 0 }}
				>
					{name}
				</h3>
				<p
					className="text-[#5e85c3] text-base text-center mt-1"
					style={{ fontWeight: 500, margin: 0 }}
				>
					{position}
				</p>
				<p className="text-gray-500 text-center text-xs mt-2">{bio}</p>
			</div>
		</motion.div>
	);
}

export default function TeamSection() {
	const [team, setTeam] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const { lang } = useLang();
	const navigate = useNavigate();
	function goToOurTeam() {
		navigate("/ourteam");
	}

	useEffect(() => {
		let ignore = false;
		setLoading(true);
		axiosServices
			.get("/team")
			.then((res) => {
				if (!ignore) {
					setTeam(Array.isArray(res.data.data) ? res.data.data : []);
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
	}, []);

	return (
		<section
			className="py-10 px-2 md:px-8 max-w-7xl mx-auto"
			onClick={goToOurTeam}
		>
			{loading ? (
				<div className="py-10 text-gray-400 text-center w-full">Loading...</div>
			) : error ? (
				<div className="py-10 text-red-500 text-center w-full">{error}</div>
			) : !team.length ? (
				<div className="py-10 text-gray-400 text-center w-full">
					No team members found.
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-28 gap-y-11 justify-items-center">
					{team.slice(0, 8).map((member, i) => 
						(
						
						<TeamCard
							key={member.id || i}
							img={member.image}
							name={t(
								{
									en: member.nameEn,
									ar: member.nameAr,
									fr: member.nameFr,
								},
								lang
							)}
							position={t(
								{
									en: member.positionEn,
									ar: member.positionAr,
									fr: member.positionFr,
								},
								lang
							)}
							bio={t(
								{
									en: member.bioEn,
									ar: member.bioAr,
									fr: member.bioFr,
								},
								lang
							)}
							i={i}
						/>
					))}
				</div>
			)}
		</section>
	);
}
