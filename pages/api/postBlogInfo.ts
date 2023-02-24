// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "POST") {
    res.status(200).json({
      status: "400",
    });
  }

  res.status(200).json({
    status: "Ok",
    item: req.body,
  });
}
