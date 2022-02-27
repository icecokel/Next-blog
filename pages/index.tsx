import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../src/components/PostCard";
import { setBlog } from "../store/modules/blog";
import { setCategory } from "../store/modules/category";
import { RootState } from "../store/modules";
import Loader from "../src/components/common/Loader";
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
    setCategorys();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

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

  const setCategorys = useCallback(() => {
    dispatch(
      setCategory([
        {
          categoryNo: "0",
          categoryName: "1 CATEGORY",
          groupNo: "",
          groupOrder: "",
          depth: "",
        },
        {
          categoryNo: "1",
          categoryName: "2 카테고리",
          groupNo: "",
          groupOrder: "",
          depth: "",
        },
        {
          categoryNo: "2",
          categoryName: "3 카테고리",
          groupNo: "",
          groupOrder: "",
          depth: "",
        },
      ])
    );
  }, []);

  return (
    <div>
      <div className={"thumbnail"}></div>

      <div>
        <Loader isLoading={true}>
          <span>내용</span>
        </Loader>

        <Loader isLoading={false}>
          <span>내용</span>
        </Loader>
      </div>

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
