import { Component, ErrorInfo } from 'react'
import { ErrorBoundaryProps } from './ErrorBoundary.types'

class ErrorBoundary extends Component<ErrorBoundaryProps> {
	public state = {
		error: null
	}

	public static getDerivedStateFromError(error: string) {
		return { hasError: true, error }
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.log('Error boundry:')
		console.log(error)
		console.log('--------')
		console.log(errorInfo)
	}

	public render() {
		const { error } = this.state
		const { children } = this.props

		if (error) {
			return <div>Wystąpił jakiś problem: {error}</div>
		}

		return children
	}
}

export default ErrorBoundary
