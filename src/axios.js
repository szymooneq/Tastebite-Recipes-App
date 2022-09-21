import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://noclegi-react-3d024-default-rtdb.europe-west1.firebasedatabase.app'
})

export default instance