import { useState } from "react"
import { skeletonIcon } from "./skeletonIcon"

export default function Image({ className, src, alt }) {
  const [loadingImg, setLoadingImg] = useState(true)

  return (
    <>
      {loadingImg && (
        <div className={`${className} flex justify-center items-center animate-pulse bg-gray-300 dark:bg-gray-700`}>
          {skeletonIcon}
        </div>
      )}

      <img
        style={{ display: loadingImg ? "none" : "block" }}
        className={className}
        src={src}
        onLoad={() => setLoadingImg(false)}
        alt={alt}
      />
    </>
  )
}
