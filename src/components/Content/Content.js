import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../pages/404/404";
import Login from "../../pages/Auth/Login/Login";
import Register from "../../pages/Auth/Register/Register";
import Home from "../../pages/Home/Home";
import Hotel from "../../pages/Hotel/Hotel";
import AddHotel from "../../pages/Profile/MyHotels/AddHotel/AddHotel";
import EditHotel from "../../pages/Profile/MyHotels/EditHotel/EditHotel";
import MyHotels from "../../pages/Profile/MyHotels/MyHotels";
import Profile from "../../pages/Profile/Profile";
import ProfileDetails from "../../pages/Profile/ProfileDetails/ProfileDetails";
import Search from "../../pages/Search/Search";
import LoadingIcon from "../UI/LoadingIcon/LoadingIcon";
import ErrorBoundary from "./ErrorBoundary";
import ProtectedRoutes from "./ProtectedRoutes";

export default function Content() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingIcon />}>
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
  );
}
