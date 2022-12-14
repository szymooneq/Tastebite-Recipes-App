import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";

const NotFound = React.lazy(() => import("./pages/404"));
const Home = React.lazy(() => import("./pages/Home"));
const Search = React.lazy(() => import("./pages/Search"));
const ProductView = React.lazy(() => import("./pages/[id]"));
const Profile = React.lazy(() =>
  import("./components/Layout/Navigation/Profile")
);
const UserDetails = React.lazy(() => import("./pages/Profile/UserDetails"));
const UserRecipes = React.lazy(() => import("./pages/Profile/UserRecipes"));
const AddRecipe = React.lazy(() =>
  import("./pages/Profile/RecipesManagment/AddRecipe")
);
const EditRecipe = React.lazy(() =>
  import("./pages/Profile/RecipesManagment/EditRecipe")
);
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Register = React.lazy(() => import("./pages/Auth/Register"));

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "przepis/:id",
        element: <ProductView />
      },
      {
        path: "logowanie",
        element: <Login />
      },
      {
        path: "rejestracja",
        element: <Register />
      },
      {
        path: "szukaj",
        element: <Search />,
        children: [
          {
            path: ":term",
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
            element: <UserDetails />
          },
          {
            path: "przepisy",
            element: <UserRecipes />
          },
          {
            path: "przepisy/dodaj",
            element: <AddRecipe />
          },
          {
            path: "przepisy/edytuj/:id",
            element: <EditRecipe />
          }
        ]
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);
