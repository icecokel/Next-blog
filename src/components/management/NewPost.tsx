import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import DatePicker from "react-datepicker";

type formDataVo = {
  title: string;
  content: string;
  postDate: Date;
  postTimeHour: string;
  postTimeMinute: string;
};

const NewPost = () => {
  const [formData, setFormData] = useState<formDataVo>({
    title: "",
    content: "",
    postDate: new Date(),
    postTimeHour: new Date().getHours().toString(),
    postTimeMinute: new Date().getMinutes().toString(),
  });

  useEffect(() => {
    console.log(formData);
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

  return (
    <div className="editor-wrap">
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        id="title"
        onChange={onChange}
      />
      <ReactQuill
        theme="snow"
        value={formData.content}
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
        <button>발행</button>
      </div>
    </div>
  );
};

export default NewPost;
