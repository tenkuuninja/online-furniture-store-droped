const { Fragment } = require("react");
const { Outlet } = require("react-router-dom");

const AppLayout = () => {
  return (
    <Fragment>
      AppLayout
      <Outlet />
    </Fragment>
  );
};

export default AppLayout;
