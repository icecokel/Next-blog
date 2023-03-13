import axios from "axios";

const BASE_URL = "/api";

interface IApiOption {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
}

interface IApiOptions {
  [optionName: string]: IApiOption;
}

interface IRequestProps {
  option: IApiOption;
  params?: any;
}

export const API_OPTIONS: IApiOptions = {
  editBlog: { method: "POST", url: "/blog/postInfo" },
  editMenu: { method: "PUT", url: "/menus/put" },
  registPost: { method: "POST", url: "/post/regist" },
  searchPost: { method: "GET", url: "/post/search" },
};

export const requestApi = async ({ option: { method, url }, params }: IRequestProps) => {
  const requestUrl = BASE_URL + url;
  switch (method) {
    case "GET":
      return await axios.get(requestUrl, { params: params });
    case "POST":
      return await axios.post(requestUrl, params);
    case "PUT":
      return await axios.put(requestUrl, params);
    case "DELETE":
      return await axios.delete(requestUrl, params);
  }
};
