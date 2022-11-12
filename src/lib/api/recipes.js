import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase"

export const getAllRecipes = async () => {
  let list = []
  const q = query(collection(db, "recipes"), where("status", "==", true))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    list.push({ id: doc.id, ...doc.data() })
  })
  console.log(list)
  return list
}