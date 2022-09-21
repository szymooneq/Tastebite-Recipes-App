import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: 'AIzaSyAk-gqSkZCXrFI4ItYcXbZMSEptQVugPVA'
  }
})

export default instance