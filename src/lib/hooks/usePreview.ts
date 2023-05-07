import { useEffect, useState } from 'react'

export const usePreview = (file: Blob | null, path: string | null) => {
	const [image, setImage] = useState(path)

	useEffect(() => {
		let isCancel = false

		if (file && !isCancel) {
			const reader = new FileReader()

			reader.onloadend = () => {
				const { result } = reader

				if (result) {
					setImage(result as string)
				}
			}

			reader.readAsDataURL(file)
		}

		if (image) {
		}
		return () => {
			isCancel = true
		}
	}, [file])

	return {
		image
	}
}
