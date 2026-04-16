import { Outlet } from "react-router-dom";
import AppShell from "../components/shared/AppShell";

const Root = () => {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
};

export default Root;
