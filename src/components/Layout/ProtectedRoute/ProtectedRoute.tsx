import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ProtectedRouteProps } from './ProtectedRoute.types'

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { user } = useAuth()

	return user ? children : <Navigate to="/" />
}

export default ProtectedRoute
