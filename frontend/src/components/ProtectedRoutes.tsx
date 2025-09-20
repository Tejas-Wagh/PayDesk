import { Navigate, Outlet } from "react-router-dom";
import DashboardWrapper from "./wrapper/DashboardWrapper";

const ProtectedRoutes = ({ children }: { children?: React.ReactNode }) => {
  const isAuthenticated = true;

  const loading = false;

  if (loading) {
    return <div> Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/sign-in"} replace />;
  }
  return (
    <DashboardWrapper>{children ? children : <Outlet />}</DashboardWrapper>
  );
};

export default ProtectedRoutes;
