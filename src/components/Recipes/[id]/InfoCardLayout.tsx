interface props {
	color: 'amber' | 'rose' | 'blue';
	title: string;
	children: React.ReactNode;
}

function InfoCardLayout({ color, title, children }: props): JSX.Element {
	const colorVariants = {
		amber: 'text-amber-600 dark:text-amber-500',
		rose: 'text-rose-600 dark:text-rose-500',
		blue: 'text-blue-600 dark:text-blue-500'
	};

	return (
		<div
			className={`p-3 w-full rounded text-gray-700 bg-gray-100 dark:text-white dark:bg-gray-800 ${
				color !== 'blue' && 'md:flex-1'
			}`}>
			<h3 className={`text-xl font-bold ${colorVariants[color]}`}>{title}</h3>
			{children}
		</div>
	);
}

export default InfoCardLayout;
