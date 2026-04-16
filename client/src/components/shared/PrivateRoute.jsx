import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loading from "./Loading";

const PrivateRoute = ({ children }) => {
  const { user, dbUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const needsProfileCompletion =
    location.pathname !== "/profile" &&
    (!dbUser?.name?.trim?.() || !dbUser?.className?.trim?.());

  if (needsProfileCompletion) {
    return (
      <Navigate
        to="/profile"
        state={{ showCompleteProfile: true }}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;
