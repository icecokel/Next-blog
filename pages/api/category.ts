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
          categoryName: "마지막 Category",
          groupNo: "",
          groupOrder: "",
          depth: "",
        },
      ],
      posts: [
        {
          boardNo: "0",
          categoryNo: "0",
          title: "0 0",
          hits: "",
          registDate: "",
          registId: "",
        },
        {
          boardNo: "1",
          categoryNo: "1",
          title: "1 1",
          hits: "",
          registDate: "",
          registId: "",
        },
        {
          boardNo: "2",
          categoryNo: "2",
          title: "2 2",
          hits: "",
          registDate: "",
          registId: "",
        },
        {
          boardNo: "3",
          categoryNo: "1",
          title: "3 1",
          hits: "",
          registDate: "",
          registId: "",
        },
        {
          boardNo: "4",
          categoryNo: "2",
          title: "4 2",
          hits: "",
          registDate: "",
          registId: "",
        },
        {
          boardNo: "5",
          categoryNo: "2",
          title: "5 2",
          hits: "",
          registDate: "",
          registId: "",
        },
      ],
    },
  });
}
