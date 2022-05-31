import AdminLayout from "components/Layout/AdminLayout";
import AppLayout from "components/Layout/AppLayout";
import AdminBillPage from "pages/Admin/BillPage";
import AdminCategoryPage from "pages/Admin/CategoryPage";
import AdminDashboardPage from "pages/Admin/Dashboard";
import AdminProductPage from "pages/Admin/ProductPage";
import AdminUserPage from "pages/Admin/UserPage";
import CartPage from "pages/CartPage";
import HomePage from "pages/HomePage";
import ProductDetailPage from "pages/ProductDetailPage";
import ProductListPage from "pages/ProductListPage";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="san-pham" element={<ProductListPage />}/>
          <Route path="san-pham/abc" element={<ProductDetailPage />}/>
          <Route path="gio-hang" element={<CartPage />}/>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUserPage />}/>
          <Route path="categories" element={<AdminCategoryPage />}/>
          <Route path="products" element={<AdminProductPage />}/>
          <Route path="bills" element={<AdminBillPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
