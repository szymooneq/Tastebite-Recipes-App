import { Outlet } from 'react-router-dom'

import ErrorBoundary from './ErrorBoundary'
import AuthProvider from '../../lib/context/Auth'
import ThemeProvider from '../../lib/context/Theme'
import QueryProvider from '../../lib/context/Query'

import Footer from './Footer'
import Header from './Header'
import Navbar from './Navbar'

const Layout = (): JSX.Element => (
	<ErrorBoundary>
		<AuthProvider>
			<ThemeProvider>
				<div className="flex flex-col min-h-screen">
					<Header />
					<Navbar />
					<main className="flex-1">
						<QueryProvider>
							<div className="container mx-auto py-10">
								<Outlet />
							</div>
						</QueryProvider>
					</main>
					<Footer />
				</div>
			</ThemeProvider>
		</AuthProvider>
	</ErrorBoundary>
)

export default Layout
