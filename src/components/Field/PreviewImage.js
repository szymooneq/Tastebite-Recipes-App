import { useState } from 'react'
import LoadingIcon from '../UI/LoadingIcon/LoadingIcon'

export default function PreviewImage(props) {
  const [preview, setPreview] = useState(props?.img)
  const [loading, setLoading] = useState(true)

  if(props.file) {
    const reader = new FileReader()
    reader.readAsDataURL(props.file)
    reader.onload = () => {
      setPreview(reader.result)
    }
  }

  return preview && (
    <>
      {loading && <LoadingIcon />}
      <img 
        style={{display: loading ? "none" : "block"}} 
        src={preview} 
        alt="Preview"
        onLoad={() => setLoading(false)} 
        className="w-full mb-2 h-52 rounded-lg object-cover object-center" />
    </>
  )
}
