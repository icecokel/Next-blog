import React, { useRef } from "react";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

interface IBaseEditorProps {
  getEditorHTML: (html: string | undefined) => void;
}

const BaseEditor = ({ getEditorHTML }: IBaseEditorProps) => {
  const editorRef = useRef<Editor>(null);
  const handleChangeEditor = () => {
    getEditorHTML(editorRef.current?.getInstance().getHTML());
  };
  return <Editor ref={editorRef} initialEditType={"markdown"} onChange={handleChangeEditor} />;
};

export default BaseEditor;
