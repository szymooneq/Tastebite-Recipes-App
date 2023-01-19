import { useState } from 'react';
import Image from '../../UI/ImageWithSkeleton/Image';

interface props {
	file: {};
	img: string;
}

function PreviewImage({ file, img }: props): JSX.Element {
	const [preview, setPreview] = useState(img);

	if (file) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setPreview(reader.result);
		};
	}

	return (
		preview && (
			<Image
				className="w-full mb-2 h-52 rounded-lg object-cover object-center"
				src={preview}
				alt="Food preview"
			/>
		)
	);
}

export default PreviewImage;
