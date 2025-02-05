import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
const ProductsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	// Récupérer les données depuis l'API
	useEffect(() => {
		axios
			.get("http://127.0.0.1:8000/api/produit") // Remplace avec l'URL correcte de ton API
			.then((response) => {
				setProducts(response.data);
				setFilteredProducts(response.data);
			})
			.catch((error) => console.error("Erreur lors de la récupération des produits :", error));
	}, []);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = products.filter(
			(product) => product.NAME.toLowerCase().includes(term) || product.CATEGORY.toLowerCase().includes(term)
		);

		setFilteredProducts(filtered);
	};

	return (
		<motion.div
			className='bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-white mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-black'>Product List</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search products...'
						className='bg-gray-700 text-black placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={handleSearch}
						value={searchTerm}
					/>
					<Search className='absolute left-3 top-2.5 text-black' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
								Category
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
								Price
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
								Stock
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
								Sales
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredProducts.map((product) => (
							<motion.tr
								key={product.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-black flex gap-2 items-center'>
									<img
										src='https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww'
										alt='Product img'
										className='size-10 rounded-full'
									/>
									{product.NAME}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-black'>
									{product.CATEGORY}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-black'>
									${product.PRICE.toFixed(2)}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-black'>{product.STOCK}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-black'>{product.SALES}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-black'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
										<Edit size={18} />
									</button>
									<button className='text-red-400 hover:text-red-300'>
										<Trash2 size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default ProductsTable;
