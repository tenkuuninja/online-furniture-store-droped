import { Fragment } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Group, Category, Chair, ShoppingCart } from "@mui/icons-material";

import st from "./admin-layout.module.css";

const menu = [
  { text: "Khách hàng", icon: <Group fontSize="small" />, url: "/admin/users" },
  { text: "Danh mục", icon: <Category fontSize="small" />, url: "/admin/categories" },
  { text: "Sản phẩm", icon: <Chair fontSize="small" />, url: "/admin/products" },
  { text: "Hóa đơn", icon: <ShoppingCart fontSize="small" />, url: "/admin/bills" },
];

const AdminLayout = () => {

  const location = useLocation();

  return (
    <Fragment>
      <header className="flex justify-between h-16 border-b"></header>
      <div className="flex">
        <aside className="w-80 pr-6">
          <div></div>
          <ul>
            {menu.map((item, i) => (
              <li key={i}>
                <Link to={item.url}>
                  <div className={`${st.aside_item} ${location.pathname === item.url && st.active} flex justify-start items-center pl-12 py-4 font-semibold text-slate-500`}>
                    <div className="flex mr-4 p-1.5 rounded-[14px]">{item.icon}</div>
                    <p>{item.text}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="grow">
          <Outlet />
        </main>
      </div>
    </Fragment>
  );
};

export default AdminLayout;
