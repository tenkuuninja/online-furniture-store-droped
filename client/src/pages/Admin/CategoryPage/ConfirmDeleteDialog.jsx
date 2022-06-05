import { useState, useEffect } from "react";
import { Dialog, Button, DialogTitle, DialogActions } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { CategoryApi } from "apis";

const CategoryModal = ({ isOpen, onClose, onSuccess, data }) => {
  const [isLoading, setLoading] = useState(false);

  const hanldeSubmit = async () => {
    setLoading(true);
    try {
      await CategoryApi.byId(data?._id).delete();
      setLoading(false);
      onSuccess();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="p-4 md:p-6">
        <p className="text-2xl text-slate-700 font-bold">
          Bạn có chắc muốn xóa `{data?.name}`
        </p>
        <div className="flex justify-end gap-4 mt-6">
          <Button onClick={onClose}>Hủy</Button>
          <Button
            disabled={isLoading}
            variant="contained"
            color="error"
            onClick={hanldeSubmit}
            startIcon={<Delete />}
          >
            Xóa
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default CategoryModal;
