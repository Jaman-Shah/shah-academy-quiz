import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CompanyDetails from "../../components/shared/CompanyDetails";
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
  const containerVariants = {
    initial: {
      x: 1000,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 40,
        stiffness: 1000,
        duration: 0.5,
      },
    },
  };

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
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="mx-auto max-w-4xl space-y-6"
    >
      <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--primary),var(--primary-light)_58%,var(--primary-dark))] px-5 py-6 text-white shadow-[0_18px_36px_rgba(67,56,202,0.22)] sm:px-6 md:px-8">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div className="page-header max-w-2xl">
            <span className="inline-flex rounded-full bg-white/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              Welcome Back
            </span>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
              Login
            </h1>
          </div>

          <CompanyDetails compact tone="dark" />
        </div>
      </section>

      <div className="surface-card mx-auto max-w-2xl p-6 md:p-8">
        <form onSubmit={handleEmailLogin} className="space-y-4">
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
    </motion.div>
  );
};

export default Login;
