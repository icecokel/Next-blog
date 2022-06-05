import React, { useMemo, useRef } from "react";
import DatePicker from "react-datepicker";
import ReactQuill, { Quill } from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { setPost } from "../../../store/modules/post";
import { HOURS, MINUTES } from "../../common/DateUtil";

/**
 * todos
 *
 * 이미지 버튼 클릭  -  핸들러 추가
 * 파일 배열에 저장  -  상태 저장
 * 파일 url을 화면에 이미지로 렌더링  -  렌더링 성공
 * 발행 클릭시, file을 s3에 업로드
 * 업로드 후 바로 링크 저장
 * formData에서 교체
 * formData를 DB or FireBase에 저장
 *
 * 임시 저장 기능
 *
 */

type ImageFile = {
  src: string;
  file: File;
};

interface INewPostCpProps {
  imageList: Array<ImageFile>;
  setImageList: Function;
}

const NewPostCp = ({
  imageList: images,
  setImageList: setImages,
}: INewPostCpProps) => {
  const state = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  const quillRef = useRef<any>();

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

  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("class", "display-none");
    document.body.appendChild(input);

    input.click();

    input.onchange = () => {
      if (!input.files) {
        return;
      }

      const file = input.files[0];
      const tempImages: Array<ImageFile> = [...(images ?? [])];

      const src = window.URL.createObjectURL(file);
      const range = quillRef.current.getEditorSelection();
      const Image = Quill.import("formats/image");

      Image.sanitize = (url: string) => url;
      quillRef.current.getEditor().insertEmbed(range.index, "image", src);
      quillRef.current.getEditor().setSelection(range.index + 1);

      tempImages.push({ src, file });

      setImages(tempImages);

      document.body.removeChild(input);
    };
  };

  const getModules = useMemo(
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
        handlers: { image: imageHandler },
      },
    }),
    []
  );

  return (
    <>
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        name="title"
        onChange={handleChangeText}
        value={state.title}
      />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={state.contents}
        modules={getModules}
        onChange={(contents) => {
          handleChangeContents(contents);
        }}
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
