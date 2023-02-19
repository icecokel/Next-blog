import React, { ChangeEventHandler, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import RequireLabel from "../common/RequireLabel";
import styles from "./EditBlogInfo.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";

interface BlogInfoVo {
  blogName: string;
  blogNickName: string;
  blogDescription: string;
}

const EditBlogInfo = () => {
  const blog = useSelector((state: RootState) => state.blog);
  const user = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<BlogInfoVo>({
    blogName: "",
    blogNickName: "",
    blogDescription: "",
  });
  const [favicon, setFavicon] = useState<File>();
  const faviconSrc = useRef<string>("/resources/images/dafault.png");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const faviconFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initialization();
  }, []);

  const initialization = () => {
    setFormData({
      blogDescription: blog.description,
      blogName: blog.name,
      blogNickName: user.nickname,
    });
  };

  const handleChangeFavicon = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) {
      return;
    }
    let reader = new FileReader();
    const file = e.currentTarget.files[0];

    reader.onloadend = () => {
      const imgSrc = window.URL.createObjectURL(file);
      faviconSrc.current = imgSrc;
      setFavicon(file);
    };
    // reader.readAsDataURL(file);
  };

  const handleClickChooseFavicon = () => {
    if (!faviconFileRef.current) return;
    faviconFileRef.current.click();
  };

  const handleChangeText = ({
    target: { name, value, tagName, scrollHeight, style },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (tagName === "TEXTAREA") {
      style.height = scrollHeight + "px";
    }
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
      <div className={styles.item}>
        <div className={styles.label}>
          <RequireLabel isShowing={formData.blogDescription.length < 1} />
          <label>블로그 설명</label>
        </div>
        <div className={styles.input}>
          <textarea
            name={"blogDescription"}
            onChange={handleChangeText}
            value={formData.blogDescription}
            ref={textareaRef}
            rows={1}
          />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>
          <RequireLabel isShowing={!favicon?.name} />
          <label>파비콘 설정</label>
        </div>

        <div className={styles.favicon}>
          <input
            type="file"
            accept={"image/*"}
            onChange={handleChangeFavicon}
            className="display-none"
            ref={faviconFileRef}
          />
          <input type="text" readOnly>
            {faviconFileRef.current &&
              faviconFileRef.current.files &&
              faviconFileRef.current.files[0]?.name}
          </input>
          <button onClick={handleClickChooseFavicon}>선택</button>
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
      <div className={styles.buttonWrapper} onClick={handleClickSave}>
        <button className={styles.half}>저장</button>
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
