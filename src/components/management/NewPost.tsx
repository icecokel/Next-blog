import { useState } from "react";
import ReactQuill from "react-quill";

type formDataVo = {
  title: string;
  content: string;
};

const NewPost = () => {
  const [formData, setFormData] = useState<formDataVo>({
    title: "",
    content: "",
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
        onChange={onChange}
        id="content"
      />
      <div className="button-wrap">
        <button>임시 저장</button>
        <button>발행</button>
      </div>
    </div>
  );
};

export default NewPost;
