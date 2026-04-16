import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/shared/Loading";
import useAuth from "../../hooks/useAuth";
import {
  getErrorMessage,
  showConfirmAlert,
  showErrorAlert,
  showSuccessAlert,
} from "../../utils/alerts";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { dbUser } = useAuth();
  const [drafts, setDrafts] = useState({});

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
      await axiosSecure.patch(`/users/${id}`, drafts[id]);
      await showSuccessAlert("User Updated", "The user was updated.");
      refetch();
    } catch (error) {
      await showErrorAlert("Update Failed", getErrorMessage(error));
    }
  };

  const handleDelete = async (id) => {
    const result = await showConfirmAlert({
      title: "Delete User?",
      text: "This will delete the user from MongoDB and Firebase Auth.",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await axiosSecure.delete(`/users/${id}`);
      await showSuccessAlert("User Deleted", "The user was removed.");
      refetch();
    } catch (error) {
      await showErrorAlert("Delete Failed", getErrorMessage(error));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-5">
      <div className="page-header max-w-3xl">
        <span className="page-kicker">Admin Control</span>
        <h1 className="page-title">Manage Users</h1>
      </div>
      {users.map((user) => (
        <div
          key={user._id}
          className="surface-card-soft grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"
        >
          <input
            type="text"
            value={drafts[user._id]?.name || ""}
            onChange={(event) => handleChange(user._id, "name", event.target.value)}
            className="input-field"
            disabled={user.uid === dbUser?.uid}
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
              disabled={user.uid === dbUser?.uid}
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
              disabled={user.uid === dbUser?.uid}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => handleSave(user._id)}
              className="btn-primary"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => handleDelete(user._id)}
              disabled={user.uid === dbUser?.uid}
              className="rounded-[1.25rem] border border-rose-200 bg-rose-50 px-4 py-3 font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-rose-50"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;
