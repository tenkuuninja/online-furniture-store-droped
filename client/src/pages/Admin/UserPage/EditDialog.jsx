import { useState, useEffect } from "react";
import {
  Dialog,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
} from "@mui/material";
import { Save, Add } from "@mui/icons-material";
import { UserApi } from "apis";

const EditDialog = ({ isOpen, onClose, onSuccess, data }) => {
  const [user, setUser] = useState(data);
  const [errorMessage, setErrorMessage] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isChangePassword, setChangePassord] = useState(false);

  let isUpdate = data?._id?.length > 0;
  let isValid = user?.name?.length > 0;

  const hanldeSubmit = async () => {
    setLoading(true);
    try {
      if (isUpdate) {
        await UserApi.byId(data?._id).update(user);
      } else {
        await UserApi.create(user);
      }
      setLoading(false);
      onSuccess();
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUser({ ...data, password: undefined });
    setChangePassord(false);
    setErrorMessage({});
  }, [data]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      scroll="body"
      maxWidth="md"
      fullWidth
    >
      <div className="p-4 md:p-8">
        <div>
          <h2 className="text-2xl text-slate-700 font-bold">
            {isUpdate > 0 ? "Sửa" : "Thêm"} người dùng
          </h2>
        </div>
        <div className="mt-6">
          <p className="mb-2 text-slate-600 font-semibold">
            Tên hiển thị <span className="text-red-500">*</span>
          </p>
          <TextField
            size="small"
            placeholder="Nhập tên hiển thị"
            fullWidth
            value={user?.name || ""}
            onChange={(e) => {
              let value = e.target.value;
              let message = "";
              if (!value) {
                message = "Tên hiển thị không được trống";
              }
              setErrorMessage((prev) => ({ ...prev, name: message }));
              setUser((prev) => ({ ...prev, name: e.target.value }));
            }}
            error={!!errorMessage.name}
            helperText={errorMessage.name}
          />
        </div>

        <div className="md:flex w-full">
          <div className="mt-6 w-full md:w-1/2 md:mr-4">
            <p className="mb-2 text-slate-600 font-semibold">
              Tên đăng nhập <span className="text-red-500">*</span>
            </p>
            <TextField
              size="small"
              placeholder="Nhập tên đăng nhập"
              fullWidth
              value={user?.username || ""}
              onChange={(e) => {
                let value = e.target.value;
                let message = "";
                if (!value) {
                  message = "Tên đăng nhập không được trống";
                } else if (value?.length < 8) {
                  message = "Tên đăng nhập phải dài hơn 8 kí tự";
                } else if (!/^[a-zA-Z0-9_-]{8,}$/g.test(value)) {
                  message =
                    "Tên đăng nhập chỉ cho phép chữ thường, chữ hoa, chữ số và các kí tự _ -";
                }
                setErrorMessage((prev) => ({ ...prev, username: message }));
                setUser((prev) => ({ ...prev, username: value }));
              }}
              error={!!errorMessage.username}
              helperText={errorMessage.username}
            />
          </div>
          <div className="mt-6 w-full md:w-1/2 md:ml-4">
            <p className="mb-2 text-slate-600 font-semibold">
              Email <span className="text-red-500">*</span>
            </p>
            <TextField
              size="small"
              placeholder="Nhập email"
              fullWidth
              value={user?.email || ""}
              onChange={(e) => {
                let value = e.target.value;
                let message = "";
                if (value?.length === 0) {
                  message = "Email không được để trống";
                } else if (!/^.+@(\w{2,}\.){1,2}\w{2,}$/gi.test(value)) {
                  message = "Email không đúng định dạng";
                }
                setErrorMessage((prev) => ({ ...prev, email: message }));
                setUser((prev) => ({ ...prev, email: value }));
              }}
              error={!!errorMessage.email}
              helperText={errorMessage.email}
            />
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-slate-600 font-semibold">
            Giới tính <span className="text-red-500">*</span>
          </p>
          <RadioGroup
            row
            value={user?.gender || null}
            onChange={(e) => {
              setUser((prev) => ({ ...prev, gender: e.target.value }));
            }}
          >
            <FormControlLabel value="M" control={<Radio />} label="Nam" />
            <FormControlLabel value="F" control={<Radio />} label="Nữ" />
          </RadioGroup>
        </div>

        {isUpdate && (
          <div className="flex items-center gap-1 mt-6">
            <p className="text-slate-600 font-semibold">Đổi mật khẩu</p>
            <Switch onChange={(e) => setChangePassord(e.target.checked)} />
          </div>
        )}

        {(!isUpdate || isChangePassword) && (
          <div className="md:flex w-full">
            <div className="mt-6 w-full md:w-1/2 md:mr-4">
              <p className="mb-2 text-slate-600 font-semibold">
                Mật khẩu <span className="text-red-500">*</span>
              </p>
              <TextField
                size="small"
                type="password"
                placeholder="Nhập mật khẩu"
                fullWidth
                value={user?.password || ""}
                onChange={(e) => {
                  let value = e.target.value;
                  let message = "";
                  if (value?.length === 0) {
                    message = "Mật khẩu không được để trống";
                  } else if (value?.length < 8) {
                    message = "Độ dài mật khẩu phải lớn hơn 8";
                  } else if (
                    !/[a-z]/g.test(value) ||
                    !/[A-Z]/g.test(value) ||
                    !/[0-9]/g.test(value) ||
                    !/[!@#$%^&*()_-]/g.test(value)
                  ) {
                    message =
                      "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 chữ số và 1 kí tự đăng biệt thuộc !@#$%^&*()_-";
                  }
                  setErrorMessage((prev) => ({ ...prev, password: message }));
                  setUser((prev) => ({ ...prev, password: value }));
                }}
                error={!!errorMessage.password}
                helperText={errorMessage.password}
              />
            </div>
            <div className="mt-6 w-full md:w-1/2 md:ml-4">
              <p className="mb-2 text-slate-600 font-semibold">
                Xác nhận mật khẩu <span className="text-red-500">*</span>
              </p>
              <TextField
                size="small"
                type="password"
                placeholder="Nhập Lại mật khẩu"
                fullWidth
                value={user?.passwordConfirm || ""}
                onChange={(e) => {
                  let value = e.target.value;
                  let message = "";
                  if (value !== user?.password) {
                    message = "Mật khẩu xác nhận không khớp";
                  }
                  setErrorMessage((prev) => ({
                    ...prev,
                    passwordConfirm: message,
                  }));
                  setUser((prev) => ({ ...prev, passwordConfirm: value }));
                }}
                error={!!errorMessage.passwordConfirm}
                helperText={errorMessage.passwordConfirm}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4 mt-8">
          <Button onClick={onClose}>Hủy</Button>
          <Button
            variant="contained"
            disabled={!isValid || isLoading}
            startIcon={isUpdate > 0 ? <Save /> : <Add />}
            onClick={hanldeSubmit}
          >
            {isUpdate > 0 ? "Sửa" : "Thêm"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default EditDialog;
