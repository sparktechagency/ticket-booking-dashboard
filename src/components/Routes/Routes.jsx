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
import ChangePassword from "../Dashboard/Settings/ChangePassword";
import Faq from "../Dashboard/Settings/Faq";
import TermsAndConditions from "../Dashboard/Settings/TermsAndConditions";
import AboutUs from "../Dashboard/Settings/AboutUs";
import PrivacyPolicy from "../Dashboard/Settings/PrivacyPolicy";
import RevenueManagement from "../Dashboard/Artists";
import Support from "../Dashboard/Transactions";
import AddAvatar from "../Dashboard/Settings/AddAvatar";
import Reliability from "../Dashboard/Users";
import AdminControls from "../Dashboard/AdminControls";
import PrivacyCompliance from "../Dashboard/PrivacyCompliance";
import Settings from "../Dashboard/Settings";
import Events from "../Dashboard/Events";
import Orders from "../Dashboard/Orders";

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
        element: <DashboardLayout />,
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
            path: "content-management",
            element: <AdminControls />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "settings/profile",
            element: <Profile />,
          },
          {
            path: "settings/add-avatar",
            element: <AddAvatar />,
          },
          {
            path: "settings/change-password",
            element: <ChangePassword />,
          },
          {
            path: "settings/terms-and-condition",
            element: <TermsAndConditions />,
          },
          {
            path: "settings/about-us",
            element: <AboutUs />,
          },
          {
            path: "settings/privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "settings/faq",
            element: <Faq />,
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
