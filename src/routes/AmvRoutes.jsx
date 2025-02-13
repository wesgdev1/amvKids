import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Products } from "../pages/Products";
import { Login } from "../pages/Login";

import { Profile } from "../pages/Profile";
import { ProductDetail } from "../pages/ProductDetail";
import { CarList } from "../pages/CarList";
import { Chatboot } from "../pages/Chatboot";

export const AmvRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/verCarritoDeCompras" element={<CarList />} />

        <Route path="/login" element={<Login />} />
        <Route path="/chatTest" element={<Chatboot />} />
      </Routes>
    </>
  );
};
