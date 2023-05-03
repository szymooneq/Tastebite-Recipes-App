import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import AppContext from '../../lib/context/Auth/AuthProvider'
import Spinner from '../UI/LoadingSpinner/LoadingSpinner'
import ErrorBoundary from './ErrorBoundary'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Navbar from './Navbar/Menu/Navbar'

const queryClient = new QueryClient()

function RootLayout(): JSX.Element {
	return (
		<ErrorBoundary>
			<AppContext>
				<div className="flex flex-col min-h-screen">
					<Header />
					<Navbar />
					<main className="flex-1">
						<Suspense fallback={<Spinner />}>
							<QueryClientProvider client={queryClient}>
								<div className="container mx-auto py-10">
									<Outlet />
								</div>
							</QueryClientProvider>
						</Suspense>
					</main>
					<Footer />
				</div>
			</AppContext>
		</ErrorBoundary>
	)
}

export default RootLayout
