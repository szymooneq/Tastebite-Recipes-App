import { useEffect, useState } from 'react'

export const usePreview = (file: Blob | null, path: string | null) => {
	const [image, setImage] = useState(path)

	const handleUpdateImage = () => {
		if (file) {
			const reader = new FileReader()

			reader.onloadend = () => {
				const { result } = reader

				if (result) {
					return setImage(result as string)
				}
			}

			reader.readAsDataURL(file)
		}

		if (path) {
			setImage(path)
		}
	}

	useEffect(() => {
		let isCancel = false

		if (!isCancel) {
			handleUpdateImage()
		}

		return () => {
			isCancel = true
		}
	}, [file])

	return { image }
}
