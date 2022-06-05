import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination, Button, IconButton } from "@mui/material";
import { Add, Edit, Delete, Link } from "@mui/icons-material";
import { ProductApi } from "apis";
import EditDialog from "./EditDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [editDialogStatus, setEditDialogStatus] = useState("close");
  const [deleteDialogStatus, setDeleteDialogStatus] = useState("close");
  const [toEditData, setToEditData] = useState("close");
  const [toDeleteData, setToDeleteData] = useState(null);

  let navigate = useNavigate();

  const handleFetchList = async () => {
    try {
      let cateRes = await ProductApi.fetchList({ page });
      setCategories(cateRes.data.content);
      setTotalPage(cateRes.data.totalPage);
    } catch (error) {}
  };

  useEffect(() => {
    if (editDialogStatus === "success") {
      handleFetchList();
    }
    // eslint-disable-next-line
  }, [editDialogStatus]);

  useEffect(() => {
    if (deleteDialogStatus === "success") {
      handleFetchList();
    }
    // eslint-disable-next-line
  }, [deleteDialogStatus]);

  useEffect(() => {
    handleFetchList();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-10 ">
        <h2 className="text-3xl text-slate-700 font-bold">Sản phẩm</h2>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setToEditData({});
            setEditDialogStatus("open");
          }}
        >
          Thêm
        </Button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="py-4 text-slate-700 font-bold">
            <td className="py-4"></td>
            <td className="py-4 px-2">Tên</td>
            <td className="py-4 px-2">Giá</td>
            <td className="py-4 px-2">Tồn kho</td>
            <td className="py-4 px-2">Mô tả</td>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, i) => (
            <tr
              key={i}
              className="border-t border-slate-100 text-slate-600 font-semibold"
            >
              <td className="py-2 w-28">
                <img
                  className="w-24 h-24 object-cover"
                  src={item.image}
                  alt=""
                />
              </td>
              <td className="py-4 pr-2">{item.name}</td>
              <td className="py-4 px-2">{item.price}đ</td>
              <td className="py-4 px-2">{item.stock}</td>
              <td className="py-4 px-2">{item.description}</td>
              <td className="w-1 whitespace-nowrap">
                <div className="ml-4">
                  <IconButton onClick={() => navigate("")}>
                    <Link color="secondary" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setToEditData(item);
                      setEditDialogStatus("open");
                    }}
                  >
                    <Edit color="info" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setToDeleteData(item);
                      setDeleteDialogStatus("open");
                    }}
                  >
                    <Delete color="error" />
                  </IconButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-10 mb-4">
        {totalPage > 1 && (
          <Pagination
            page={page}
            count={totalPage}
            hidePrevButton
            hideNextButton
            showFirstButton
            showLastButton
            onChange={(e, value) => value !== null && setPage(value)}
          />
        )}
      </div>
      <EditDialog
        isOpen={editDialogStatus === "open"}
        onClose={() => setEditDialogStatus("close")}
        onSuccess={() => setEditDialogStatus("success")}
        data={toEditData}
      />
      <ConfirmDeleteDialog
        isOpen={deleteDialogStatus === "open"}
        onClose={() => setDeleteDialogStatus("close")}
        onSuccess={() => setDeleteDialogStatus("success")}
        data={toDeleteData}
      />
    </div>
  );
};

export default AdminCategoryPage;
