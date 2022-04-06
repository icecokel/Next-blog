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

  const onChangeTitle = (e: any) => {
    const { value } = e.target;

    setFormData({ ...formData, title: value });
  };
  return (
    <>
      <div className="editor-title">
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          onChange={onChangeTitle}
        />
      </div>
      <ReactQuill theme="snow" />
    </>
  );
};

export default NewPost;
