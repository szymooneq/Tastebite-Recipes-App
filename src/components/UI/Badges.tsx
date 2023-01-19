import { ChartBarIcon, ClockIcon, StarIcon } from '@heroicons/react/20/solid';

interface props {
	duration: number;
	level: string;
	rating: number;
}

function Badges({ duration, level, rating }: props): JSX.Element {
	const badgeList = [
		{
			color:
				'bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900',
			icon: ClockIcon,
			description: `${duration} min`
		},
		{
			color:
				'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900',
			icon: ChartBarIcon,
			description: level
		},
		{
			color:
				'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900',
			icon: StarIcon,
			description: `${rating ?? 'Brak ocen'}`
		}
	];

	return (
		<div className="flex gap-2">
			{badgeList.map((badge) => (
				<span
					className={`px-2.5 py-0.5 w-max inline-flex items-center text-xs font-semibold rounded-full ${badge.color}`}>
					<badge.icon className="mr-1 w-3 h-3" />
					{badge.description}
				</span>
			))}
		</div>
	);
}

export default Badges;
