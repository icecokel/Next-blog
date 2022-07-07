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
      posts: {
        boardNo: "1",
        title: "title",
        registId: "registId",
        hits: "2",
        registDate: "2022-05-21",
        contents:
          "<p>sdf</p><p>df</p><p><em>wdgf</em></p><p>adfasdf</p><p><strong>dsgf</strong></p>",
      },
    },
  });
}
