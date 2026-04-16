export const getPrimaryNavigation = (user, dbUser) => {
  const items = [{ to: "/", label: "Home" }];

  if (user) {
    items.push({ to: "/nine-ten", label: "Nine - Ten" });
    items.push({ to: "/eleven-twelve", label: "Eleven - Twelve" });
    items.push({ to: "/profile", label: "Profile" });
  } else {
    items.push({ to: "/login", label: "Login" });
    items.push({ to: "/register", label: "Register" });
  }

  if (dbUser?.role === "admin") {
    items.push({ to: "/admin", label: "Admin" });
  }

  return items;
};
