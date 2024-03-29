import dynamic from "next/dynamic";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { setPost } from "../../../store/modules/post";
import { ApiStatus } from "../../common/constant/Enum";
import { API_OPTIONS, requestApi } from "../../common/service/ApiService";
import { HOURS, MINUTES } from "../../common/util/DateUtil";
import useModal from "../common/BaseModal/useModal";
import styles from "./NewPost.module.scss";

const BaseEditor = dynamic(import("../common/BaseEditor"), { ssr: false });

const NewPost = () => {
  const user = useSelector((state: RootState) => state.user);
  const post = useSelector((state: RootState) => state.post);
  const menu = useSelector((state: RootState) => state.menu);
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const { open } = useModal({
    title: "등록완료",
    children: (
      <div className={styles.modal}>
        <div>포스트가 등록이 완료 되었습니다.</div>
      </div>
    ),
  });
  const registDate = new Date(post.registDate);
  const dispatch = useDispatch();

  const handleChangeText = ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPost({ ...post, [name]: value }));
  };

  const handleSelectMenu = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMenu(value);
  };

  const handleChangeContents = (value: string | undefined) => {
    dispatch(setPost({ ...post, contents: value }));
  };

  const handleChangeDatePicker = (date: any) => {
    dispatch(setPost({ ...post, registDate: date }));
  };

  const handleChangeTime = ({ target: { value, name } }: React.ChangeEvent<HTMLSelectElement>) => {
    const time = Number.parseInt(value);

    name === "postTimehour" ? registDate.setHours(time) : registDate.setMinutes(time);

    dispatch(setPost({ ...post, registDate: registDate.getTime() }));
  };

  const handleClickPostButton = async () => {
    const {
      data: { status },
    } = await requestApi({
      option: API_OPTIONS.registPost,
      params: {
        ...post,
        menuId: selectedMenu,
        registId: user.id,
        nickname: user.nickname,
      },
    });

    if (status !== ApiStatus.OK) {
      // TODO 에러처리
      alert("!!");
    }
    open();
    dispatch(
      setPost({
        contents: "",
        menuId: "",
        registDate: new Date().getTime(),
        title: "",
      })
    );
  };

  return (
    <article className={styles.wrapper}>
      <div className={styles.menu}>
        <select onChange={handleSelectMenu} value={selectedMenu}>
          <option value={""}>카테고리를 선택 해주세요.</option>
          {menu.map(({ id, name }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        name="title"
        className={styles.input}
        onChange={handleChangeText}
        value={post.title}
      />
      <BaseEditor getEditorHTML={handleChangeContents} />

      <div>
        <p>발행일</p>
        <div className={styles.dateWrapper}>
          <div className={styles.date}>
            <DatePicker
              selected={new Date(post.registDate)}
              dateFormat={"yyyy년 MM월 dd일"}
              onChange={handleChangeDatePicker}
            />
          </div>
          <div className={styles.time}>
            <select onChange={handleChangeTime} name={"postTimehour"} value={registDate.getHours()}>
              {HOURS.map((code) => {
                return (
                  <option key={"hour_" + code} value={code}>
                    {code + "시"}
                  </option>
                );
              })}
            </select>
            <select
              onChange={handleChangeTime}
              name={"postTimeMinute"}
              value={registDate.getMinutes()}
            >
              {MINUTES.map((code) => {
                return (
                  <option key={"minute" + code} value={code}>
                    {code + "분"}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={handleClickPostButton}>발행</button>
      </div>
    </article>
  );
};

export default NewPost;
