import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import OurTeam from "./pages/OurTeam";
import Service from "./pages/Service";
import AllProducts from "./pages/AllProducts";
import LoadingSpinner from "./ui/LoadingSpinner";
import Services from "./pages/Services";
import BrandsPage from "./pages/BrandsPage";

// كل الصفحات الفرعية تبقى Nested جوه MainLayout
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainLayout />}>
			<Route
				index
				element={
					<Suspense fallback={<LoadingSpinner />}>
						<Home />
					</Suspense>
				}
			/>
			<Route
				path="service/:id"
				element={
					<Suspense fallback={<LoadingSpinner />}>
						<Services />
					</Suspense>
				}
			/>
			<Route
				path="BrandsPage"
				element={
					<Suspense fallback={<LoadingSpinner />}>
						<BrandsPage />
					</Suspense>
				}
			/>
			<Route
				path="allProducts"
				element={
					<Suspense fallback={<LoadingSpinner />}>
						<AllProducts />
					</Suspense>
				}
			/>
			<Route
				path="industry/:id"
				element={
					<Suspense fallback={<LoadingSpinner />}>
						<Service />
					</Suspense>
				}
			/>
			<Route
				path="ourteam"
				element={
					<Suspense fallback={<LoadingSpinner />}>
						<OurTeam />
					</Suspense>
				}
			/>
			{/* باقي الصفحات... */}
		</Route>
	)
);

export default router;
