import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { createUser, signInWithGoogle } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const className = form.className.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setErrorMessage("");
      const { profile } = await createUser({ name, className, email, password });
      navigate(profile?.role === "admin" ? "/admin" : "/", { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setErrorMessage("");
      await signInWithGoogle();
      navigate("/profile", { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="surface-card mx-auto max-w-2xl p-8 md:p-10">
      <div className="page-header max-w-xl">
        <span className="page-kicker">Create Account</span>
        <h1 className="page-title">Join Shah Academy Quiz Hub.</h1>
        <p className="page-subtitle">
          Register once, choose your class, and unlock a cleaner quiz workflow with
          Google or email login.
        </p>
      </div>
      <form onSubmit={handleRegister} className="mt-6 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full name"
          className="input-field"
          required
        />
        <select
          name="className"
          className="input-field"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select class
          </option>
          <option value="Nine - Ten">Nine - Ten</option>
          <option value="Eleven - Twelve">Eleven - Twelve</option>
        </select>
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
          minLength={6}
        />
        <button className="btn-primary w-full">
          Register
        </button>
      </form>
      <button
        type="button"
        onClick={handleGoogleRegister}
        className="btn-secondary mt-4 w-full"
      >
        Register with Google
      </button>
      {errorMessage && (
        <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}
      <p className="mt-6 text-center text-sm text-slate-600">
        Already registered?{" "}
        <Link to="/login" className="font-bold text-orange-700">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
