import parse from "html-react-parser";

import copy from "copy-to-clipboard";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IOneContent, IComment } from "../../util/interface";
import { generateHTML } from "@tiptap/core";
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
import {
  BookmarkAddOutlined,
  BookmarkOutlined,
  ChatBubble,
  Close,
  Favorite,
  IosShare,
  MoreHoriz,
} from "@mui/icons-material";
import { Alert, Collapse, IconButton } from "@mui/material";
// import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import Comment from "../../component/Comment/Comment";
import useAutosizeTextArea from "../../component/useAutosizeTextArea/useAutosizeTextArea";
import APIService from "../../service/APIs";

const Content = () => {
  const { id } = useParams();
  const [data, setData] = useState<IOneContent>();
  const [content, setContent] = useState("");
  const [follow, setFollow] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [like, setLike] = useState<number | undefined>();
  const [textarea, setTextarea] = useState("");
  const [commentList, setCommentList] = useState<IComment[]>();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, textarea);

  const callData = async () => {
    const data = await APIService.getByID(id);
    setData(data.data);
  };

  const putLike = (arg: number | undefined) => {
    const param = {
      ...data,
      like: arg,
    };

    APIService.putByID(id, param);
  };

  const putComment = () => {
    const param = {
      ...data,
      comments: data?.comments
        ? [
            ...data.comments,
            {
              user: "Midori",
              comment: textarea,
              date: new Date().toString(),
              like: 0,
            },
          ]
        : [
            {
              user: "Midori",
              comment: textarea,
              date: new Date().toISOString(),
              like: 0,
            },
          ],
    };
    APIService.putByID(id, param);
  };

  useEffect(() => {
    callData();
  }, [id]);

  useEffect(() => {
    if (data) {
      const output = generateHTML(data?.content, [
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
      setContent(output);
    }

    setLike(data?.like);
    setCommentList(data?.comments);

    // get bookmark form localStorage
    const localBookmark = localStorage.getItem(`bookmark_${id}`);

    if (localBookmark === "true") {
      setBookmark(true);
    } else {
      setBookmark(false);
    }
  }, [data]);

  const handleShare = () => {
    copy(window.location.href);
    setOpenAlert(true);
  };

  const handleLike = () => {
    setLike((prev) => {
      if (!(prev === undefined)) {
        putLike(prev + 1);
        return prev + 1;
      }
    });
  };

  const toggleComment = (inOpen: boolean) => {
    setOpenComment(inOpen);
  };

  const handleRespond = () => {
    if (commentList) {
      setCommentList([
        ...commentList,
        {
          user: "Midori",
          comment: textarea,
          date: new Date().toISOString(),
          like: 0,
        },
      ]);
    } else {
      setCommentList([
        {
          user: "Midori",
          comment: textarea,
          date: new Date().toISOString(),
          like: 0,
        },
      ]);
    }
    putComment();
  };

  const handleSaveBookmark = () => {
    setBookmark(true);
    localStorage.setItem(`bookmark_${id}`, "true");
    const localBookmarkList = localStorage.getItem("bookmark");
    // console.log(localBookmarkList);

    if (localBookmarkList) {
      let bookmarkList = JSON.parse(localBookmarkList);
      if (bookmarkList.length !== 0) {
        const res = [...bookmarkList, data];
        localStorage.setItem("bookmark", JSON.stringify(res));
      } else {
        const res = [data];
        localStorage.setItem("bookmark", JSON.stringify(res));
      }
      // console.log(bookmarkList);
    }
  };

  const handleRemoveBookmark = () => {
    setBookmark(false);
    localStorage.setItem(`bookmark_${id}`, "false");
    // console.log("bookmark ===> false");
  };

  return (
    <div className="min-w-[640px]">
      <img
        src={`https://picsum.photos/seed/${data?.id}/720/540`}
        alt=""
        className="mx-auto px-1 mt-10"
      />

      <div className="max-w-[680px] px-6 mx-auto">
        <div>
          <h1 className="text-[42px] font-bold">{data?.title}</h1>
          <div className="profile flex items-center">
            <div className="w-8 h-8 rounded-[100%] bg-black mr-2.5 "></div>
            <div>
              <div className="flex text-sm items-center">
                <div className="text-[#555555]">Name in Community</div>
                <span className="px-2">·</span>
                <div
                  onClick={() => setFollow((prev) => !prev)}
                  className="hover:cursor-pointer"
                >
                  {follow ? (
                    <div className="text-base">Following</div>
                  ) : (
                    <div className="text-base text-green-600">Follow</div>
                  )}
                </div>
              </div>
              <div className="flex text-xs text-[#6b6b6b]">
                <div>date</div>
              </div>
            </div>
          </div>
          <div className="navbar flex justify-between border-y-2 px-1 py-2 mt-8">
            <div className="flex items-center">
              <div
                className="flex items-center text-[12px] h-[24px] text-[#6b6b6b]  mr-2.5"
                onClick={handleLike}
              >
                {like ? (
                  <>
                    <Favorite className="mr-1 text-red-300" />
                    {like}
                  </>
                ) : (
                  <>
                    <Favorite className="mr-1 text-gray-300" />
                    {like}
                  </>
                )}
              </div>
              <div
                className="flex items-center text-[12px] h-[24px] text-[#6b6b6b] mr-2.5"
                onClick={() => toggleComment(true)}
              >
                {commentList?.length ? (
                  <>
                    <ChatBubble className="mr-1" /> {commentList?.length}
                  </>
                ) : (
                  <>
                    <ChatBubble className="mr-1 text-[#d0d5db]" />{" "}
                    {commentList?.length}
                  </>
                )}
              </div>
            </div>
            <div className="flex">
              <div className=" h-[24px] text-[#6b6b6b] mr-2.5">
                {bookmark ? (
                  <div onClick={handleRemoveBookmark}>
                    <BookmarkOutlined />
                  </div>
                ) : (
                  <div onClick={handleSaveBookmark}>
                    <BookmarkAddOutlined />
                  </div>
                )}
              </div>
              <div
                className=" h-[24px] text-[#6b6b6b] mr-2.5"
                onClick={handleShare}
              >
                <IosShare />
              </div>
              <div className=" h-[24px] text-[#6b6b6b] mr-2.5">
                <MoreHoriz />
              </div>
            </div>
          </div>
          <div className=" max-w-full">{parse(content)}</div>
          <div className="navbar flex justify-between border-y-2 px-1 py-2 mt-8">
            <div className="flex items-center">
              <div
                className="flex items-center text-[12px] h-[24px] text-[#6b6b6b]  mr-2.5"
                onClick={handleLike}
              >
                {like ? (
                  <>
                    <Favorite className="mr-1 text-red-300" />
                    {like}
                  </>
                ) : (
                  <>
                    <Favorite className="mr-1 text-gray-300" />
                    {like}
                  </>
                )}
              </div>
              <div
                className="flex items-center text-[12px] h-[24px] text-[#6b6b6b] mr-2.5"
                onClick={() => toggleComment(true)}
              >
                {commentList?.length ? (
                  <>
                    <ChatBubble className="mr-1" /> {commentList?.length}
                  </>
                ) : (
                  <>
                    <ChatBubble className="mr-1 text-[#d0d5db]" />{" "}
                    {commentList?.length}
                  </>
                )}
              </div>
            </div>
            <div className="flex">
              <div className=" h-[24px] text-[#6b6b6b] mr-2.5">
                {bookmark ? (
                  <div onClick={handleRemoveBookmark}>
                    <BookmarkOutlined />
                  </div>
                ) : (
                  <div onClick={handleSaveBookmark}>
                    <BookmarkAddOutlined />
                  </div>
                )}
              </div>
              <div
                className=" h-[24px] text-[#6b6b6b] mr-2.5"
                onClick={handleShare}
              >
                <IosShare />
              </div>
              <div className=" h-[24px] text-[#6b6b6b] mr-2.5">
                <MoreHoriz />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <footer className="h-[300px] bg-purple-300 mt-[72px]">Footer</footer> */}
      <Collapse in={openAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          className="fixed right-[50%] top-5"
        >
          Link copied
        </Alert>
      </Collapse>
      <Drawer
        open={openComment}
        onClose={() => toggleComment(false)}
        key={"right"}
        anchor="right"
        PaperProps={{
          sx: {
            background: "transparent",
          },
        }}
      >
        <div className="md:w-[380px] overflow-scroll bg-white rounded-[30px] md:mt-0 mt-12 w-[100vw] h-full px-5">
          <div className="flex justify-between py-3">
            <h1>{`Responses (${commentList?.length})`}</h1>
            <div
              onClick={() => toggleComment(false)}
              className="hover:cursor-pointer"
            >
              X
            </div>
          </div>
          <div className="h-fit shadow-md py-4 my-4">
            <div className="flex items-center mb-2 mx-4">
              <div className="w-8 h-8 rounded-[100%] bg-black mr-2.5 "></div>
              <div className="ml-3">
                <div>User Name</div>
              </div>
            </div>
            <div className="w-full h-fit p-4">
              <textarea
                value={textarea}
                onChange={(e) => setTextarea(e.target.value)}
                className="w-full focus:outline-none"
                placeholder="What are you thoughts?"
                ref={textAreaRef}
                rows={1}
              />
            </div>
            <div className="flex justify-between px-4">
              <button
                className="bg-red-600 text-white px-4 py-1 rounded-2xl"
                onClick={() => setTextarea("")}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-1 rounded-2xl disabled:bg-green-300"
                onClick={handleRespond}
                disabled={textarea === ""}
              >
                Respond
              </button>
            </div>
          </div>
          <div>
            {commentList?.map((item, index) => {
              return (
                <Comment
                  key={index}
                  user={item.user}
                  comment={item.comment}
                  date={item.date}
                  like={item.like}
                  id={data?.id}
                />
              );
            })}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Content;
