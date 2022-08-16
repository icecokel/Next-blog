import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import NewPost from "./NewPost";
import { ImageFile } from "../common/BaseEditor";

/**
 * todos
 *
 * 이미지 버튼 클릭  -  핸들러 추가
 * 파일 배열에 저장  -  상태 저장
 * 파일 url을 화면에 이미지로 렌더링  -  렌더링 성공
 * 발행 클릭시, file을 s3에 업로드
 * 업로드 후 바로 링크 저장
 * formData에서 교체
 * formData를 DB or FireBase에 저장
 *
 * 임시 저장 기능
 *
 */

const NewPostCp = () => {
  const state = useSelector((state: RootState) => state.post);
  const [images, setImages] = useState<Array<ImageFile>>([]);

  const handleClickPostButton = () => {
    const params = getParams();

    console.log(params);
  };

  const handleChangeImages = (files: ImageFile[]) => {
    setImages(files);
  };

  const getParams = () => {
    const params = { ...state };

    images?.forEach((item) => {
      if (params.contents.includes(item.src)) {
        // s3 업로드하고 링크 받아서 세팅해야함.

        const s3Link = "S3LINK:" + item.src;
        params.contents = params.contents.replaceAll(item.src, s3Link);
      }
    });

    return params;
  };

  return (
    <div className="editor-wrap">
      <NewPost imageList={images} setImageList={handleChangeImages} />
      <div className="button-wrap">
        <button onClick={handleClickPostButton}>발행</button>
      </div>
    </div>
  );
};

export default NewPostCp;
