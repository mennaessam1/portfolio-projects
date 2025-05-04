//TourContent.tsx
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TourContent = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (state: EditorState) => {
    setEditorState(state);
    const contentState = state.getCurrentContent();
    const plainText = contentState.getPlainText();
  };

  return (
    <>
      <div className="form-input">
        <Editor
          editorState={editorState}
          toolbarClassName="toolbar-wrapper"
          wrapperClassName="tox-tinymce"
          editorClassName="editor-wrapper"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
    </>
  );
};

export default TourContent;
