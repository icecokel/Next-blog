// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiStatus } from "../../../src/common/constant/Enum";
import { getData, updateCollection } from "../../../src/common/service/FireBaseService";
import { PostVO } from "../../../store/modules/post";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "POST") {
    res.status(400).json({
      status: ApiStatus.NG,
      message: "Invalid request method",
    });
  }
  const param = req.body;

  const post = (await getData("post", param.postId)) as PostVO;

  if (!post) {
    res.status(400).json({
      status: ApiStatus.NG,
      message: "Invalid request method",
    });
  } else {
    const commentsToUpdate = [...(post.comments ?? []), param.comment];
    console.log(commentsToUpdate);
    const postToUpdate = { ...post, comments: commentsToUpdate };

    try {
      await updateCollection("post", param.postId, postToUpdate);

      res.status(200).json({
        status: ApiStatus.OK,
      });
    } catch (error) {
      res.status(200).json({
        status: ApiStatus.NG,
        error: error,
      });
    }
  }
}
