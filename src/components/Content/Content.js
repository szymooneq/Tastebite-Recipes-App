import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../pages/404/404";
import Login from "../../pages/Auth/Login/Login";
import Register from "../../pages/Auth/Register/Register";
import Home from "../../pages/Home/Home";
import ProductView from "../../pages/ProductView/ProductView";
import AddRecipe from "../../pages/Profile/MyRecipes/AddRecipe/AddRecipe";
import EditRecipe from "../../pages/Profile/MyRecipes/EditRecipe/EditRecipe";
import MyRecipes from "../../pages/Profile/MyRecipes/MyRecipes";
import Profile from "../../pages/Profile/Profile";
import ProfileDetails from "../../pages/Profile/ProfileDetails/ProfileDetails";
import Search from "../../pages/Search/Search";
import LoadingIcon from "../UI/LoadingIcon/LoadingIcon";
import ErrorBoundary from "./ErrorBoundary";
import ProtectedRoutes from "./ProtectedRoutes";

// TODO: react-router v6.4 routing

export default function Content() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingIcon />}>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="logowanie" element={<Login />} />
          <Route path="rejestracja" element={<Register />} />
          <Route path="przepis/:id/:name" element={<ProductView />} />

          <Route path="szukaj">
            <Route index element={<Search />} />
            <Route path=":term" element={<Search />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="profil" element={<Profile />}>
              <Route index element={<ProfileDetails />} />
              <Route path="przepisy">
                <Route index element={<MyRecipes />} />
                <Route path="dodaj" element={<AddRecipe />} />
                <Route path="edytuj/:id" element={<EditRecipe />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
