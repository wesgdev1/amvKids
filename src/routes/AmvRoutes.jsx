import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Products } from "../pages/Products";
import { Login } from "../pages/Login";
import { ShoppingHistory } from "../pages/ShoppingHistory";

export const AmvRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/profile/shoppinghistory" element={<ShoppingHistory />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
