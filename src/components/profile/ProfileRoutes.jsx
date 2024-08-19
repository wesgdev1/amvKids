import { Route, Routes } from "react-router-dom";
import { ProductList } from "../products/ProductList";
import { ProductForm } from "../products/ProductForm";
import { ModelList } from "../model/ModelList";
import { ModelForm } from "../model/ModelForm";
import { ModelDetail } from "../model/ModelDetail";
import { MyProfile } from "./MyProfile";

export const ProfileRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MyProfile />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/:idProduct/models" element={<ModelList />} />
        <Route path="/products/:idProduct/models/new" element={<ModelForm />} />
        <Route path="/models/:idModel" element={<ModelDetail />} />
      </Routes>
    </>
  );
};
