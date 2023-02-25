import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import Image from "next/image";
import RequireLabel from "../common/RequireLabel";
import styles from "./EditBlogInfo.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import Loader from "../common/Loader";
import axios from "axios";
import { useS3Upload } from "next-s3-upload";
import { BlogVO } from "../../../store/modules/blog";
import { ApiStatus } from "../../common/constant/Enum";

const DEFAULT_IMAGE_SRC = "/resources/images/dafault.png";

interface BlogInfoVo {
  nickname: string;
  description: string;
  favicon: File | undefined;
  imageSrc: string;
}

const EditBlogInfo = () => {
  const blog = useSelector((state: RootState) => state.blog);
  const user = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<BlogInfoVo>({
    nickname: "",
    description: "",
    favicon: undefined,
    imageSrc: DEFAULT_IMAGE_SRC,
  });
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const faviconFileRef = useRef<HTMLInputElement>(null);
  const { uploadToS3 } = useS3Upload();

  useEffect(() => {
    initialization();
  }, []);

  const initialization = () => {
    setFormData({
      description: blog.description,
      nickname: user.nickname,
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
      url: blog.url,
      userId: user.id,
      nickname: formData.nickname,
      description: formData.description,
      faviconPath: "",
    };
    // if (formData.favicon) {
    //   const { url } = await uploadToS3(formData.favicon);
    //   params.faviconPath = url;
    // }

    const {
      data: { status, item },
    } = await axios.post("/api/postBlogInfo", params);
    window.URL.revokeObjectURL(formData.imageSrc);
    if (status !== ApiStatus.OK) {
      return;
    }
    console.log(item);
  };
  return (
    <article className={styles.wrapper}>
      <EditBlogInfo.item
        lable="블로그 활동명"
        name="nickname"
        onChange={handleChangeText}
        value={formData.nickname}
      />
      <div className={styles.item}>
        <div className={styles.label}>
          <RequireLabel isShowing={formData.description.length < 1} />
          <label>블로그 설명</label>
        </div>
        <div className={styles.input}>
          <textarea
            name={"description"}
            onChange={handleChangeText}
            value={formData.description}
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
