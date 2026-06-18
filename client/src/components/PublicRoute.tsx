import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({
  children,
}: PublicRouteProps) => {
  const token =
    localStorage.getItem(
      "token"
    );

  if (token) {
    return (
      <Navigate
        to="/tasks"
        replace
      />
    );
  }

  return children;
};

export default PublicRoute;