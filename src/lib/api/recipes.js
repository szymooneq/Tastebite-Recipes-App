import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { db, storage } from "../../firebase"

export const getAllRecipes = async () => {
  let recipeList = []
  const q = query(collection(db, "recipes"), where("status", "==", true))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    recipeList.push({ id: doc.id, ...doc.data() })
  })
  
  return recipeList
}

export const getRecipeByID = async (id) => {
  let recipe
  const docRef = doc(db, "recipes", id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    recipe = docSnap.data()
  }

  return recipe
}

export const getUserRecipe = async (id, user) => {
  let recipe
  const docRef = doc(db, "recipes", id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists() && docSnap.data().userId === user.uid) {
    recipe = docSnap.data()
  } else {
    console.log("No such document!")
    recipe = null
  }

  return recipe
}

export const getRecipesByTerm = async (term) => {
  let recipeList = []
  const q = query(collection(db, "recipes"), where("status", "==", true))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    recipeList.push({ id: doc.id, ...doc.data() })
  })
  
  return term ? recipeList.filter(item => item.name.toLowerCase().includes(term.toLowerCase())) : null
}

export const uploadFileToStorage = (file, recipeOwnerId, timeStamp) => {
  return new Promise(resolve => {
    const storageName = timeStamp + recipeOwnerId
    const storageRef = ref(storage, `${recipeOwnerId}/${storageName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
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
        })
      }
    )
  })
}