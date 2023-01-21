import { useState } from 'react';
import { skeletonImage } from './SVG/skeletonImage';

interface props {
	className: string;
	src: string;
	alt: string;
}

function Image({ className, src, alt }: props): JSX.Element {
	const [loadingImg, setLoadingImg] = useState<boolean>(true);

	return (
		<>
			{loadingImg && (
				<div
					className={`${className} flex justify-center items-center animate-pulse bg-gray-300 dark:bg-gray-700`}>
					{skeletonImage}
				</div>
			)}

			<img
				style={{ display: loadingImg ? 'none' : 'block' }}
				className={className}
				src={src ? src : ''}
				onLoad={() => setLoadingImg(false)}
				alt={alt}
			/>
		</>
	);
}

export default Image;
