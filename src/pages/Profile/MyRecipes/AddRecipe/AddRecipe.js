import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../context/authContext';
import { db } from "../../../../firebase";
import { uploadFileToStorage } from "../../../../lib/helpers/uploadFileToStorage";
import useDocumentTitle from "../../../../lib/hooks/useDocumentTitle";
import RecipeForm from '../RecipeForm';

export default function AddRecipe() {
  useDocumentTitle("Profil | Moje przepisy | Nowy")
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async form => {
    setLoading(true)
    const timeStamp = Timestamp.now()
    let data = {...form, userId: user.uid, createdAt: timeStamp }
    try {
      if(data.file) {
        const downloadURL = await uploadFileToStorage(data.file, user.uid, timeStamp.seconds)
        data = {...data, img: downloadURL}
      }
      delete(data.file)
      const res = await addDoc(collection(db, "recipes"), data);
      console.log("Document written with ID: ", res.id);
      navigate('/profil/przepisy')
    } catch (error) {
      // TODO: alert with error while adding data to database
      console.error("Error adding document: ", error);
    }
    setLoading(false)
  }

  return (
    <RecipeForm loading={loading} buttonText="Dodaj przepis" onSubmit={submit} />
  );
}
