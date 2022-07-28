import axios from "axios";
import { ApiOptionVo } from "./ApiOptions";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const RequestUtil = async (option: ApiOptionVo, params?: any) => {
  const axiosBody = { ...option };
  const headers = {};

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
