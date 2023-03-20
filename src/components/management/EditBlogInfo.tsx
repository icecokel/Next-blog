import React, { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import RequireLabel from "../common/RequireLabel";
import styles from "./EditBlogInfo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import Loader from "../common/Loader";
import { useS3Upload } from "next-s3-upload";
import { setBlog } from "../../../store/modules/blog";
import { ApiStatus } from "../../common/constant/Enum";
import { setUser } from "../../../store/modules/user";
import BaseModal from "../common/BaseModal";
import ErrorLabel from "../common/ErrorLabel";
import { setCommonModal } from "../../../store/modules/clientState";
import { API_OPTIONS, requestApi } from "../../common/service/ApiService";

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
  const [isInvaildParams, setIsInvalidParams] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textRef = useRef<HTMLInputElement>(null);
  const faviconFileRef = useRef<HTMLInputElement>(null);

  const { uploadToS3 } = useS3Upload();
  const dispatch = useDispatch();

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

  const getValidParams = async () => {
    if (formData.nickname.length > 15 || formData.nickname.length < 1) {
      textRef.current?.focus();
      setIsInvalidParams(true);
      return;
    }
    if (formData.description.length > 100) {
      textareaRef.current?.focus();
      setIsInvalidParams(true);
      return;
    }

    const { url } = formData.favicon ? await uploadToS3(formData.favicon) : { url: "" };
    window.URL.revokeObjectURL(formData.imageSrc);
    return {
      nickname: formData.nickname,
      description: formData.description,
      faviconPath: url,
    };
  };

  const handleClickSave = async () => {
    const params = await getValidParams();
    if (!params) {
      return;
    }

    const {
      data: { status, item },
    } = await requestApi({
      option: API_OPTIONS.editBlog,
      params: params,
    });

    if (status !== ApiStatus.OK) {
      return;
    }
    dispatch(setCommonModal({ isShowing: true, text: "등록 했습니다", title: "블로그 정보" }));
    dispatch(setBlog({ ...blog, description: item.description, faviconPath: item.faviconPath }));
    dispatch(setUser({ ...user, nickname: item.nickname }));
  };
  return (
    <article className={styles.wrapper}>
      <section>
        <EditBlogInfo.item
          lable="블로그 활동명"
          isValid={formData.nickname.length < 1}
          inputElement={
            <div className={styles.input}>
              <input
                type="text"
                value={formData.nickname}
                onChange={handleChangeText}
                name="nickname"
                ref={textRef}
              />
              <p className={styles.inputRule}>
                최소 <b>1자</b> 부터 최대 <b>15자</b> 까지 가능합니다.
              </p>
            </div>
          }
        />
        <EditBlogInfo.item
          lable="블로그 설명"
          isValid={false}
          inputElement={
            <div className={styles.input}>
              <textarea
                name={"description"}
                onChange={handleChangeText}
                value={formData.description}
                ref={textareaRef}
                rows={1}
              />
              <p className={styles.inputRule}>
                최대 <b>100자</b> 까지 가능합니다.
              </p>
            </div>
          }
        />
        <EditBlogInfo.item
          lable="파비콘 설정"
          isValid={false}
          inputElement={
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
          }
        />
        <EditBlogInfo.item
          lable="미리보기"
          isValid={false}
          inputElement={
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
          }
        />
      </section>
      <div className={styles.buttonWrapper} onClick={handleClickSave}>
        <button disabled={isUploading} className={styles.half}>
          저장
        </button>
      </div>
      <article>
        <BaseModal isOpen={isInvaildParams} setIsOpen={setIsInvalidParams} title="확인 해주세요">
          <ErrorLabel text="입력 내용을 확인해주세요" />
        </BaseModal>
      </article>
    </article>
  );
};

export default EditBlogInfo;

interface IItemProps {
  lable: string;
  isValid: boolean;
  inputElement: ReactNode;
}

EditBlogInfo.item = ({ isValid, lable, inputElement }: IItemProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.label}>
        <RequireLabel isShowing={isValid} />
        <label>{lable}</label>
      </div>
      {inputElement}
    </div>
  );
};
