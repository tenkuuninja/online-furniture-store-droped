import instance from "./instance";

export const ImageApi = {
  upload: (file, config = {}) => {
    let formData = new FormData();
    formData.append("file", file)
    return instance.post("/api/upload", formData, config);
  },
};
