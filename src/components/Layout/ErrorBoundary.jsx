import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    /* console.log('Error boundry:')
    console.log(error)
    console.log('--------')
    console.log(errorInfo) */
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger">
          Wystąpił jakiś problem: {this.state.error.message}
        </div>
      )
    }

    return this.props.children
  }
}
