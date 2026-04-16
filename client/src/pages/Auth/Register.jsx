import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import {
  getErrorMessage,
  showErrorAlert,
  showSuccessAlert,
} from "../../utils/alerts";

const Register = () => {
  const { createUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const className = form.className.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      await showErrorAlert(
        "Registration Failed",
        "Password and confirm password must match."
      );
      return;
    }

    try {
      await createUser({ name, className, email, password });
      await showSuccessAlert(
        "Registration Successful",
        "Please complete your profile."
      );
      navigate("/profile", {
        replace: true,
        state: { showCompleteProfile: true },
      });
    } catch (error) {
      await showErrorAlert("Registration Failed", getErrorMessage(error));
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithGoogle();
      await showSuccessAlert(
        "Registration Successful",
        "Please complete your profile."
      );
      navigate("/profile", {
        replace: true,
        state: { showCompleteProfile: true },
      });
    } catch (error) {
      await showErrorAlert("Registration Failed", getErrorMessage(error));
    }
  };

  return (
    <div className="surface-card mx-auto max-w-2xl p-6 md:p-8">
      <div className="page-header max-w-xl">
        <span className="page-kicker">Create Account</span>
        <h1 className="page-title">Register</h1>
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
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="input-field pr-12"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <HiOutlineEyeOff className="text-xl" />
            ) : (
              <HiOutlineEye className="text-xl" />
            )}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password"
            className="input-field pr-12"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((current) => !current)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
            aria-label={
              showConfirmPassword ? "Hide confirm password" : "Show confirm password"
            }
          >
            {showConfirmPassword ? (
              <HiOutlineEyeOff className="text-xl" />
            ) : (
              <HiOutlineEye className="text-xl" />
            )}
          </button>
        </div>
        <button className="btn-primary w-full">Register</button>
      </form>
      <button
        type="button"
        onClick={handleGoogleRegister}
        className="btn-secondary mt-4 w-full"
      >
        Register with Google
      </button>
      <p className="mt-6 text-center text-sm text-slate-600">
        Already registered?{" "}
        <Link to="/login" className="font-bold text-[var(--primary)]">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
