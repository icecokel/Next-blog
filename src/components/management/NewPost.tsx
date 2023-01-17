import dynamic from "next/dynamic";
import React from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { setPost } from "../../../store/modules/post";
import { HOURS, MINUTES } from "../../common/DateUtil";

const BaseEditor = dynamic(import("../common/BaseEditor"), { ssr: false });

const NewPost = () => {
  const state = useSelector((state: RootState) => state.post);
  const registDate = new Date(state.registDate);
  const dispatch = useDispatch();

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(setPost({ ...state, [name]: value }));
  };

  const handleClickPostButton = () => {
    console.log(state);
  };

  const handleChangeContents = (value: string | undefined) => {
    dispatch(setPost({ ...state, contents: value }));
  };
  const handleChangeDatePicker = (date: any) => {
    dispatch(setPost({ ...state, registDate: date }));
  };
  const handleChangeTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const time = Number.parseInt(value);

    if (name === "postTimehour") {
      registDate.setHours(time);
    } else {
      registDate.setMinutes(time);
    }

    dispatch(setPost({ ...state, registDate: registDate.getTime() }));
  };

  return (
    <div className="editor-wrap">
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        name="title"
        onChange={handleChangeText}
        value={state.title}
      />
      <BaseEditor getEditorHTML={handleChangeContents} />
      <div>
        <p>발행일</p>
        <div className="editor-date-wrap">
          <div className="editor-date">
            <DatePicker
              selected={new Date(state.registDate)}
              dateFormat={"yyyy년 MM월 dd일"}
              onChange={handleChangeDatePicker}
            />
          </div>
          <div className="editor-time">
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
      <div className="button-wrap">
        <button onClick={handleClickPostButton}>발행</button>
      </div>
    </div>
  );
};

export default NewPost;
