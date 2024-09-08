import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
import Underline from "@tiptap/extension-underline";
import { generateHTML } from "@tiptap/html";

import CalcDate from "../CalcDate/CalcDate";

import {
  Favorite,
  ChatBubble,
  RemoveCircleOutline,
  BookmarkAddOutlined,
  BookmarkOutlined,
  MoreHoriz,
} from "@mui/icons-material";

import Tooltip from "@mui/material/Tooltip";

import React, { useEffect, useMemo, useState } from "react";

import { IOneContent } from "../../util/interface";

import parse from "html-react-parser";
import { Link } from "react-router-dom";

interface IOneContent_Delete extends IOneContent {
  onDelete: (id: string) => Promise<void>;
  addSaveList: (item: IOneContent, checkSave: boolean) => void;
}

const ContentList = (data: IOneContent_Delete) => {
  const content = useMemo(() => {
    return generateHTML(data.content, [
      Document,
      Paragraph,
      Text,
      Bold, //
      Underline, //
      Italic,
      Strike,
      Code,
      Blockquote,
      History,
      Heading.configure({
        levels: [2, 3],
      }),
      // other extensions …
    ]);
  }, [data.content]);

  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    const localBookmark = localStorage.getItem(`bookmark_${data.id}`);

    if (localBookmark === "true") {
      setBookmark(true);
    }
  }, []);

  const handleSaveBookmark = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setBookmark(true);
    data.addSaveList(data, true);
    localStorage.setItem(`bookmark_${data.id}`, "true");
  };

  const handleRemoveBookmark = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setBookmark(false);
    data.addSaveList(data, false);
    localStorage.setItem(`bookmark_${data.id}`, "false");
  };

  const handleRemove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    data.onDelete(data.id);
  };

  const dateContent = CalcDate(data.date);

  return (
    <Link to={`/content/${data.id}`}>
      <div className="flex justify-between mt-[10px] p-[10px] border-b-2 border-gray-500 ">
        <div className="flex-1">
          <div className="flex">
            <div className="w-5 h-5 rounded-[100%] bg-black mr-2.5 "></div>
            <div className="text-[#555555]">Name in Community</div>
          </div>
          <div className="max-h-[80px] overflow-hidden text-[24px]">
            <b className="">{data.title}</b>
          </div>
          <div className="max-h-[76px] overflow-hidden text-[#6b6b6b]">
            {parse(content)}
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="text-[12px] text-[#6b6b6b] mr-2.5">
                {dateContent}
              </div>
              <div className="flex items-center text-[12px] h-[24px] text-[#6b6b6b]  mr-2.5">
                {data.like ? (
                  <>
                    <Favorite className="mr-1 text-red-300" />
                    {data.like}
                  </>
                ) : (
                  <>
                    <Favorite className="mr-1 text-gray-300" />
                    {data.like}
                  </>
                )}
              </div>
              {data.comments?.length ? (
                <div className="flex items-center text-[12px] h-[24px] text-[#6b6b6b] mr-2.5">
                  <ChatBubble className="mr-1 " /> {data.comments?.length}
                </div>
              ) : (
                <div className="flex items-center text-[12px] h-[24px] text-[#6b6b6b] mr-2.5">
                  <ChatBubble className="mr-1 text-gray-300" />
                  {data.comments?.length}
                </div>
              )}
            </div>
            <div className="flex">
              <div
                className=" h-[24px] text-[#6b6b6b] mr-2.5 "
                onClick={(e) => handleRemove(e)}
              >
                <Tooltip title="Remove">
                  <RemoveCircleOutline />
                </Tooltip>
              </div>
              <div className=" h-[24px] text-[#6b6b6b] mr-2.5">
                {bookmark ? (
                  <div onClick={(e) => handleRemoveBookmark(e)}>
                    <Tooltip title="Remove Bookmark">
                      <BookmarkOutlined />
                    </Tooltip>
                  </div>
                ) : (
                  <div onClick={(e) => handleSaveBookmark(e)}>
                    <Tooltip title="Save Bookmark">
                      <BookmarkAddOutlined />
                    </Tooltip>
                  </div>
                )}
              </div>
              <div className=" h-[24px] text-[#6b6b6b] mr-2.5">
                <MoreHoriz />
              </div>
            </div>
          </div>
        </div>
        <div className="w-40 h-40 p-2.5 mx-5">
          <img src={`https://picsum.photos/seed/${data.id}/160/160`} alt="" />
        </div>
      </div>
    </Link>
  );
};

export default ContentList;
