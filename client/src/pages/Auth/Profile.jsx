import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import CompanyDetails from "../../components/shared/CompanyDetails";
import Loading from "../../components/shared/Loading";
import UserAvatar from "../../components/shared/UserAvatar";
import {
  getErrorMessage,
  showErrorAlert,
  showSuccessAlert,
} from "../../utils/alerts";

const optimizeImageFile = (file) =>
  new Promise((resolve, reject) => {
    if (!file?.type?.startsWith("image/")) {
      reject(new Error("Please choose an image file."));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const maxDimension = 512;
        const scale = Math.min(
          1,
          maxDimension / Math.max(image.width || 1, image.height || 1)
        );
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));

        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Image processing is not available."));
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };

      image.onerror = () => reject(new Error("Image could not be loaded."));
      image.src = reader.result;
    };

    reader.onerror = () => reject(new Error("Image file could not be read."));
    reader.readAsDataURL(file);
  });

const Profile = () => {
  const { user, dbUser, loading, updateUserProfileData } = useAuth();
  const location = useLocation();
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isProcessingImage, setIsProcessingImage] = useState(false);
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

  useEffect(() => {
    setName(dbUser?.name || user?.displayName || "");
    setClassName(dbUser?.className || "");
    setPhotoURL(dbUser?.photoURL || user?.photoURL || "");
  }, [dbUser, user]);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setIsProcessingImage(true);
      const optimizedPhotoURL = await optimizeImageFile(file);
      setPhotoURL(optimizedPhotoURL);
      await showSuccessAlert("Image Ready", "Save profile to apply it.");
    } catch (error) {
      await showErrorAlert("Image Upload Failed", getErrorMessage(error));
    } finally {
      setIsProcessingImage(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateUserProfileData({ name, className, photoURL });
      await showSuccessAlert("Profile Updated", "Your changes were saved.");
    } catch (error) {
      await showErrorAlert("Profile Update Failed", getErrorMessage(error));
    }
  };

  if (loading && !dbUser) {
    return <Loading />;
  }

  const shouldShowCompleteProfileNotice =
    location.state?.showCompleteProfile ||
    !dbUser?.name?.trim?.() ||
    !dbUser?.className?.trim?.();

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="mx-auto max-w-4xl space-y-6"
    >
      <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--primary),var(--primary-light)_58%,var(--primary-dark))] px-5 py-6 text-white shadow-[0_18px_36px_rgba(67,56,202,0.22)] sm:px-6 md:px-8">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div className="page-header max-w-2xl text-left">
            <span className="inline-flex rounded-full bg-white/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              My Profile
            </span>
            <h1 className="mt-4 text-left text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Profile
            </h1>
          </div>

          <CompanyDetails compact tone="dark" />
        </div>
      </section>

      {shouldShowCompleteProfileNotice && (
        <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-800">
          Please complete your profile.
        </div>
      )}

      <div className="surface-card p-5 md:p-6">
        <div className="surface-card-soft flex flex-col items-center gap-4 p-5 text-center sm:flex-row sm:text-left">
          <UserAvatar
            name={name || dbUser?.name || user?.displayName || user?.email || "User"}
            photoURL={photoURL}
            sizeClassName="h-24 w-24"
            textClassName="text-3xl"
            ringClassName="border-4 border-indigo-100"
            backgroundClassName="bg-[linear-gradient(135deg,#4338ca,#6366f1)]"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Profile Image
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {name || dbUser?.name || user?.displayName || "User"}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <label className="cursor-pointer rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isProcessingImage}
                />
              </label>
              <button
                type="button"
                onClick={() => setPhotoURL("")}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Remove Image
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="surface-card p-5 md:p-6">
        <div className="surface-card-soft grid gap-3 p-5 text-sm text-slate-600">
          <p>
            <span className="font-bold text-slate-900">Email:</span>{" "}
            {dbUser?.email || user?.email}
          </p>
          <p>
            <span className="font-bold text-slate-900">Role:</span>{" "}
            {dbUser?.role || "user"}
          </p>
          <p>
            <span className="font-bold text-slate-900">Status:</span>{" "}
            {dbUser?.status || "active"}
          </p>
        </div>
      </div>

      <div className="surface-card p-5 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Full name"
            className="input-field"
            required
          />
          <select
            value={className}
            onChange={(event) => setClassName(event.target.value)}
            className="input-field"
          >
            <option value="">Select class</option>
            <option value="Nine - Ten">Nine - Ten</option>
            <option value="Eleven - Twelve">Eleven - Twelve</option>
          </select>
          <button className="btn-primary" disabled={isProcessingImage}>
            {isProcessingImage ? "Processing Image..." : "Save Profile"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Profile;
