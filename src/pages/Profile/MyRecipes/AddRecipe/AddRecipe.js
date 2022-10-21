import { async } from "@firebase/util";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../context/AuthContext';
import { db, storage } from "../../../../firebase";
// import axios from '../../../../firebase/axios';
import RecipeForm from '../RecipeForm';

export default function AddRecipe(props) {
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const uploadFile = (file, uid) => {
    return new Promise(resolve => {
      const newName = new Date().getTime() + file.name
      const storageRef = ref(storage, `${uid}/${newName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break
          }
        }, 
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              break
            case 'storage/unknown':
              break
            default:
              break
          }
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
            resolve(downloadURL)
          });
        }
      );
    })
  }

  const submit = async form => {
    // await axios.post(`/recipes.json?auth=${user.token}`, form)
    setLoading(true)
    let data = {...form}

    if(data.file) {
      const downloadURL = await uploadFile(data.file, data.userId)
      data = {...data, img: downloadURL}
    }

    delete(data.file)

    try {
      const res = await addDoc(collection(db, "recipes"), data);
      console.log("Document written with ID: ", res.id);
      navigate('/profil/przepisy')
    } catch (error) {
      // TODO: Alert with error while adding data to database
      console.error("Error adding document: ", error);
    }

    setLoading(false)
  }

  return (
    <RecipeForm loading={loading} buttonText="Dodaj przepis" recipe={{}} onSubmit={submit} />
  );
}
