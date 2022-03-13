import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "/api";

type AxiosState = {
  isLoading: boolean;
  error: any;
  data: any;
};

const useAxios = (option: any, params?: any) => {
  const [state, setState] = useState<AxiosState>({
    isLoading: true,
    data: undefined,
    error: undefined,
  });

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

  useEffect(() => {
    axios(axiosBody)
      .then((res) => {
        setState({ ...state, isLoading: false, data: res.data });
      })
      .catch((error) => {
        setState({ ...state, isLoading: false, error: error });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isLoading]);

  return { ...state };
};

export default useAxios;
