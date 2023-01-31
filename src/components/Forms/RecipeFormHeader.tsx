interface props {
	title: string;
	hrColor: 'amber' | 'rose' | 'blue' | 'green';
}

function RecipeFormHeader({ title, hrColor }: props): JSX.Element {
	const colorVariants = {
		amber: 'border-amber-600',
		rose: 'border-rose-700',
		blue: 'border-blue-700',
		green: 'border-green-700'
	};

	return (
		<>
			<h2 className="font-bold text-2xl text-center text-black dark:text-white">
				{title}
			</h2>
			<hr className={`mt-2 mb-7 border-4 ${colorVariants[hrColor]}`} />
		</>
	);
}

export default RecipeFormHeader;
