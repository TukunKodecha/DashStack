import { createBrowserRouter } from "react-router-dom";
import RoleBasedRoute from "./RoleBasedRoute";

import Dashboard from "../dashboard/Dashboard";
import AuthRedirect from "./AuthRedirect";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import NotFound from "./NotFound";

import PrivateRoute from "./PrivateRoute";
import { ADMIN } from "../../utils/constant";
import Products from "../products/Products";
import LoginForm from "../auth/LoginForm";
import NotAuthorized from "./NotAuthorized";

const publicRoutes = [
  {
    path: "/",
    element: (
      <AuthRedirect
        element={
          <AuthLayout>
            <LoginForm />
          </AuthLayout>
        }
      />
    ),
  },
  {
    path: "/not-authorized",
    element: <NotAuthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const protectedRoutes = [
  {
    path: "/dashboard",
    element: <PrivateRoute element={<Dashboard />} />,
  },
  {
    path: "/products",
    element: (
      <RoleBasedRoute
        allowedRoles={[ADMIN]}
        element={<PrivateRoute element={<Products />} />}
      />
    ),
  },
];

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: protectedRoutes,
  },
  ...publicRoutes,
]);
