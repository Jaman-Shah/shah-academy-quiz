import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const resolveRedirectPath = (profile, fallbackPath) => {
  if (profile?.role === "admin") {
    return "/admin";
  }

  if (!profile?.className) {
    return "/profile";
  }

  return fallbackPath;
};

const Login = () => {
  const { loginUser, signInWithGoogle } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setErrorMessage("");
      const { profile } = await loginUser(email, password);
      navigate(resolveRedirectPath(profile, from), { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setErrorMessage("");
      const { profile } = await signInWithGoogle();
      navigate(resolveRedirectPath(profile, from), { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="surface-card mx-auto max-w-2xl p-8 md:p-10">
      <div className="page-header max-w-xl">
        <span className="page-kicker">Welcome Back</span>
        <h1 className="page-title">Login and continue your quiz journey.</h1>
        <p className="page-subtitle">
          Access your profile, saved role, class-based access, and quiz participation
          from one place.
        </p>
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
        <button className="btn-primary w-full">
          Login
        </button>
      </form>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn-secondary mt-4 w-full"
      >
        Continue with Google
      </button>
      {errorMessage && (
        <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}
      <p className="mt-6 text-center text-sm text-slate-600">
        New here?{" "}
        <Link to="/register" className="font-bold text-orange-700">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
