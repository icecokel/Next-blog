export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ApiOptionVo = {
  url: string;
  method: HttpMethod;
  params?: any;
  data?: any;
};
