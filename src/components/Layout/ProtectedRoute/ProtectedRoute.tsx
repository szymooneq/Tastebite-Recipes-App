import { Navigate } from 'react-router-dom'
import { ProtectedRouteProps } from './ProtectedRoute.types'
import { useAuth } from '../../../lib/hooks/useAuth'

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
	const { user } = useAuth()

	return user ? <>{children}</> : <Navigate to="/" />
}

export default ProtectedRoute
