import { useState } from 'react'
import { ImageProps } from './Image.types'
import placeholder from '@/assets/images/placeholder.jpg'
import * as icon from '@/assets/svg'

const Image = ({ className, src, alt }: ImageProps): JSX.Element => {
	const [isLoading, setIsLoading] = useState<boolean>(true)

	return (
		<>
			{isLoading ? (
				<div
					className={`${className} flex justify-center items-center animate-pulse bg-gray-300 dark:bg-gray-700`}>
					{icon.skeletonImage}
				</div>
			) : null}

			<img
				style={{ display: isLoading ? 'none' : 'block' }}
				className={className}
				src={src ? src : placeholder}
				onLoad={() => setIsLoading(false)}
				alt={src ? alt : ''}
			/>
		</>
	)
}

export default Image
