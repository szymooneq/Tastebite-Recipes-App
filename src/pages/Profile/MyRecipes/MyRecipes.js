import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Alert from "../../../components/UI/Alert/Alert";
import LoadingIcon from "../../../components/UI/LoadingIcon/LoadingIcon";
import AuthContext from "../../../context/AuthContext";
import { db } from "../../../firebase";
import axios from "../../../firebase/axios";

export default function MyRecipes(props) {
  const { user } = useContext(AuthContext)
  const { search } = useLocation()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    let list = []

    try {
      const q = query(collection(db, "recipes"), where("userId", "==", user.uid))
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      })
      
      setRecipes(list)

    } catch (ex) {
      console.log(ex.response)
    }
    setLoading(false)
    
    /* try {
      const res = await axios.get('/recipes.json')
      /* const querySnapshot = await getDocs(collection(db, "recipes"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
      const newHotel = objectToArrayWithId(res.data).filter(product => product.user_id === user.userId)
      setRecipes(newHotel)
      setLoading(false)
    } catch (ex) {
      console.log(ex.response)
    } */
  }, [user.uid]) 

  const deleteHandler = async id => {
    try {
      await axios.delete(`/recipes/${id}.json`)
      setRecipes(recipes.filter(x => x.id !== id))
    } catch (ex) {
      console.log(ex.response)
    }
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return loading ? <LoadingIcon /> : (
    <>
      {search.includes("?update") && <Alert message="Przepis został zaaktualizowany!" theme="success" />}
      
      <div className="mb-2 overflow-x-auto">
          {recipes ? (
          <table className="mx-auto w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="uppercase text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="py-3 px-6">
                    Nazwa
                </th>
                <th className="py-3 px-6">
                    Status
                </th>
                <th className="py-3 px-6">
                    Opcje
                </th>
              </tr>
            </thead>
            <tbody>
            {recipes.map(product => (
              <tr key={product.id} className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
                <td className="p-4 text-left font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                  {product.name}
                </td>
                <td className="p-4">
                  {product.status
                      ? <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-200 dark:text-green-900">Aktywny</span>
                      : <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-200 dark:text-red-900">Ukryty</span>
                    }
                </td>
                <td className="p-4 flex gap-1 justify-center font-semibold">
                    <Link to={`edytuj/${product.id}`} className="text-blue-600 dark:text-blue-500 hover:underline">Edytuj</Link>
                    <button onClick={() => deleteHandler(product.id)} className="text-red-600 dark:text-red-500 hover:underline">Usuń</button>
                </td>
              </tr>
            ))}
            </tbody>
        </table>
          ) : (<p>Nie masz jeszcze żadnego hotelu.</p>)}
      </div>
      <Link 
        to={"dodaj"} 
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 block w-max mx-auto mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Dodaj przepis</Link>
    </>
  )
}