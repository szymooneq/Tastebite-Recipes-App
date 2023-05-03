import { ContentType, DetailCardProps, ListType } from './DetailCard.types'

const baseStyles = 'p-3 w-full rounded text-gray-700 bg-gray-100 dark:text-white dark:bg-gray-800'

const variant = {
	amber: 'text-amber-600 dark:text-amber-500',
	rose: 'text-rose-600 dark:text-rose-500',
	blue: 'text-blue-600 dark:text-blue-500'
}

const renderList = (array?: ListType) => {
	if (!array) return null

	return (
		<ul className="list-disc list-inside italic">
			{array.length ? array.map((item, index) => <li key={index}>{item}</li>) : <p>Brak danych</p>}
		</ul>
	)
}

const renderContent = (array?: ContentType) => {
	if (!array) return null

	return array.length ? (
		array.map((item, index) => (
			<p key={index} className="italic">
				<span className="font-bold">{item.title}:</span> {item.description}
			</p>
		))
	) : (
		<p>Brak danych</p>
	)
}

const DetailCard = ({ color, title, content, list }: DetailCardProps): JSX.Element => (
	<div className={`${baseStyles} ${list ? 'md:flex-1' : null}`}>
		<h3 className={`text-xl font-bold ${variant[color]}`}>{title}</h3>
		{renderList(list)}
		{renderContent(content)}
	</div>
)

export default DetailCard
