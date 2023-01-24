interface props {
	color: 'green' | 'red';
	children: React.ReactNode;
}

function Indicator({ color, children }: props): JSX.Element {
	const bgVariatns = {
		green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
		red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
	};

	const textVariants = {
		green: 'bg-green-500',
		red: 'bg-red-500'
	};

	return (
		<span
			className={`mr-2 px-2.5 py-0.5 inline-flex items-center text-xs font-medium rounded-full ${bgVariatns[color]}`}>
			<span
				className={`w-2 h-2 mr-1 rounded-full ${textVariants[color]}`}></span>
			{children}
		</span>
	);
}

export default Indicator;
