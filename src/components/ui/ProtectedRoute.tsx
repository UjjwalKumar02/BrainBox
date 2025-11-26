import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && window.location.href.endsWith("/dashboard")) {
      navigate("/");
    }
    if (token && (window.location.href.endsWith("/") || window.location.href.endsWith("/login"))) {
      navigate("/");
    }
  }, [window.location.href]);

  return <>{children}</>;
};

export default ProtectedRoute;
