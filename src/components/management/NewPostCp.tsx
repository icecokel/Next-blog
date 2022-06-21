import React, { useMemo, useRef } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { setPost } from "../../../store/modules/post";
import { HOURS, MINUTES } from "../../common/DateUtil";
import BaseEditor, {
  IBaseEditorProps,
} from "../../components/common/BaseEditor";

const NewPostCp = ({ imageList, setImageList }: IBaseEditorProps) => {
  const state = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(setPost({ ...state, [name]: value }));
  };

  const handleChangeContents = (value: any) => {
    dispatch(setPost({ ...state, contents: value }));
  };
  const handleChangeDatePicker = (date: any) => {
    dispatch(setPost({ ...state, registDate: date }));
  };
  const handleChangeTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const time = Number.parseInt(value);
    const { registDate } = { ...state };

    if (name === "postTimehour") {
      registDate.setHours(time);
    } else {
      registDate.setMinutes(time);
    }

    dispatch(setPost({ ...state, registDate: registDate }));
  };

  return (
    <>
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        name="title"
        onChange={handleChangeText}
        value={state.title}
      />
      <BaseEditor
        value={state.contents}
        imageList={imageList}
        setImageList={setImageList}
        onChange={handleChangeContents}
      />
      <div>
        <p>발행일</p>
        <div className="editor-date-wrap">
          <div className="editor-date">
            <DatePicker
              selected={state.registDate}
              dateFormat={"yyyy년 MM월 dd일"}
              onChange={handleChangeDatePicker}
            />
          </div>
          <div className="editor-time">
            <select
              onChange={handleChangeTime}
              name={"postTimehour"}
              value={state.registDate.getHours()}
            >
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
              value={state.registDate.getMinutes()}
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
    </>
  );
};

export default NewPostCp;
