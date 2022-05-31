import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Fragment>
      <header className="flex justify-between h-16 border-b">

      </header>
      Admin
      <Outlet />
    </Fragment>
  );
};

export default AdminLayout;
