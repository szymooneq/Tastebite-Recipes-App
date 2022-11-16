import { useQuery } from "@tanstack/react-query"
import { doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { useContext } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import RecipeForm from '../../../components/Forms/RecipeForm'
import LoadingIcon from '../../../components/UI/LoadingIcon'
import authContext from '../../../context/authContext'
import { db } from "../../../firebase"
import { getEditRecipe, uploadFileToStorage } from "../../../lib/api/recipes"
import useDocumentTitle from "../../../lib/hooks/useDocumentTitle"

export default function EditRecipe() {
  useDocumentTitle("Profil | Moje przepisy | Edycja")
  const { id } = useParams()
  const { user } = useContext(authContext)
  const navigate = useNavigate()

  const { isLoading, error, data } = useQuery({
    queryKey: ['editRecipe', id],
    queryFn: () => getEditRecipe(id, user),
    cacheTime: 1
  })

  const editExistingRecipe = async (form) => {
    let newData = {...form, lastEdit: serverTimestamp()}
    
    if(newData.file) {
      const downloadURL = await uploadFileToStorage(newData.file, user.uid, data.createdAt.seconds).catch(error => console.log(error))
      newData = {...newData, img: downloadURL}
    }
    
    const { file, createdAt, userId, ...restParams } = newData
    const docRef = doc(db, "recipes", id)
    await updateDoc(docRef, restParams).catch(error => console.log(error))
    navigate('/profil/przepisy')
  }

  if (isLoading) return <LoadingIcon />

  if (error) return 'An error has occurred: ' + error.message

  return data !== "404" ? <RecipeForm recipe={data} buttonText="Zaaktualizuj przepis" onSubmit={editExistingRecipe} /> : <Navigate to="/profil/przepisy" />
}
