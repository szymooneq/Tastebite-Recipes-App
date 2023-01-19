import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../../lib/context/AppContext';

interface props {
	children: React.ReactNode;
}

function ProtectedRoute({ children }: props): JSX.Element {
	const { state } = useContext(Context);
	return state.user ? <Navigate to="/" /> : <>{children}</>;
}

export default ProtectedRoute;
