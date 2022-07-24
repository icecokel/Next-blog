import React, { useRef, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import { useDispatch } from "react-redux";
import { setError } from "../../../store/modules/clientState";

export type ImageFile = {
  src: string;
  file: File;
};

export interface IBaseEditorProps {
  imageList: Array<ImageFile>;
  setImageList: Function;
  value: any;
  onChange: (content: any) => void;
}

const BaseEditor = ({
  imageList: images,
  setImageList: setImages,
  value,
  onChange,
}: IBaseEditorProps) => {
  const quillRef = useRef<any>();
  const dispatch = useDispatch();
  const imageHandler = () => {
    const input = document.createElement("input");
    // eslint-disable-next-line react-hooks/rules-of-hooks

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("class", "display-none");
    document.body.appendChild(input);

    input.click();

    input.onchange = (): void => {
      if (!input.files) {
        dispatch(
          setError({
            isShowing: true,
            title: "파일을 찾수 없습니다. 다시 확인해주세요",
            error: "Not Found File",
          })
        );
      } else {
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
      }
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
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      modules={getModules}
      onChange={(contents) => {
        onChange(contents);
      }}
    />
  );
};

export default BaseEditor;
