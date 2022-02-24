import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ApiOption = {
  url: string;
  method: HttpMethod;
};

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
      axiosBody["param"] = params;
    default:
      axiosBody["data"] = params;
  }

  useEffect(() => {
    axios(option)
      .then((res) => {
        setState({ ...state, isLoading: false, data: res.data });
      })
      .catch((error) => {
        setState({ ...state, isLoading: false, error: error });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isLoading]);

  console.log({ ...state });
  return { ...state };
};

export default useAxios;
