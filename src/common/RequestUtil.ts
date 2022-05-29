import axios from "axios";
import { ApiOptionVo } from "./ApiOptions";

const BASE_URL = "/api";

const RequestUtil = async (option: ApiOptionVo, params?: any) => {
  const axiosBody = { ...option };
  const headers = {};

  if (!option.url) {
    throw "Check HttpOption";
  }

  switch (option.method) {
    case "GET":
      axiosBody["params"] = params;
    default:
      axiosBody["data"] = params;
  }

  axiosBody["url"] = BASE_URL + option.url;

  return await axios(axiosBody)
    .then((res) => {
      return { data: res.data, error: undefined };
    })
    .catch((error) => {
      return { data: undefined, error: error };
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
};

export default RequestUtil;
