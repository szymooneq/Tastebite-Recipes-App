import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Hotels from './components/Hotels/Hotels';
import LoadingIcon from './components/UI/LoadingIcon/LoadingIcon';
import Searchbar from "./components/UI/Searchbar/Searchbar";
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import ThemeButton from './components/UI/ThemeButton/ThemeButton';
import ThemeContext from './context/ThemeContext';
import AuthContext from './context/AuthContext';
import BestHotel from './components/Hotels/BestHotel/BestHotel';
import InspiringQuote from './components/InspiringQuote/InspiringQuote';
import useLocalStorage from './hooks/useLocalStorage';

const backendHotels = [
  {
    id: 0,
    name: 'Pod akacjami',
    city: 'Warszawa',
    rating: 8.3,
    description: 'Lorem officia cupidatat velit pariatur do quis eiusmod voluptate.',
    image: ''
  },
  {
    id: 1,
    name: 'Dębowy',
    city: 'Lublin',
    rating: 8.8,
    description: 'Lorem officia cupidatat velit pariatur do quis eiusmod voluptate.',
    image: ''
  }
]

const reducer = (state, action) => {
  switch (action.type) {
    case 'change-theme':
      const theme = state.theme === 'danger' ? 'primary' : 'danger'
      return { ...state, theme }
    case 'set-hotels':
      return { ...state, hotels: action.hotels }
    case 'set-loading':
      return { ...state, loading: action.loading }
    case 'login':
      return { ...state, isAuthenticated: true }
    case 'logout':
      return { ...state, isAuthenticated: false }
    default:
      throw new Error('Nie ma takiej akcji: ' + action.type)
  }
}

const initialState = {
  theme: 'danger',
  hotels: [],
  loading: true,
  isAuthenticated: true
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [storage, setStorage] = useLocalStorage('klucz', 'wartość startowa')

  const searchHandler = (term) => {
    const newHotels = [...backendHotels].filter(x => x.name.toLowerCase().includes(term.toLowerCase()));
    /* setHotels(newHotels) */
    dispatch({ type: 'set-hotels', hotels: newHotels })
  }

  const getBestHotel = () => {
    if(state.hotels.length < 2) {
      return null
    } else {
      return state.hotels.sort((a, b) => a.rating > b.rating ? -1 : 1)[0]
    }
  }
  
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'set-hotels', hotels: backendHotels })
      dispatch({ type: 'set-loading', loading: false })
    }, 1000)
  }, [])


  const header = (
    <Header>
      <InspiringQuote />
      <Searchbar onSearch={term => searchHandler(term)} />
      <ThemeButton />
    </Header>)

  const menu = <Menu />

  const content = state.loading 
    ? <LoadingIcon /> 
    : <>
        <input 
          type="text" 
          value={storage} 
          onChange={e => setStorage(e.target.value)} />
        {getBestHotel() && <BestHotel getHotel={getBestHotel} />}
        <Hotels hotels={state.hotels} />
      </>

  const footer = <Footer />

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: state.isAuthenticated,
      login: () => dispatch({ type: 'login' }),
      logout: () => dispatch({ type: 'logout' })
    }}>
      <ThemeContext.Provider value={{
        color: state.theme,
        changeTheme: () => dispatch({ type: 'change-theme' })
      }}>
        <Layout 
          header={header}
          menu={menu}
          content={content}
          footer={footer}
        />
      </ThemeContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;
