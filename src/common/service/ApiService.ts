import axios from "axios";
import { getCircleEffect } from "./CircleEffect";

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
  registComment: { method: "POST", url: "/comment/regist" },
};

export const requestApi = async ({ option: { method, url }, params }: IRequestProps) => {
  const circleEffect = getCircleEffect();
  circleEffect.toggle(true);
  const requestUrl = BASE_URL + url;
  let response;
  switch (method) {
    case "GET":
      response = await axios.get(requestUrl, { params: params });
      break;
    case "POST":
      response = await axios.post(requestUrl, params);
      break;
    case "PUT":
      response = await axios.put(requestUrl, params);
      break;
    case "DELETE":
      response = await axios.delete(requestUrl, params);
      break;
  }
  circleEffect.toggle(false);
  return response;
};
