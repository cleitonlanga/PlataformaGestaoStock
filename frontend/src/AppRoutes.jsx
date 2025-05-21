import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Menu from "./pages/Menu";
import Dashboard from "./pages/dashboard/Dashboard";
import ProductsPage from "./pages/products/ProductsPage";
import CreateProductPage from "./pages/products/CreateProductPage";
import EditProductPage from "./pages/products/EditProductPage";
import SuppliersPage from "./pages/suppliers/SuppliersPage";
import CreateSupplierPage from "./pages/suppliers/CreateSupplierPage";
import EditSupplierPage from "./pages/suppliers/EditSupplierPage";
import SalesPage from "./pages/sales/SalesPage";
import ForecastPage from "./pages/forecast/ForecastPage";
import UsersPage from "./pages/users/UsersPage";
import SettingsPage from "./pages/settings/SettingsPage";
import CreateSalePage from "./pages/sales/CreateSalePage";

import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import RoleRoute from "./components/RoleRoute";
import ListSalesPage from "./pages/sales/ListSalesPage";
import ReportsPage from "./pages/sales/ReportsPage";
import EditUserPage from "./pages/users/EditUserPage";
import ChangePasswordPage from "./pages/users/ChangePasswordPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/register"
          element={
            <RoleRoute allowedRoles={["admin", "superUser"]}>
              <RegisterPage />
            </RoleRoute>
          }
        />

        {/* Protected */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Menu />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/create"
          element={
            <PrivateRoute>
              <CreateProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <PrivateRoute>
              <EditProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/suppliers"
          element={
            <PrivateRoute>
              <SuppliersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/suppliers/create"
          element={
            <PrivateRoute>
              <CreateSupplierPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/suppliers/:id/edit"
          element={
            <PrivateRoute>
              <EditSupplierPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute>
              <SalesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="sales/create"
          element={
            <PrivateRoute>
              <CreateSalePage />
            </PrivateRoute>
          }
        />
        <Route
          path="sales/list"
          element={
            <PrivateRoute>
              <ListSalesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="sales/report"
          element={
            <PrivateRoute>
              <ReportsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/forecast"
          element={
            <PrivateRoute>
              <ForecastPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <RoleRoute allowedRoles={["admin", "superUser"]}>
              <UsersPage />
            </RoleRoute>
          }
        />
        <Route
          path="/users/:id/edit"
          element={
            <PrivateRoute>
              <EditUserPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <PrivateRoute>
              <ChangePasswordPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />

        {/* Not Found e acesso negado */}
        <Route path="/acesso-negado" element={<div>Acesso negado</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
