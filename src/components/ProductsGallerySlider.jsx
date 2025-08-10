import Marquee from "react-fast-marquee";
import Masonry from "react-masonry-css";
import axiosServices from "../utils/axios";
import { useEffect, useState } from "react";
import { t, useLang } from "../context/LangContext";
const BASE_URL = "https://chemitic.surgi-web.com";


const breakpointColumnsObj = {
	default: 4,
	1200: 3,
	800: 2,
	500: 1,
};
let allImages=[];
export default function ProductsGridMarquee() {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const { lang } = useLang();

	useEffect(() => {
		let ignore = false;
		setLoading(true);
		axiosServices
			.get("/landing-images")
			.then((res) => {
				if (!ignore) {
          allImages=[...res.data,...res.data];
					setImages(allImages);
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
		<section
			dir="ltr"
			className="w-full h-screen  md:container  bg-white pt-16 overflow-hidden"
		>
			<Marquee
				gradient={false}
				speed={32}
				// pauseOnHover={true}
				direction="left"
				style={{ width: "100%" }}
			>
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className="flex w-full"
					columnClassName="masonry-column"
				>
					{images.map((src, i) => (
						<div
							key={i}
							className="mb-2"
							style={{
								borderRadius: "18px",
								overflow: "hidden",
								marginLeft: 0,
								marginRight: 0,
								background: "#f6f6f6",
								height: [250, 160, 210, 180, 150, 190][i % 6],
							}}
						>
							<img
								src={`${BASE_URL}${src.url}`}
								alt={t(
									{
										en: src.altEn??chemitic,
										ar: src.altAr??chemitic,
										fr: src.altFr??chemitic,
									},
									lang
								)}
								loading="lazy"
								className="object-cover w-full h-full"
								draggable={false}
								style={{ display: "block", width: "100%", height: "100%" }}
							/>
						</div>
					))}
				</Masonry>
			</Marquee>

			{/* موبايل: جريد عادي */}
			<div className="sm:hidden grid grid-cols-2 gap-2 mt-4">
				{images.slice(0, 6).map((src, i) => (
					<div
						key={i}
						className="rounded-xl overflow-hidden bg-gray-100 aspect-square"
					>
						<img
							src={`${BASE_URL}${src.url}`}
							alt={t(
								{
									en: src.altEn??chemitic,
									ar: src.altAr??chemitic,
									fr: src.altFr??chemitic,
								},
								lang
							)}
							loading="lazy"
							className="object-cover w-full h-full"
							draggable={false}
						/>
					</div>
				))}
			</div>

			{/* Masonry styles */}
			<style>{`
        .masonry-column {
          padding-left: 20px;
          padding-right: 20px;
          background-clip: padding-box;
        }
        .masonry-column > div {
          margin-bottom: 25px;
        }
      `}</style>
		</section>
	);
}
