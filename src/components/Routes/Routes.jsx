import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import SignIn from "../../pages/SignIn";
import ForgotPassword from "../../pages/ForgotPassword";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Dashboard/Dashboard";
import Notifications from "../Dashboard/Notifications";
import VerifyOtp from "../../pages/VeryfiOTP";
import UpdatePassword from "../../pages/UpdatePassword";
import Profile from "../Dashboard/Settings/Profile";
import { ContentManagement } from "../Dashboard/Settings/ContentManagement";
import RevenueManagement from "../Dashboard/Artists";
import Support from "../Dashboard/Transactions";
import Reliability from "../Dashboard/Users";
import Events from "../Dashboard/Events";
import Teams from "../Dashboard/Teams";
import Orders from "../Dashboard/Orders";
import ProtectedRoute from "../../utils/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "/update-password",
        element: <UpdatePassword />,
      },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "overview",
            element: <Dashboard />,
          },
          {
            path: "events",
            element: <Events />,
          },
          {
            path: "artists",
            element: <RevenueManagement />,
          },
          {
            path: "teams",
            element: <Teams />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "users",
            element: <Reliability />,
          },

          {
            path: "transactions",
            element: <Support />,
          },

          {
            path: "settings/profile",
            element: <Profile />,
          },
          {
            path: "settings/content-management",
            element: <ContentManagement />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
        ],
      },
    ],
  },
]);

export default router;
