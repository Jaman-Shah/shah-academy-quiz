import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import CompanyDetails from "../../components/shared/CompanyDetails";
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
              Create Account
            </span>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
              Register
            </h1>
          </div>

          <CompanyDetails compact tone="dark" />
        </div>
      </section>

      <div className="surface-card mx-auto max-w-2xl p-6 md:p-8">
        <form onSubmit={handleRegister} className="space-y-4">
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
    </motion.div>
  );
};

export default Register;
