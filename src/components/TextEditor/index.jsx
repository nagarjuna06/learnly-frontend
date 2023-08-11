/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changes } from "../../../redux/slice/instructorSlice";

const TextEditor = ({ label, name, value, readOnly }) => {
  const dispatch = useDispatch();
  const [textEditorValue, setTextEditorValue] = useState(value);
  var modules = {
    toolbar: [
      ["bold", "italic", "underline", "link"],

      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  const handleChange = (data) => {
    setTextEditorValue(data);
    dispatch(changes());
  };
  return (
    <div className="my-text-editor">
      <ReactQuill
        readOnly={readOnly}
        modules={modules}
        theme="snow"
        value={textEditorValue}
        onChange={handleChange}
        placeholder={label}
      />
      <input
        type="text"
        name={name}
        hidden
        value={textEditorValue}
        onChange={() => {}}
      />
    </div>
  );
};

export default TextEditor;
