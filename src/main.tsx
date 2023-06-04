import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import ErrorBoundary from '@/components/Layout/ErrorBoundary'
import AuthProvider from '@/context/Auth'
import ThemeProvider from '@/context/Theme'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundary>
			<AuthProvider>
				<ThemeProvider>
					<RouterProvider router={router} />
				</ThemeProvider>
			</AuthProvider>
		</ErrorBoundary>
	</React.StrictMode>
)
