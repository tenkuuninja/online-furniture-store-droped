import { useState, useEffect } from "react";
import { ProductApi } from "apis";
import { Rating, IconButton, Tooltip, InputBase } from "@mui/material";
import { AddShoppingCart, Search, Close } from "@mui/icons-material";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const productRes = await ProductApi.fetchList();
      setProducts(productRes.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center my-4 mx-4 p-3 rounded-lg bg-slate-50 text-slate-500">
        <Search />
        <div className="px-2 grow">
          <InputBase
            value={search}
            fullWidth
            placeholder="Tìm kiếm ..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Close />
      </div>
      <div className="mx-4 mt-2">
        <span className="text-sm text-slate-400">
          {search?.length > 0 ? "Kết quả tìm kiếm của: " : "Tất cả sản phẩm"}
        </span>
        {search?.length > 0 && (
          <span className="text-sm text-slate-600 font-semibold">
            "{search}"
          </span>
        )}
      </div>
      <div className="grid grid-cols-5">
        {products.map((item, i) => (
          <div key={i} className="p-4">
            <div className="product__cart border rounded-lg overflow-hidden hover:shadow-md transition-shadow ease-out duration-200">
              <div className="relative pt-[100%] overflow-hidden">
                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform ease-in-out duration-200"
                  src={item.image}
                  alt=""
                />
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity ease-in-out duration-200"></div>
              </div>
              <div className="px-3 py-2">
                <p className="text-sm text-slate-400">{item?.category?.name}</p>
                <h3 className="text-lg text-slate-800 font-bold">
                  {item.name}
                </h3>
                <Rating size="small" defaultValue={5} readOnly />
                <div className="flex justify-between items-center">
                  <p className="font-bold text-rose-600 mt-4 mb-4">
                    {item.price}
                    <span className="text-xs">₫</span>
                  </p>
                  <Tooltip title="Thêm vào giỏ hàng" placement="top-end">
                    <IconButton>
                      <AddShoppingCart />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
