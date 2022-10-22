import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingIcon from '../../../../components/UI/LoadingIcon/LoadingIcon';
import AuthContext from '../../../../context/AuthContext';
import { db } from "../../../../firebase";
import { uploadFileToStorage } from "../../../../helpers/uploadFileToStorage";
import RecipeForm from '../RecipeForm';

export default function EditRecipe(props) {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState({})
  const [recipe, setRecipe] = useState(null)
  const navigate = useNavigate()

  const submit = async form => {
    setLoading(true)
    let data = {...form, lastEdit: serverTimestamp()}
    try {
      if(data.file) {
        const downloadURL = await uploadFileToStorage(data.file, user.uid, created.seconds)
        data = {...data, img: downloadURL }
      }
      delete(data.file)

      const docRef = doc(db, "recipes", id);
      updateDoc(docRef, data)
      .then(docRef => {
          console.log("A New Document Field has been added to an existing document");
      })
      .catch(error => {
          console.log(error);
      })
      navigate('/profil/przepisy')
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const fetchData = useCallback(async () => {
    try {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().userId === user.uid) {
        const fetchData = docSnap.data()
        setCreated(fetchData.createdAt)
        delete(fetchData.createdAt)
        delete(fetchData.userId)
        setRecipe(fetchData)
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!")
        navigate('/profil/przepisy')
      }
    } catch (ex) {
      console.log(ex.response)
    }
  }, [id, navigate, user.uid]) 

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return recipe ? <RecipeForm recipe={recipe} loading={loading} buttonText="Zaaktualizuj przepis" onSubmit={submit} /> : <LoadingIcon />
}
