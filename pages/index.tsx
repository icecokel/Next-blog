import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../src/components/PostCard";
import { setBlog } from "../store/modules/blog";
import { RootState } from "../store/modules";
import useAxios, { ApiOption } from "../src/hooks/useAxios";
const item = {
  title: "제목",
  hits: 11,
  registerDate: "2022/01/22",
  thumbnailPath: "/resources/images/test.jpg",
};

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const blog = useSelector((state: RootState) => state.blog);

  const option: ApiOption = {
    url: "http://makeup-api.herokuapp.com/api/v1/products.json",
    method: "GET",
  };
  const { isLoading, data, error } = useAxios(option, { brand: "maybelline" });

  useEffect(() => {
    setBlogInfo();

    console.log(isLoading);
    console.log(data);
    console.log(error);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setBlogInfo = useCallback(() => {
    dispatch(
      setBlog({
        blogNo: "1223",
        blogName: "dfdfd",
        blogDescription: "adfasdf",
        faviconPath: "cvxcv",
      })
    );
  }, []);

  return (
    <div>
      <div className={"thumbnail"}></div>

      <div>
        <h1>TEST</h1>
        <p>{blog.blogNo}</p>
        <p>{blog.blogName}</p>
        <p>{blog.blogDescription}</p>
        <p>{blog.blogName}</p>

        <PostCard item={item}></PostCard>
      </div>
    </div>
  );
};

export default Home;
