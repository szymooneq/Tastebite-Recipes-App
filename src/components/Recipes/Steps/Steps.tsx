import { StepsProps } from './Steps.types'

const renderSteps = (content: string[]) =>
	content.length > 0 ? (
		content.map((item, index) => (
			<li key={index} className="mb-3">
				{item}
			</li>
		))
	) : (
		<p>Brak danych</p>
	)

const Steps = ({ content, isMobile = false }: StepsProps): JSX.Element => (
	<div className={`${isMobile ? 'hidden lg:block' : 'block lg:hidden'} my-3 dark:text-white`}>
		<h3 className="mb-2 text-2xl font-bold text-green-600 dark:text-green-500">Wykonanie</h3>
		<ol className="list-decimal list-inside dark:text-gray-400">{renderSteps(content)}</ol>
	</div>
)

export default Steps
