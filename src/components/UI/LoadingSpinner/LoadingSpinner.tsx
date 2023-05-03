import * as icon from '../../../assets/svg'

const LoadingSpinner = (): JSX.Element => (
	<div className="flex items-center justify-center h-96" role="status">
		{icon.spinner}
		<span className="sr-only">Loading...</span>
	</div>
)

export default LoadingSpinner
