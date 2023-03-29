import React, { useState } from "react";
import styles from "./BaseEditor.module.scss";
import MarkdownView from "react-showdown";
interface IBaseEditorProps {
  getEditorHTML: (html: string | undefined) => void;
}

const BaseEditor = ({ getEditorHTML }: IBaseEditorProps) => {
  const [text, setText] = useState<string>("");
  const handleChangeText = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(value);
    getEditorHTML(value);
  };
  return (
    <article className={styles.editorWrapper}>
      <div className={styles.tabs}>
        <section className={styles.toolbar}>d</section>
        <div className={styles.previewTab}>미리보기</div>
      </div>
      <div className={styles.viewWrapper}>
        <textarea className={styles.contents} value={text} onChange={handleChangeText} />
        <div className={styles.preview}>
          <MarkdownView markdown={text} />
        </div>
      </div>
    </article>
  );
};

export default BaseEditor;
