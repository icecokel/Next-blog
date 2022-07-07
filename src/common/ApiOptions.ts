export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ApiOptionVo = {
  url: string;
  method: HttpMethod;
  params?: any;
  data?: any;
};

const ApiOptions = {
  getBlogInfo: {
    url: "/blog",
    method: "GET",
  } as ApiOptionVo,
  getPostsByCategoryNo: {
    url: "/category",
    method: "GET",
  } as ApiOptionVo,
  getPostInfo: {
    url: "/post",
    method: "GET",
  } as ApiOptionVo,
  login: {
    url: "/success",
    method: "POST",
  } as ApiOptionVo,
};

export default ApiOptions;
