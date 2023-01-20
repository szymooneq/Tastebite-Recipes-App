import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AppContext from '../../lib/context/AppContext';
import Spinner from '../UI/Spinner';
import ErrorBoundary from './ErrorBoundary';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Navbar from './Navbar/Menu/Navbar';

const queryClient = new QueryClient();

function RootLayout(): JSX.Element {
	return (
		<ErrorBoundary>
			<AppContext>
				<div className="flex flex-col min-h-screen">
					<div className="flex-1">
						<Header />
						<Navbar />
						<div className="container my-8 mx-auto">
							<Suspense fallback={<Spinner />}>
								<QueryClientProvider client={queryClient}>
									<Outlet />
								</QueryClientProvider>
							</Suspense>
						</div>
					</div>
					<Footer />
				</div>
			</AppContext>
		</ErrorBoundary>
	);
}

export default RootLayout;
