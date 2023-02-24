import React, { ChangeEventHandler, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import RequireLabel from "../common/RequireLabel";
import styles from "./EditBlogInfo.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import Loader from "../common/Loader";
import axios from "axios";

const DEFAULT_IMAGE_SRC = "/resources/images/dafault.png";

interface BlogInfoVo {
  blogName: string;
  blogNickName: string;
  blogDescription: string;
  favicon: File | undefined;
  imageSrc: string;
}

const EditBlogInfo = () => {
  const blog = useSelector((state: RootState) => state.blog);
  const user = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<BlogInfoVo>({
    blogName: "",
    blogNickName: "",
    blogDescription: "",
    favicon: undefined,
    imageSrc: DEFAULT_IMAGE_SRC,
  });
  const [isUploading, setIsUploading] = useState<boolean>(false);
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
      favicon: undefined,
      imageSrc: blog.faviconPath || DEFAULT_IMAGE_SRC,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) {
      setIsUploading(false);
      return;
    }
    let reader = new FileReader();
    const file = e.currentTarget.files[0];
    const imgSrc = window.URL.createObjectURL(file);

    reader.onload = () => {
      setFormData({ ...formData, favicon: file, imageSrc: imgSrc });
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleClickChooseFavicon = () => {
    if (!faviconFileRef.current) return;
    setIsUploading(true);
    faviconFileRef.current.click();
  };

  const handleChangeText = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleClickSave = async () => {
    const params = {
      id: blog.id,
      name: formData.blogName,
      description: formData.blogDescription,
      faviconPath: "",
    };
    const { data } = await axios.post("/api/postBlogInfo", params);
    console.log(data);

    window.URL.revokeObjectURL(formData.imageSrc);
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
          <RequireLabel isShowing={!formData.favicon} />
          <label>파비콘 설정</label>
        </div>

        <div className={styles.favicon}>
          <input
            type="file"
            accept={"image/*"}
            onChange={handleImageUpload}
            className="display-none"
            ref={faviconFileRef}
          />
          <input type="text" readOnly value={formData.favicon?.name || ""} />
          <button onClick={handleClickChooseFavicon}>선택</button>
        </div>
      </div>
      <div className={styles.preview}>
        <div className={styles.label}>
          <label>미리보기</label>
        </div>
        <div className={styles.input}>
          <Loader isLoading={isUploading}>
            <Image
              alt="preview"
              src={`${formData.imageSrc ?? DEFAULT_IMAGE_SRC}`}
              width={128}
              height={128}
            />
          </Loader>
        </div>
      </div>
      <div className={styles.buttonWrapper} onClick={handleClickSave}>
        <button disabled={isUploading} className={styles.half}>
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
