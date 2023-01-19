import { Component, ErrorInfo } from 'react';

interface props {
	children: React.ReactNode;
}

class ErrorBoundary extends Component<props> {
	public state = {
		hasError: false,
		error: null
	};

	public static getDerivedStateFromError(error: string) {
		return { hasError: true, error };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.log('Error boundry:');
		console.log(error);
		console.log('--------');
		console.log(errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div className="alert alert-danger">
					Wystąpił jakiś problem: {this.state.error}
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
