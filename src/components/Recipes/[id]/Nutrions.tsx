import { roundToTwo } from '../../../lib/helpers/roundToTwo';
import InfoCardLayout from './InfoCardLayout';

interface props {
	calories: number;
	protein: number;
	carbohydrates: number;
	fat: number;
}

function Nutrions({
	calories,
	protein,
	carbohydrates,
	fat
}: props): JSX.Element {
	const nutrionList = [
		{
			title: 'Wartość energetyczna',
			description: `${roundToTwo(calories * 4.2)} kJ / ${calories} kcal`
		},
		{
			title: 'Białko',
			description: `${protein} g`
		},
		{
			title: 'Węglowodany',
			description: `${carbohydrates} g`
		},
		{
			title: 'Tłuszcze',
			description: `${fat} g`
		}
	];
	return (
		<InfoCardLayout color="rose" title="Wartości odżywcze:">
			{nutrionList.map((item) => (
				<p key={item.title} className="italic">
					<span className="font-bold">{item.title}:</span> {item.description}
				</p>
			))}
		</InfoCardLayout>
	);
}

export default Nutrions;
