const Header = ({ title }) => {
	return (
		<header className='bg-black bg-opacity-50 backdrop-blur-md shadow-lg border-b border-black'>
			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
				<h1 className='text-2xl font-semibold text-white'>{title}</h1>
			</div>
		</header>
	);
};
export default Header;
