import axios from "axios";
import { useDispatch } from "react-redux";
import { ApiOptionVo } from "./ApiOptions";
import { ErrorVO, setError } from "../../store/modules/clientState";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const RequestUtil = async (option: ApiOptionVo, params?: any) => {
  const dispatch = useDispatch();
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
      return { data: res.data };
    })
    .catch((error) => {
      const errorObj: ErrorVO = {
        isShowing: true,
        title: error.response.data.code,
        error: error.response.data.message,
      };
      dispatch(setError(errorObj));
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
};

export default RequestUtil;
