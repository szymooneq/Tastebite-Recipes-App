import { useState } from 'react'
import LoadingIcon from '../UI/LoadingIcon/LoadingIcon'

export default function PreviewImage(props) {
  const [preview, setPreview] = useState(props?.img)

  console.log(props)

  if(props.file) {
    const reader = new FileReader()
    reader.readAsDataURL(props.file)
    reader.onload = () => {
      setPreview(reader.result)
    }
  }

  return preview ? <img className="w-full mb-2 h-52 rounded-lg object-cover object-center" src={preview} alt="Preview" /> : <LoadingIcon />
}
