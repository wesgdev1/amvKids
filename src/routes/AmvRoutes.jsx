import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Products } from "../pages/Products";
import { Login } from "../pages/Login";

import { Profile } from "../pages/Profile";
import { ProductDetail } from "../pages/ProductDetail";
import { CarList } from "../pages/CarList";
import { Chatboot } from "../pages/Chatboot";
import { Curvas } from "../pages/Curvas";
import { Contact } from "../pages/Contact";
import { ForbiddenPage } from "../pages/ForbiddenPage";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { ForbiddenPageAdmin } from "../pages/ForbiddenPageAdmin";

export const AmvRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/curvas" element={<Curvas />} />
        {/* <Route path="/productos" element={<Products />} /> */}
        <Route path="/productos/search/:searchValue" element={<Products />} />
        <Route
          path="/productos/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/verCarritoDeCompras" element={<CarList />} />

        <Route path="/login" element={<Login />} />
        <Route path="/chatTest" element={<Chatboot />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="/forbiddenAdmin" element={<ForbiddenPageAdmin />} />
      </Routes>
    </>
  );
};
