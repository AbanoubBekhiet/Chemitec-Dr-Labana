import SecondHeader from "../components/SecondHeader";
import TeamSection from "../components/TeamSection";
import ourTeam from "./../assets/ourTeam.svg";
import { t, useLang } from "../context/LangContext";

function OurTeam() {
	const { lang } = useLang();

	return (
		<div>
			<SecondHeader
				image={ourTeam}
				h={t(
					{
						en: "Our team",
						ar: "فريقنا",
						fr: "Notre équipe",
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
			<TeamSection />
		</div>
	);
}

export default OurTeam;
