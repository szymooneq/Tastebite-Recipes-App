import { useState } from "react";
import Image from "../../UI/ImageWithSkeleton/Image";

export default function PreviewImage({ file, img }) {
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
