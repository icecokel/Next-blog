import axios from "axios";

interface IRequestProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  params: any;
}

export const request = async ({ method, params, url }: IRequestProps) => {
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
