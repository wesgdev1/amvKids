import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Products } from "../pages/Products";
import { Login } from "../pages/Login";

import { Profile } from "../pages/Profile";

export const AmvRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/profile/*" element={<Profile />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
