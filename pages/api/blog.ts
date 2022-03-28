// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json({
    status: "Ok",
    message: "Success",
    item: {
      userInfo: {
        userNo: "",
        nickName: "testUser",
        email: "test@test.com",
      },
      blogInfo: {
        blogNo: "9999",
        blogName: "testUser의 블로그입니다",
        blogDescription: "testUser의 블로그입니다",
        favicomPath: "",
      },
      categorys: [
        {
          categoryNo: "0",
          categoryName: "First Category",
          groupNo: "",
          groupOrder: "",
          depth: "",
        },
        {
          categoryNo: "1",
          categoryName: "두번째 카테고리",
          groupNo: "",
          groupOrder: "",
          depth: "",
        },
        {
          categoryNo: "2",
          categoryName: "세번째 Category",
          groupNo: "",
          groupOrder: "",
          depth: "",
        },
        {
          categoryNo: "3",
          categoryName: "네번째 Category",
          groupNo: "",
          groupOrder: "",
          depth: "",
        },
        {
          categoryNo: "4",
          categoryName: "다섯번째 Category",
          groupNo: "",
          groupOrder: "",
          depth: "",
        },
        {
          categoryNo: "5",
          categoryName: "여섯번째 Category",
          groupNo: "",
          groupOrder: "",
          depth: "",
        },
        {
          categoryNo: "7",
          categoryName: "일곱번째 Category",
          groupNo: "",
          groupOrder: "",
          depth: "",
        },
      ],
    },
  });
}
