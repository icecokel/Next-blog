import axios from "axios";

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
  editBlog: { method: "POST", url: "/api/blog/postInfo" },
  editMenu: { method: "PUT", url: "/api/menus/put" },
  registPost: { method: "POST", url: "/api/post/regist" },
  searchPost: { method: "GET", url: "/api/post/search" },
};

export const requestApi = async ({ option: { method, url }, params }: IRequestProps) => {
  switch (method) {
    case "GET":
      return await axios.get(url, params);
    case "POST":
      return await axios.post(url, params);
    case "PUT":
      return await axios.put(url, params);
    case "DELETE":
      return await axios.delete(url, params);
  }
};
