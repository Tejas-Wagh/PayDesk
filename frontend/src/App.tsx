import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/landing/LandingPage";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./pages/dashboard/Dashboard";
import AllInvoices from "./pages/invoice/AllInvoices";
import CreateInvoice from "./pages/invoice/CreateInvoice";
import InvoiceDetail from "./pages/invoice/InvoiceDetail";
import ProfilePage from "./pages/profile/ProfilePage";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Private Routes */}
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="invoices" element={<AllInvoices />} />
            <Route path="invoices/new" element={<CreateInvoice />} />
            <Route path="invoices/:id" element={<InvoiceDetail />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Catch all Routes */}
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
