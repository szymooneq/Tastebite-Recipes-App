import { doc, getDoc } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingIcon from '../../../../components/UI/LoadingIcon/LoadingIcon';
import AuthContext from '../../../../context/AuthContext';
import { db } from "../../../../firebase";
import axios from '../../../../firebase/axios';
import RecipeForm from '../RecipeForm';

export default function EditRecipe(props) {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const submit = async form => {
    await axios.patch(`/recipes/${id}.json?auth=${user.token}`, form)
    navigate('/profil/hotele?update')
  }

  const fetchData = useCallback(async () => {
    try {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRecipe(docSnap.data())
        // delete(recipe.timeStamp)
        // delete(recipe.userId)
        // console.log(recipe)
        // console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      /* const res = await axios.get(`/recipes/${id}.json`)
      if (res.data.status === false) navigate('/')
      setRecipe(res.data)
      document.title = `${res.data.name}` */
    } catch (ex) {
      console.log(ex.response)
    }
    setLoading(false)
  }, [id]) 

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return loading ? <LoadingIcon /> : (
    <>
      {recipe && <RecipeForm recipe={recipe} buttonText="Zaaktualizuj przepis" onSubmit={submit} />}
    </>
  )
}
