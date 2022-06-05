import instance from "./instance";
import qs from "query-string";

const path = "/api/products";

export const ProductApi = {
  fetchList: (queryObject = {}, config = {}) => {
    const query = qs.stringify(queryObject || {}, { arrayFormat: "bracket" });
    return instance.get(path + "?" + query, config);
  },
  create: (body, config = {}) => {
    return instance.post(path, body, config);
  },
  byId: (id) => ({
    fetch: (config = {}) => {
      return instance.get(path + "/" + id, config);
    },
    update: (body, config = {}) => {
      return instance.put(path + "/" + id, body, config);
    },
    delete: (config = {}) => {
      return instance.delete(path + "/" + id, config);
    },
  }),
};
