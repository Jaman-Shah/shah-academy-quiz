import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/shared/Loading";

const Profile = () => {
  const { user, dbUser, loading, updateUserProfileData } = useAuth();
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setName(dbUser?.name || user?.displayName || "");
    setClassName(dbUser?.className || "");
  }, [dbUser, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessage("");
      await updateUserProfileData({ name, className });
      setMessage("Profile updated successfully.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (loading && !dbUser) {
    return <Loading />;
  }

  return (
    <div className="surface-card mx-auto max-w-3xl p-8 md:p-10">
      <div className="page-header max-w-2xl text-left">
        <span className="page-kicker">My Profile</span>
        <h1 className="page-title mt-4 text-left">Keep your learning identity updated.</h1>
        <p className="page-subtitle text-left">
          Your role, class, and status control what you can access across the quiz
          system.
        </p>
      </div>
      <div className="surface-card-soft mt-6 grid gap-3 p-5">
        <p>
          <span className="font-bold">Email:</span> {dbUser?.email || user?.email}
        </p>
        <p>
          <span className="font-bold">Role:</span> {dbUser?.role || "user"}
        </p>
        <p>
          <span className="font-bold">Status:</span> {dbUser?.status || "active"}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
        <button className="btn-primary">
          Save Profile
        </button>
      </form>
      {message && (
        <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold">
          {message}
        </p>
      )}
    </div>
  );
};

export default Profile;
