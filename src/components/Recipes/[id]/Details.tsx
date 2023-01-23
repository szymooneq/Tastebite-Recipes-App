import InfoCardLayout from './InfoCardLayout';

interface props {
	duration: number;
	level: string;
	portions: number;
}

function Details({ duration, level, portions }: props): JSX.Element {
	const detailList = [
		{
			title: 'Całkowity czas',
			description: `${duration} min`
		},
		{
			title: 'Trudność',
			description: level
		},
		{
			title: 'Porcji',
			description: portions
		}
	];

	return (
		<InfoCardLayout color="amber" title="Podstawowe informacje:">
			{detailList.map((item) => (
				<p key={item.title} className="italic">
					<span className="font-bold">{item.title}:</span> {item.description}
				</p>
			))}
		</InfoCardLayout>
	);
}

export default Details;
