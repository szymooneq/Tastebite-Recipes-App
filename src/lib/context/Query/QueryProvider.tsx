import { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { QueryProvider } from './QueryProvider.types'
import LoadingSpinner from '../../../components/UI/LoadingSpinner/LoadingSpinner'

const queryClient = new QueryClient()

const QueryProvider = ({ children }: QueryProvider) => (
	<Suspense fallback={<LoadingSpinner />}>
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	</Suspense>
)

export default QueryProvider
