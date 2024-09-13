import { TextEditor } from "../../component/TextEditor/textEditor";

import { useState } from "react";
import { JSONContent } from "@tiptap/core";
import { Link } from "react-router-dom";
import APIService from "../../service/APIs";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent>();

  const saveContent = async () => {
    // await axios.post("http://localhost:3001/tiptap", {
    //   title: title,
    //   content: content,
    //   date: new Date().toString(),
    //   like: 0,
    //   comments: [],
    // });

    const param = {
      title: title,
      content: content,
      date: new Date().toString(),
      like: 0,
      comments: [],
    };

    APIService.postData(param);

    localStorage.removeItem("title");
    localStorage.removeItem("content");
  };

  const setTiptapContent = (json: JSONContent) => {
    setContent(json);
  };

  const setTiptapTitle = (title: string) => {
    setTitle(title);
  };

  return (
    <div>
      <div className="relative">
        <Link to={"/"}>
          <button
            onClick={saveContent}
            className="px-2.5 py-1 bg-green-600 text-write rounded-xl absolute right-[20%] top-[-35px]"
          >
            SAVE
          </button>
        </Link>
      </div>
      <div className="px-[30%]">
        <TextEditor
          setTiptapContent={setTiptapContent}
          setTiptapTitle={setTiptapTitle}
        />
      </div>
    </div>
  );
};

export default Write;
