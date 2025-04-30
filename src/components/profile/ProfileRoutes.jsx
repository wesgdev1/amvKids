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
import { ReportList } from "../reports/ReportList";
import { OrderListByUser } from "../users/OrderListbyUser";
import { OrderPreparer } from "../orders/OrderPreparer";
import { OrdeDetailPreparer } from "../orders/OrderDetailPreparer";
import { AdminRoute } from "../../auth/AdminRoute";

export const ProfileRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MyProfile />} />
        <Route
          path="/reports"
          element={
            <AdminRoute>
              <ReportList />
            </AdminRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <AdminRoute>
              <OrdersAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <AdminRoute>
              <OrdeDetailAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/products/new"
          element={
            <AdminRoute>
              <ProductForm />
            </AdminRoute>
          }
        />
        <Route path="/scan" element={<ScanShoe />} />
        <Route path="/myOrders" element={<OrderList />} />
        <Route path="/prepareOrders" element={<OrderPreparer />} />
        <Route path="/myOrders/:id" element={<OrdeDetail />} />
        <Route path="/prepareOrders/:id" element={<OrdeDetailPreparer />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:idProduct/models" element={<ModelList />} />
        <Route path="/products/:idProduct/models/new" element={<ModelForm />} />
        <Route path="/models/:idModel" element={<ModelDetail />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/:idUser/orders" element={<OrderListByUser />} />
      </Routes>
    </>
  );
};
