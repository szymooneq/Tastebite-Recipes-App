import { ReactLocation, Route } from "react-location"
import ProtectedRoutes from "./components/Content/ProtectedRoutes"
import NotFound from "./pages/404/404"
import Login from "./pages/Auth/Login/Login"
import Register from "./pages/Auth/Register/Register"
import Home from "./pages/Home/Home"
import ProductView from "./pages/ProductView/ProductView"
import AddRecipe from "./pages/Profile/MyRecipes/AddRecipe/AddRecipe"
import EditRecipe from "./pages/Profile/MyRecipes/EditRecipe/EditRecipe"
import MyRecipes from "./pages/Profile/MyRecipes/MyRecipes"
import Profile from "./pages/Profile/Profile"
import ProfileDetails from "./pages/Profile/ProfileDetails/ProfileDetails"
import Search from "./pages/Search/Search"

export const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'logowanie',
    element: <Login />
  },
  {
    path: 'rejestracja',
    element: <Register />
  },
  {
    path: "przepis/:id",
    element: <ProductView />
  },
  {
    path: "szukaj/:term",
    element: <Search />,
  },
  /* {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "profil",
        element: <Profile />,
        children: [
          {
            path: "/",
            element: <ProfileDetails />
          },
          {
            path: "przepisy",
            element: <MyRecipes />,
            children: [
              {
                path: "dodaj",
                element: <AddRecipe />
              },
              {
                path: "edytuj/:id",
                element: <EditRecipe />
              }
            ]
          }
        ]
      }
    ]
  }, */
  {
    path: "*",
    element: <NotFound />
  },
]

export const location = new ReactLocation()
