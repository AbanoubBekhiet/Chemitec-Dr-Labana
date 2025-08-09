function SecondHeader({ image, h, p }) {
	return (
		<div>
			<div className="w-full h-52 md:h-64 relative flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
				<img
					src={image}
					alt="Brands Hero"
					className="absolute w-full h-full object-cover top-0 left-0 opacity-75"
				/>
				<div className="absolute w-full h-full bg-gradient-to-t from-white/90 to-transparent"></div>
			</div>
			{<h2 className="text-5xl md:text-6xl font-bold mb-3 text-center leading-tight mt-5">
				{h}
			</h2>}
			<p className="text-gray-400 mb-4 text-center max-w-2xl mx-auto text-lg">
				{p}
			</p>
		</div>
	);
}

export default SecondHeader;
