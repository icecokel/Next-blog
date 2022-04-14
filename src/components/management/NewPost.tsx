import { useState } from "react";
import ReactQuill from "react-quill";
import DatePicker from "react-datepicker";

type formDataVo = {
  title: string;
  content: string;
  postDate: Date;
};

const NewPost = () => {
  const [formData, setFormData] = useState<formDataVo>({
    title: "",
    content: "",
    postDate: new Date(),
  });

  const onChange = (e: any) => {
    const { value, id } = e.target;

    setFormData({ ...formData, [id]: value });
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
        <label>발행일</label>
        <DatePicker
          selected={formData.postDate}
          dateFormat={"yyyy년 MM월 dd일"}
          onChange={(date: Date) => {
            setFormData({ ...formData, postDate: date });
          }}
        />
      </div>
      <div className="button-wrap">
        <button>임시 저장</button>
        <button>발행</button>
      </div>
    </div>
  );
};

export default NewPost;
