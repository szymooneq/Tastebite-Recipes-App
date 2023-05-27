import { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import { QueryProviderProps } from './QueryProvider.types'

const queryClient = new QueryClient()

const QueryProvider = ({ children }: QueryProviderProps): JSX.Element => (
	<Suspense fallback={<LoadingSpinner />}>
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	</Suspense>
)

export default QueryProvider
