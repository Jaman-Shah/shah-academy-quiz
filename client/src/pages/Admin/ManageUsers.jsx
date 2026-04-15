import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/shared/Loading";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [drafts, setDrafts] = useState({});
  const [message, setMessage] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const response = await axiosSecure("/users");
      return response.data;
    },
  });

  useEffect(() => {
    const nextDrafts = {};

    users.forEach((user) => {
      nextDrafts[user._id] = {
        name: user.name || "",
        className: user.className || "",
        role: user.role || "user",
        status: user.status || "active",
      };
    });

    setDrafts(nextDrafts);
  }, [users]);

  const handleChange = (id, field, value) => {
    setDrafts((currentDrafts) => ({
      ...currentDrafts,
      [id]: {
        ...currentDrafts[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async (id) => {
    try {
      setMessage("");
      await axiosSecure.patch(`/users/${id}`, drafts[id]);
      setMessage("User updated successfully.");
      refetch();
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-5">
      <div className="page-header max-w-3xl">
        <span className="page-kicker">Admin Control</span>
        <h1 className="page-title">Manage your users with clarity.</h1>
        <p className="page-subtitle">
          Adjust names, class placement, access role, and status from one organized
          view.
        </p>
      </div>
      {message && (
        <p className="rounded-2xl border border-slate-200 bg-slate-50 p-3 font-semibold">
          {message}
        </p>
      )}
      {users.map((user) => (
        <div
          key={user._id}
          className="surface-card-soft grid gap-3 p-4 md:grid-cols-5"
        >
          <input
            type="text"
            value={drafts[user._id]?.name || ""}
            onChange={(event) => handleChange(user._id, "name", event.target.value)}
            className="input-field"
          />
          <input
            type="text"
            value={user.email}
            readOnly
            className="input-field bg-slate-50"
          />
          <select
            value={drafts[user._id]?.className || ""}
            onChange={(event) =>
              handleChange(user._id, "className", event.target.value)
            }
            className="input-field"
          >
            <option value="">No class</option>
            <option value="Nine - Ten">Nine - Ten</option>
            <option value="Eleven - Twelve">Eleven - Twelve</option>
          </select>
          <div className="grid gap-3 md:grid-cols-2">
            <select
              value={drafts[user._id]?.role || "user"}
              onChange={(event) => handleChange(user._id, "role", event.target.value)}
              className="input-field"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <select
              value={drafts[user._id]?.status || "active"}
              onChange={(event) =>
                handleChange(user._id, "status", event.target.value)
              }
              className="input-field"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => handleSave(user._id)}
            className="btn-primary"
          >
            Save
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;
