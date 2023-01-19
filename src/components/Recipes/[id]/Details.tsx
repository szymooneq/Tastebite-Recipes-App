import Item from './Item';

interface props {
	duration: number;
	level: string;
	portions: number;
}

function Details({ duration, level, portions }: props): JSX.Element {
	return (
		<div
			className={`p-3 flex flex-col justify-center w-full h-max rounded text-white bg-amber-600 sm:w-max lg:w-full`}>
			<p className="text-xl font-bold">Podstawowe informacje:</p>
			<Item title="Czas całkowity" content={`${duration} minut`} />
			<Item title="Poziom trudności" content={level} />
			<Item title="Liczba porcji" content={portions} />
		</div>
	);
}

export default Details;
