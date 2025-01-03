import { Route, Routes } from "react-router-dom";
import { ProductList } from "../products/ProductList";
import { ProductForm } from "../products/ProductForm";
import { ModelList } from "../model/ModelList";
import { ModelForm } from "../model/ModelForm";
import { ModelDetail } from "../model/ModelDetail";
import { MyProfile } from "./MyProfile";
import { OrderList } from "../orders/OrderList";
import { OrdeDetail } from "../orders/OrdeDetail";
import { OrdersAdmin } from "../orders/OrdersAdmin";
import { OrdeDetailAdmin } from "../orders/OrderDetailAdmin";
import { UserList } from "../users/UserList";
import { UserForm } from "../users/UserForm";
import { ScanShoe } from "../scan/ScanShoe";

export const ProfileRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MyProfile />} />
        <Route path="/scan" element={<ScanShoe />} />
        <Route path="/myOrders" element={<OrderList />} />
        <Route path="/orders" element={<OrdersAdmin />} />
        <Route path="/myOrders/:id" element={<OrdeDetail />} />
        <Route path="/order/:id" element={<OrdeDetailAdmin />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/:idProduct/models" element={<ModelList />} />
        <Route path="/products/:idProduct/models/new" element={<ModelForm />} />
        <Route path="/models/:idModel" element={<ModelDetail />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
      </Routes>
    </>
  );
};
