import { Outlet } from 'react-router-dom'
import QueryProvider from '../../lib/context/Query'

import Footer from './Footer'
import Header from './Header'
import Navbar from './Navbar'

const Layout = (): JSX.Element => (
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
)

export default Layout
