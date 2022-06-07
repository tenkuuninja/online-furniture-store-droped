import { Link } from "react-router-dom";

const menu = [
  { text: "Trang chủ", url: "/" },
  { text: "Sản phẩm", url: "/san-pham" },
  { text: "Giỏ hàng", url: "/gio-hang" },
  { text: "Liên hệ", url: "/lien-he" },
];

const Header = () => {
  return (
    <header className="flex justify-between px-6 h-16 border-b border-slate-100">
      <div className="h-16"></div>
      <div className="h-16 space-x-4">
        {menu.map((item, i) => (
          <Link
            to={item.url}
            className="leading-[4rem] text-slate-800 font-bold"
            key={i}
          >
            {item.text}
          </Link>
        ))}
      </div>
      <div className="h-16"></div>
    </header>
  );
};

export default Header;
