// src/components/Navbar.jsx
import React, { useState } from "react";
import { FaBars, FaGlobe } from "react-icons/fa";
import logo from "../assets/logo.svg";
import { useLang, LANGS, t } from "../context/LangContext";

export default function Navbar() {
	const [openMenu, setOpenMenu] = useState(false);
	const [openLang, setOpenLang] = useState(false);
	const { lang, setLang } = useLang();

	const changeLang = (l) => {
		setLang(l);
		setOpenLang(false);
	};

	return (
		<nav className="w-full text-white py-1 relative z-50">
			<div className="container flex items-center justify-between">
				{/* logo */}
				<div className="flex  md:w-24 md:h-18 w-18 h-14 items-center">
					<img src={logo} alt="Chemitec Dr-Labana" className="w-full h-full" />
				</div>

				{/* desktop */}
				<div className="hidden md:flex items-center gap-3">
					<button className="px-4 py-2 bg-primary text-white rounded">
						{t(
							{
								en: "Contact Us",
								ar: "اتصل بنا",
								fr: "Contactez-nous",
							},
							lang
						)}
					</button>

					{/* language dropdown */}
					<div className="relative z-50">
						<button
							onClick={() => setOpenLang(!openLang)}
							className="flex items-center text-black gap-1 hover:text-primary"
						>
							<FaGlobe />
							<span>{lang.toUpperCase()}</span>
							<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
								<path
									d="M5.25 7.5l4.5 4.5 4.5-4.5"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
							</svg>
						</button>
						{openLang && (
							<div className="absolute z-50 right-0 mt-2 bg-white text-text-primary rounded shadow">
								{Object.entries(LANGS).map(([key, code]) => (
									<button
										key={key}
										onClick={() => changeLang(code)}
										className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
									>
										{key.toUpperCase()}
									</button>
								))}
							</div>
						)}
					</div>
				</div>

				{/* mobile menu button */}
				<button className="md:hidden" onClick={() => setOpenMenu(!openMenu)}>
					<FaBars className="text-2xl text-black" />
				</button>
			</div>

			{/* mobile dropdown */}
			{openMenu && (
				<div className="md:hidden bg-white text-text-primary">
					<button className="block w-full text-left px-6 py-3 hover:bg-gray-100">
						{t(
							{
								en: "Contact Us",
								ar: "اتصل بنا",
								fr: "Contactez-nous",
							},
							lang
						)}
					</button>
					<div className="block w-full text-left px-6 py-3 border-t border-gray-200">
						{/* إعادة استخدام قائمة اللغات */}
						{Object.entries(LANGS).map(([key, code]) => (
							<button
								key={key}
								onClick={() => changeLang(code)}
								className="block w-full text-left py-2 hover:bg-gray-100"
							>
								{key.toUpperCase()}
							</button>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}
