import React, { useState, useMemo, ReactComponentElement } from "react";
import DatePicker from "react-datepicker";
import dynamic from "next/dynamic";
import SesstionUtil from "../../common/SessionUtil";
import { SessionEnum } from "../../../src/common/SessionEnum";

type formDataVo = {
  title: string;
  content: string;
  postDate: Date;
  postTimeHour: string;
  postTimeMinute: string;
};

const Quill = dynamic(import("react-quill"), {
  ssr: false,
});

const NewPost = () => {
  const [formData, setFormData] = useState<formDataVo>({
    title: "",
    content: "",
    postDate: new Date(),
    postTimeHour: new Date().getHours().toString(),
    postTimeMinute: new Date().getMinutes().toString(),
  });

  const onChange = (e: any) => {
    const { value, id } = e.target;

    setFormData({ ...formData, [id]: value });
  };

  const getTimeList = (type: "hour" | "minute") => {
    const maxCount = type === "hour" ? 24 : 60;
    const timeList = new Array();

    for (let i = 0; i < maxCount; i++) {
      timeList.push(i);
    }

    return timeList;
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      },
    }),
    []
  );

  const setParams = () => {
    const temp = { ...formData } as any;
    const hours = Number.parseInt(temp.postTimeHour);
    const minutes = Number.parseInt(temp.postTimeMinute);
    temp.postDate.setHours(hours);
    temp.postDate.setMinutes(minutes);

    delete temp.postTimeHour;
    delete temp.postTimeMinute;

    return temp;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const saveFormData = () => {};

  const onClickPostButton = () => {
    const params = setParams();

    console.log(params);
  };

  return (
    <div className="editor-wrap">
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        id="title"
        onChange={onChange}
      />
      <Quill
        theme="snow"
        value={formData.content}
        modules={modules}
        onChange={(content) => {
          setFormData({ ...formData, content });
        }}
      />
      <div>
        <p>발행일</p>
        <div className="editor-date-wrap">
          <div className="editor-date">
            <DatePicker
              selected={formData.postDate}
              dateFormat={"yyyy년 MM월 dd일"}
              onChange={(date: Date) => {
                setFormData({ ...formData, postDate: date });
              }}
            />
          </div>
          <div className="editor-time">
            <select
              onChange={onChange}
              id="postTimeHour"
              value={formData.postTimeHour}
            >
              {getTimeList("hour")?.map((code) => {
                return (
                  <option key={"hour_" + code} value={code}>
                    {code + "시"}
                  </option>
                );
              })}
            </select>
            <select
              onChange={onChange}
              id="postTimeMinute"
              value={formData.postTimeMinute}
            >
              {getTimeList("minute")?.map((code) => {
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
        <button>임시 저장</button>
        <button onClick={onClickPostButton}>발행</button>
      </div>
    </div>
  );
};

export default NewPost;
