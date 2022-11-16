import { addDoc, collection, Timestamp } from "firebase/firestore"
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import RecipeForm from '../../../components/Forms/RecipeForm'
import AuthContext from '../../../context/AuthContext'
import { db } from "../../../firebase"
import { uploadFileToStorage } from "../../../lib/api/recipes"
import useDocumentTitle from "../../../lib/hooks/useDocumentTitle"

export default function AddRecipe() {
  useDocumentTitle("Profil | Moje przepisy | Nowy")
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const addRecipeToDatabase = async (form) => {
    const timeStamp = Timestamp.now()
    let data = {...form, userId: user.uid, createdAt: timeStamp }

    try {
      if(data.file) {
        const downloadURL = await uploadFileToStorage(data.file, user.uid, timeStamp.seconds)
        data = {...data, img: downloadURL}
      }
      
      const { file, ...restParams } = data
      
      const res = await addDoc(collection(db, "recipes"), restParams)
      navigate('/profil/przepisy')
    } catch (error) {
      
      // TODO: alert with error while adding data to database
      console.error("Error adding document: ", error)
    }
  }

  return <RecipeForm buttonText="Dodaj przepis" onSubmit={addRecipeToDatabase} />
}
