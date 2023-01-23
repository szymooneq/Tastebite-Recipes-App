import { ChartBarIcon, ClockIcon, StarIcon } from '@heroicons/react/20/solid';

interface props {
	duration: number;
	level: string;
	rating?: number;
}

function Badges({ duration, level, rating }: props): JSX.Element {
	const badgeList = [
		{
			name: 'duration',
			color:
				'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
			icon: ClockIcon,
			description: `${duration} min`
		},
		{
			name: 'level',
			color:
				'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
			icon: ChartBarIcon,
			description: level
		},
		{
			name: 'rating',
			color:
				'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
			icon: StarIcon,
			description: `${rating ?? 'Brak ocen'}`
		}
	];

	return (
		<div className="flex gap-2">
			{badgeList.map((badge) => (
				<span
					key={badge.name}
					className={`px-2.5 py-0.5 w-max inline-flex items-center text-xs font-semibold rounded-full ${badge.color}`}>
					<badge.icon className="mr-1 w-3 h-3" />
					{badge.description}
				</span>
			))}
		</div>
	);
}

export default Badges;
