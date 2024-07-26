import { Route, Routes } from "react-router-dom";
import { ProductList } from "../products/ProductList";
import { ProductForm } from "../products/ProductForm";
import { ModelList } from "../model/ModelList";

export const ProfileRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/:idProduct/models" element={<ModelList />} />
      </Routes>
    </>
  );
};
