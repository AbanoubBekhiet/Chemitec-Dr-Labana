const Product = ({ name, description, image }) => {
	return (
		<div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 max-w-md">
			<div className="flex justify-center">
				<img
					src={image}
					alt={name}
					className="w-full h-40 sm:h-48 object-cover rounded-md"
				/>
			</div>

			<div className="mt-4 text-center">
				<h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
					{name}
				</h2>
				<p className="mt-2 text-sm sm:text-base text-gray-600">{description}</p>
			</div>
		</div>
	);
};

export default Product;
