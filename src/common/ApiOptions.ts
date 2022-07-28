export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ApiOptionVo = {
  url: string;
  method: HttpMethod;
  params?: any;
  data?: any;
};

export const getBlogInfo: ApiOptionVo = {
  url: "/blog",
  method: "GET",
};
export const getPostsByCategoryNo: ApiOptionVo = {
  url: "/category",
  method: "GET",
};
export const getPostInfo: ApiOptionVo = {
  url: "/post",
  method: "GET",
};
export const login: ApiOptionVo = {
  url: "/success",
  method: "POST",
};
