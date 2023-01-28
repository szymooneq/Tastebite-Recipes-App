import InfoCardLayout from './InfoCardLayout';

interface props {
	data: string[];
}

function Ingredients({ data }: props): JSX.Element {
	return (
		<InfoCardLayout color="blue" title="Składniki:">
			<ul className="list-disc list-inside italic">
				{data.length ? (
					data.map((item, id) => <li key={id}>{item}</li>)
				) : (
					<p>Brak informacji</p>
				)}
			</ul>
		</InfoCardLayout>
	);
}

export default Ingredients;
