import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getRecipeData } from '@/lib/firebase/getRecipe'
import { useDocumentTitle } from '@/lib/hooks/useDocumentTitle'

import View from '@/components/Recipes/View'
import LoadingSpinner from '@/components/UI/LoadingSpinner'

// TODO: Rating system
export default function RecipePage(): JSX.Element {
	const { id } = useParams()
	const { setTitle } = useDocumentTitle('Tastebite Recipe App')
	const navigate = useNavigate()

	if (!id) {
		navigate('/')
		return <></>
	}

	const { isLoading, data } = useQuery({
		queryKey: ['recipe', id],
		queryFn: () => getRecipeData(id),
		useErrorBoundary: true
	})

	useEffect(() => {
		if (data) setTitle(`${data.name} | Tastebite Recipe App`)
	}, [data])

	if (isLoading) return <LoadingSpinner />

	if (data) return <View content={data} />

	return <></>
}
