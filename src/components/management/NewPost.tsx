import axios from "axios";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { setPost } from "../../../store/modules/post";
import { HOURS, MINUTES } from "../../common/util/DateUtil";
import styles from "./NewPost.module.scss";

const BaseEditor = dynamic(import("../common/BaseEditor"), { ssr: false });

const NewPost = () => {
  const stateForUser = useSelector((state: RootState) => state.user);
  const stateForPost = useSelector((state: RootState) => state.post);
  const stateForMenu = useSelector((state: RootState) => state.menu);
  const [selectedMenu, setSelectedMenu] = useState<string>(stateForMenu[0].id);
  const registDate = new Date(stateForPost.registDate);
  const dispatch = useDispatch();

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(setPost({ ...stateForPost, [name]: value }));
  };

  const handleClickPostButton = async () => {
    const { status } = await axios.post("/api/registPost", {
      ...stateForPost,
      menuId: selectedMenu,
      registId: stateForUser.id,
    });

    if (status !== 200) {
      // TODO 에러처리
      alert("!!");
    }
  };

  const handleSelectMenu = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMenu(value);
  };

  const handleChangeContents = (value: string | undefined) => {
    dispatch(setPost({ ...stateForPost, contents: value }));
  };
  const handleChangeDatePicker = (date: any) => {
    dispatch(setPost({ ...stateForPost, registDate: date }));
  };
  const handleChangeTime = ({ target: { value, name } }: React.ChangeEvent<HTMLSelectElement>) => {
    const time = Number.parseInt(value);

    if (name === "postTimehour") {
      registDate.setHours(time);
    } else {
      registDate.setMinutes(time);
    }

    dispatch(setPost({ ...stateForPost, registDate: registDate.getTime() }));
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        name="title"
        className={styles.input}
        onChange={handleChangeText}
        value={stateForPost.title}
      />
      <BaseEditor getEditorHTML={handleChangeContents} />
      <div className={styles.menu}>
        <p>메뉴 선택</p>
        <select onSelect={handleSelectMenu} value={selectedMenu}>
          {stateForMenu.map(({ id, name }) => {
            return <option key={id}>{name}</option>;
          })}
        </select>
      </div>
      <div>
        <p>발행일</p>
        <div className={styles.dateWrapper}>
          <div className={styles.date}>
            <DatePicker
              selected={new Date(stateForPost.registDate)}
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
    </div>
  );
};

export default NewPost;
