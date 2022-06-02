import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  ReactEventHandler,
} from "react";
import DatePicker from "react-datepicker";
import SesstionUtil from "../../common/SessionUtil";
import { SessionEnum } from "../../../src/common/SessionEnum";
import ReactQuill, { Quill } from "react-quill";
import { NewPostVO } from "../../common/Model";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import { setPost } from "../../../store/modules/post";
import { stat } from "fs";

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

const NewPost = () => {
  const state = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  const [images, setImages] = useState<Array<ImageFile>>();
  const quillRef = useRef<any>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(setPost({ ...state, [name]: value }));
  };

  const onChangeContents = (value: any) => {
    dispatch(setPost({ ...state, contents: value }));
  };
  const onChangeDatePicker = (date: any) => {
    dispatch(setPost({ ...state, registDate: date }));
  };
  const onChangeTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  const onClickPostButton = () => {
    const params = getParams();

    console.log(params);
  };

  const getTimeList = (type: "hour" | "minute") => {
    const maxCount = type === "hour" ? 24 : 60;
    const timeList = new Array();

    for (let i = 0; i < maxCount; i++) {
      timeList.push(i);
    }

    return timeList;
  };

  const getParams = () => {
    const params = { ...state };

    images?.forEach((item) => {
      if (params.contents.includes(item.src)) {
        // s3 업로드하고 링크 받아서 세팅해야함.

        const s3Link = "S3LINK:" + item.src;
        params.contents = params.contents.replaceAll(item.src, s3Link);
      }
    });

    return params;
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
    <div className="editor-wrap">
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        name="title"
        onChange={onChange}
        value={state.title}
      />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={state.contents}
        modules={getModules}
        onChange={(contents) => {
          onChangeContents(contents);
        }}
      />
      <div>
        <p>발행일</p>
        <div className="editor-date-wrap">
          <div className="editor-date">
            <DatePicker
              selected={state.registDate}
              dateFormat={"yyyy년 MM월 dd일"}
              onChange={onChangeDatePicker}
            />
          </div>
          <div className="editor-time">
            <select
              onChange={onChangeTime}
              name={"postTimehour"}
              value={state.registDate.getHours()}
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
              onChange={onChangeTime}
              name={"postTimeMinute"}
              value={state.registDate.getMinutes()}
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
        <button onClick={onClickPostButton}>발행</button>
      </div>
    </div>
  );
};

export default NewPost;
