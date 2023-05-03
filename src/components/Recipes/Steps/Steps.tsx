import { StepsProps } from './Steps.types'

const Steps = ({ content, isMobile = false }: StepsProps): JSX.Element => (
	<div className={`${isMobile ? 'hidden' : 'block'} my-3 lg:block dark:text-white`}>
		<h3 className="mb-2 text-2xl font-bold text-green-600 dark:text-green-500">Wykonanie</h3>
		<ol className="list-decimal list-inside dark:text-gray-400">
			{content.length > 0 ? (
				content.map((item, index) => (
					<li key={index} className="mb-3">
						{item}
					</li>
				))
			) : (
				<p>Brak danych</p>
			)}
		</ol>
	</div>
)

export default Steps
