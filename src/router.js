import React from "react"
import { createBrowserRouter } from "react-router-dom"
import RootLayout from "./components/Layout/RootLayout"

const NotFound = React.lazy(() => import("./pages/404/404"))
const Home = React.lazy(() => import("./pages/Home/Home"))
const Search = React.lazy(() => import("./pages/Search/Search"))
const ProductView = React.lazy(() => import("./pages/ProductView/ProductView"))
const Profile = React.lazy(() => import("./pages/Profile/Profile"))
const ProfileDetails = React.lazy(() => import("./pages/Profile/ProfileDetails/ProfileDetails"))
const MyRecipes = React.lazy(() => import("./pages/Profile/MyRecipes/MyRecipes"))
const AddRecipe = React.lazy(() => import("./pages/Profile/MyRecipes/AddRecipe/AddRecipe"))
const EditRecipe = React.lazy(() => import("./pages/Profile/MyRecipes/EditRecipe/EditRecipe"))
const Login = React.lazy(() => import("./pages/Auth/Login/Login"))
const Register = React.lazy(() => import("./pages/Auth/Register/Register"))

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "przepis/:id/:name",
        element: <ProductView />,
      },
      {
        path: "logowanie",
        element: <Login />
      },
      {
        path: "rejestracja",
        element: <Register />,
      },
      {
        path: "szukaj",
        element: <Search />,
        children: [
          {
            path: ':term',
            element: <Search />
          }
        ]
      },
      {
        path: "profil",
        element: <Profile />,
        children: [
          {
            path: "",
            element: <ProfileDetails />
          },
          {
            path: "przepisy",
            element: <MyRecipes />,
          },
          {
            path: "przepisy/dodaj",
            element: <AddRecipe />,
          },
          {
            path: "przepisy/edytuj/:id",
            element: <EditRecipe />,
          }
        ]
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])
