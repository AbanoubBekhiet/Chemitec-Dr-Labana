// src/context/LangContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const LANGS = {
	ar: "ar",
	en: "en",
	fr: "fr",
};

const LangContext = createContext();

export function LangProvider({ children }) {
	const selectedLanguage = Cookies.get("lang") || LANGS.en;
	const [lang, setLang] = useState(selectedLanguage);

	useEffect(() => {
		document.documentElement.lang = lang;
		document.documentElement.dir = lang === LANGS.ar ? "rtl" : "ltr";
	}, [lang]);

	const changeLang = (l) => {
		setLang(l);
		Cookies.set("lang", l, { expires: 7 });
	};

	return (
		<LangContext.Provider value={{ lang, setLang: changeLang }}>
			{children}
		</LangContext.Provider>
	);
}

export function useLang() {
	return useContext(LangContext);
}

export function t(obj, lang) {
	return obj?.[lang] || obj?.en;
}
