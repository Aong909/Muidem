// Tiptap Library
import { useEditor, EditorContent, Editor, BubbleMenu } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";

import { useCallback, useEffect, useState } from "react";
import "../../index.css";

//icon mui
import {
  ReplayOutlined,
  RefreshOutlined,
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatUnderlinedOutlined,
  FormatStrikethroughOutlined,
  CodeOutlined,
  FormatQuote,
} from "@mui/icons-material";
import StarterKit from "@tiptap/starter-kit";
import { Ifunc } from "../../util/interface";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export function TextEditor(func: Ifunc) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const editor = useEditor({
    extensions: [
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
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const json = editor.getHTML();
      setContent(json);
      localStorage.setItem(`content`, json);
    },
  }) as Editor;

  const editorTitle = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
    ],
    content: title,
    onUpdate: ({ editor }) => {
      const json = editor.getHTML();
      setTitle(json);
      localStorage.setItem(`title`, json);
    },
  }) as Editor;

  useEffect(() => {
    const saveContent = localStorage.getItem(`content`);
    const saveTitle = localStorage.getItem(`title`);

    if (saveContent) {
      setContent(saveContent);
    }

    if (saveTitle) {
      setTitle(saveTitle);
    }
  }, []);

  useEffect(() => {
    if (content && editor) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  useEffect(() => {
    if (title && editorTitle) {
      editorTitle.commands.setContent(title);
    }
  }, [title, editorTitle]);

  const toggleH2 = useCallback(() => {
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  }, [editor]);

  const toggleH3 = useCallback(() => {
    editor.chain().focus().toggleHeading({ level: 3 }).run();
  }, [editor]);

  const toggleBlockquote = useCallback(() => {
    editor.chain().focus().toggleBlockquote().run();
  }, [editor]);

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run();
  }, [editor]);

  editor.on("update", ({ editor }) => {
    func.setTiptapContent(editor.getJSON());
  });

  editorTitle?.on("update", ({ editor }) => {
    func.setTiptapTitle(editor.getText());
  });

  if (!editor || !editorTitle) {
    return null;
  }

  return (
    <div>
      <div className="mt-[40px]">
        <EditorContent editor={editorTitle} />
      </div>
      <div className="mt-[50px] border-0">
        <EditorContent editor={editor} />

        <BubbleMenu editor={editor}>
          <div className="Menu bg-black rounded-md px-2">
            <div className="absolute top-[100%] right-[50%] border-r-[8px] border-r-transparent border-l-[8px] border-l-transparent border-t-[8px]  border-t-black"></div>

            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className=" disabled:text-gray-400 text-white"
            >
              <ReplayOutlined />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className=" disabled:text-gray-400 text-white border-r-[1px] border-r-white"
            >
              <RefreshOutlined />
            </button>
            <button
              onClick={toggleBold}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              <FormatBoldOutlined />
            </button>
            <button
              onClick={toggleUnderline}
              className={editor.isActive("underline") ? "is-active" : ""}
            >
              <FormatUnderlinedOutlined />
            </button>
            <button
              onClick={toggleItalic}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              <FormatItalicOutlined />
            </button>
            <button
              onClick={toggleStrike}
              className={`${editor.isActive("strike") ? "is-active" : ""}`}
            >
              <FormatStrikethroughOutlined />
            </button>
            <button
              onClick={toggleCode}
              className={`${
                editor.isActive("code") ? "is-active" : ""
              } border-r-[1px] border-r-white`}
            >
              <CodeOutlined />
            </button>
            <button
              onClick={toggleH2}
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              H2
            </button>
            <button
              onClick={toggleH3}
              className={
                editor.isActive("heading", { level: 3 }) ? "is-active" : ""
              }
            >
              H3
            </button>
            <button
              onClick={toggleBlockquote}
              className={editor.isActive("blockquote") ? "is-active" : ""}
            >
              <FormatQuote />
            </button>
          </div>
        </BubbleMenu>
      </div>
    </div>
  );
}
