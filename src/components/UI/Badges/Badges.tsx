import { ChartBarIcon, ClockIcon, StarIcon } from '@heroicons/react/20/solid'
import { BadgesProps } from './Badges.types'

const colors = {
	easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
	medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
	hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

const description = {
	easy: 'Łatwy',
	medium: 'Średni',
	hard: 'Trudny'
}

// TODO: add different colors for levels
const Badges = ({ duration, level }: BadgesProps): JSX.Element => {
	const content = [
		{
			name: 'duration',
			color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
			icon: ClockIcon,
			description: `${duration} min`
		},
		{
			name: 'level',
			color: colors[level],
			icon: ChartBarIcon,
			description: description[level]
		},
		{
			name: 'rating',
			color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
			icon: StarIcon,
			description: 'Brak'
		}
	]

	return (
		<div className="flex gap-2 flex-wrap">
			{content.map((badge) => (
				<span
					key={badge.name}
					className={`px-2.5 py-0.5 w-max inline-flex items-center text-xs font-semibold rounded-full ${badge.color}`}>
					<badge.icon className="mr-1 w-3 h-3" />
					{badge.description}
				</span>
			))}
		</div>
	)
}

export default Badges
