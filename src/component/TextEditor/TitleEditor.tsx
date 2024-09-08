import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import StarterKit from "@tiptap/starter-kit";

import "../../index.css";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export function TitleEditor() {
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
    ],
    content: `<h1>Title</h1>`,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="mt-[40px]">
      <EditorContent editor={editor} className="" />
    </div>
  );
}

// ยังไม่ใช้
