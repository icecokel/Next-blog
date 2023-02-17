import React, { ChangeEventHandler, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import RequireLabel from "../common/RequireLabel";
import styles from "./EditBlogInfo.module.scss";

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
    faviconSrc.current = window.URL.createObjectURL(formData.blogFavicon).toString();
  }, [formData.blogFavicon]);

  const handleClickFavicon = () => {
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

  const handleChangeText = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleClickSave = () => {
    window.URL.revokeObjectURL(faviconSrc.current);
  };

  return (
    <article className={styles.wrapper}>
      <EditBlogInfo.item
        lable="블로그 이름"
        name="blogName"
        onChange={handleChangeText}
        value={formData.blogName}
      />
      <EditBlogInfo.item
        lable="블로그 활동명"
        name="blogNickName"
        onChange={handleChangeText}
        value={formData.blogNickName}
      />
      <EditBlogInfo.item
        lable="블로그 설명"
        name="blogDescription"
        onChange={handleChangeText}
        value={formData.blogDescription}
      />
      <div className={styles.item}>
        <div className={styles.label}>
          <RequireLabel isShowing={!favicon?.name} />
          <label>파비콘 설정</label>
        </div>
        <div className={styles.favicon}>
          <input type="text" readOnly>
            {favicon?.name}
          </input>
          <button onClick={handleClickFavicon}>선택</button>
        </div>
      </div>
      <div className={styles.preview}>
        <div className={styles.label}>
          <label>미리보기</label>
        </div>
        <div className={styles.input}>
          <Image id={styles.image} alt="preview" src={faviconSrc.current} width={64} height={64} />
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.half} onClick={handleClickSave}>
          저장
        </button>
      </div>
    </article>
  );
};

export default EditBlogInfo;

interface IItemProps {
  lable: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}

EditBlogInfo.item = ({ name, onChange, value, lable }: IItemProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.label}>
        <RequireLabel isShowing={value.length < 1} />
        <label>{lable}</label>
      </div>
      <div className={styles.input}>
        <input type="text" name={name} onChange={onChange} value={value} />
      </div>
    </div>
  );
};
