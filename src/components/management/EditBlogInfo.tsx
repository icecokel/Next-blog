import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import RequireLabel from "../common/RequireLabel";

interface BlogInfoVo {
  blogName: string;
  blogNickName: string;
  blogDescription: string;
  blogFaviconName: string;
  blogFavicon: File | undefined;
}

const EditBlogInfo = () => {
  const [formData, setFormData] = useState<BlogInfoVo>({
    blogName: "",
    blogNickName: "",
    blogDescription: "",
    blogFaviconName: "",
    blogFavicon: undefined,
  });
  const [favicon, setFavicon] = useState<File>();
  const faviconSrc = useRef<string>("/resources/images/dafault.png");

  useEffect(() => {
    memoPreviewSrc();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const memoPreviewSrc = useCallback(() => {
    if (!formData.blogFavicon) {
      return "";
    }
    faviconSrc.current = window.URL.createObjectURL(
      formData.blogFavicon
    ).toString();
  }, [formData.blogFavicon]);

  const onClickFavicon = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("class", "display-none");
    document.body.appendChild(input);

    input.click();
    input.onchange = () => {
      if (!input.files) {
        return;
      }

      const file = input.files[0];
      const imgSrc = window.URL.createObjectURL(file);
      faviconSrc.current = imgSrc;

      setFavicon(file);
      setFormData({
        ...formData,
        blogFavicon: file,
        blogFaviconName: file.name,
      });
    };
  };

  const onChangeText = (e: any) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="edit-bloginfo">
      <EditBlogInfo.item
        lable="블로그 이름"
        name="blogName"
        onChange={onChangeText}
        value={formData.blogName}
      />
      <EditBlogInfo.item
        lable="블로그 활동명"
        name="blogNickName"
        onChange={onChangeText}
        value={formData.blogNickName}
      />
      <EditBlogInfo.item
        lable="블로그 설명"
        name="blogDescription"
        onChange={onChangeText}
        value={formData.blogDescription}
      />
      <div className="edit-bloginfo-item">
        <div className="title">
          <RequireLabel isShowing={!favicon?.name} />
          <label>파비콘 설정</label>
        </div>
        <div className="edit-bloginfo-favicon">
          <label>{favicon?.name}</label>
          <button onClick={onClickFavicon}>선택</button>
        </div>
      </div>
      <div className="edit-bloginfo-item">
        <div className="title">
          <label>미리보기</label>
        </div>
        <Image
          alt="preview"
          src={faviconSrc.current}
          width={128}
          height={128}
        />
      </div>
      <div className="button-wrap">
        <button className="button-half">저장</button>
      </div>
    </div>
  );
};

export default EditBlogInfo;

interface IItemProps {
  lable: string;
  name: string;
  onChange: any;
  value: string;
}

EditBlogInfo.item = ({ name, onChange, value, lable }: IItemProps) => {
  return (
    <div className="edit-bloginfo-item">
      <div className="title">
        <RequireLabel isShowing={value.length < 1} />
        <label>{lable}</label>
      </div>
      <input type="text" name={name} onChange={onChange} value={value} />
    </div>
  );
};
