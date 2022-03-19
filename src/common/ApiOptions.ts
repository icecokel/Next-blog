export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ApiOption = {
  url: string;
  method: HttpMethod;
};

const ApiOptions = {
  getBlogInfo: {
    url: "/blog",
    method: "GET",
  } as ApiOption,
  getPostsByCategoryNo: {
    url: "/category",
    method: "GET",
  } as ApiOption,
  getPostInfo: {
    url: "/posts",
    method: "GET",
  } as ApiOption,
  login: {
    url: "/success",
    method: "POST",
  } as ApiOption,
};

export default ApiOptions;
