import { useReducer, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Layout/Header/Header';
import NewMenu from './components/Layout/Menu/NewMenu';
import Searchbar from "./components/UI/Searchbar/Searchbar";
import Layout from './components/Layout/Layout';
import Footer from './components/Layout/Footer/Footer';
import ThemeButton from './components/UI/ThemeButton/ThemeButton';
import ThemeContext from './context/themeContext';
import AuthContext from './context/authContext';
import ReducerContext from './context/reducerContext';
import InspiringQuote from './components/InspiringQuote/InspiringQuote';
import { reducer, initialState } from './reducer';
import Home from './pages/Home/Home';
import Hotel from './pages/Hotel/Hotel';
import Search from './pages/Search/Search';
import ProfileDetails from './pages/Profile/ProfileDetails/ProfileDetails';
import MyHotels from './pages/Profile/MyHotels/MyHotels';
import AddHotel from './pages/Profile/MyHotels/AddHotel/AddHotel';
import EditHotel from './pages/Profile/MyHotels/EditHotel/EditHotel';
import NotFound from './pages/404/404';
import Login from './pages/Auth/Login/Login';
import ErrorBoundary from './hoc/ErrorBoundary';
import ProtectedRoutes from './hoc/ProtectedRoutes';
import Register from './pages/Auth/Register/Register';
const Profile = lazy(() => import('./pages/Profile/Profile'));

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const header = (
    <Header>
      <InspiringQuote />
      <Searchbar />
      <ThemeButton />
    </Header>)

  const menu = <NewMenu />

  const content = (
    <>
      <ErrorBoundary>
        <Suspense fallback={<p>Ładowanie...</p>}>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="hotele/:id" element={<Hotel />} />
            <Route path="szukaj">
              <Route index element={<Search />} />
              <Route path=":term" element={<Search />} />
            </Route>

            <Route element={<ProtectedRoutes />}>
              <Route path="profil" element={<Profile />}>
                <Route index element={<ProfileDetails />} />
                <Route path="hotele">
                  <Route index element={<MyHotels />} />
                  <Route path="dodaj" element={<AddHotel />} />
                  <Route path="edytuj/:id" element={<EditHotel />} />
                </Route>
              </Route>
            </Route>

            <Route path="zaloguj" element={<Login />} />
            <Route path="rejestracja" element={<Register />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
    )
      
  const footer = <Footer />

  return (
    <Router>
      <AuthContext.Provider value={{ 
        user: state.user,
        login: (user) => dispatch({ type: 'login', user }),
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
    </Router>
  )
}

export default App;
