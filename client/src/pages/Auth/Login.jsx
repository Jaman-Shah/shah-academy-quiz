import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  getErrorMessage,
  showErrorAlert,
  showSuccessAlert,
} from "../../utils/alerts";

const resolveRedirectPath = (profile, fallbackPath) => {
  if (profile?.role === "admin") {
    return "/admin";
  }

  if (!profile?.name || !profile?.className) {
    return "/profile";
  }

  return fallbackPath;
};

const Login = () => {
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const { profile } = await loginUser(email, password);
      const nextPath = resolveRedirectPath(profile, from);
      await showSuccessAlert("Login Successful", "You are signed in.");
      navigate(nextPath, {
        replace: true,
        state:
          nextPath === "/profile"
            ? { showCompleteProfile: true }
            : undefined,
      });
    } catch (error) {
      await showErrorAlert("Login Failed", getErrorMessage(error));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { profile } = await signInWithGoogle();
      const nextPath = resolveRedirectPath(profile, from);
      await showSuccessAlert("Login Successful", "Google account connected.");
      navigate(nextPath, {
        replace: true,
        state:
          nextPath === "/profile"
            ? { showCompleteProfile: true }
            : undefined,
      });
    } catch (error) {
      await showErrorAlert("Login Failed", getErrorMessage(error));
    }
  };

  return (
    <div className="surface-card mx-auto max-w-2xl p-6 md:p-8">
      <div className="page-header max-w-xl">
        <span className="page-kicker">Welcome Back</span>
        <h1 className="page-title">Login</h1>
      </div>
      <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          required
        />
        <button className="btn-primary w-full">Login</button>
      </form>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn-secondary mt-4 w-full"
      >
        Continue with Google
      </button>
      <p className="mt-6 text-center text-sm text-slate-600">
        New here?{" "}
        <Link to="/register" className="font-bold text-[var(--primary)]">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
