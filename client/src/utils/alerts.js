import Swal from "sweetalert2";

const buttonClasses = {
  success:
    "rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 focus:outline-none",
  danger:
    "rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-400 focus:outline-none",
  neutral:
    "rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none",
};

const sharedOptions = {
  buttonsStyling: false,
  background: "#ffffff",
  color: "#0f172a",
  reverseButtons: true,
  customClass: {
    popup:
      "rounded-[2rem] border border-slate-100 shadow-[0_24px_70px_rgba(15,23,42,0.18)]",
    title: "text-2xl font-extrabold text-slate-900",
    htmlContainer: "text-sm font-medium text-slate-600",
    actions: "gap-3",
  },
};

const buildOptions = ({
  confirmVariant = "success",
  cancelVariant = "neutral",
  customClass,
  ...options
} = {}) => ({
  ...sharedOptions,
  ...options,
  customClass: {
    ...sharedOptions.customClass,
    confirmButton: buttonClasses[confirmVariant],
    cancelButton: buttonClasses[cancelVariant],
    ...customClass,
  },
});

export const getErrorMessage = (error, fallback = "Something went wrong.") =>
  error?.response?.data?.message || error?.message || fallback;

export const showSuccessAlert = (title, text, options = {}) =>
  Swal.fire(
    buildOptions({
      icon: "success",
      title,
      text,
      timer: 1500,
      showConfirmButton: false,
      timerProgressBar: true,
      ...options,
    })
  );

export const showErrorAlert = (title, text, options = {}) =>
  Swal.fire(
    buildOptions({
      icon: "error",
      title,
      text,
      confirmButtonText: "OK",
      confirmVariant: "danger",
      ...options,
    })
  );

export const showInfoAlert = (title, text, options = {}) =>
  Swal.fire(
    buildOptions({
      icon: "info",
      title,
      text,
      confirmButtonText: "OK",
      ...options,
    })
  );

export const showConfirmAlert = ({
  title = "Confirm",
  text = "Please confirm this action.",
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  icon = "warning",
  confirmVariant = "danger",
  ...options
} = {}) =>
  Swal.fire(
    buildOptions({
      icon,
      title,
      text,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      confirmVariant,
      ...options,
    })
  );
