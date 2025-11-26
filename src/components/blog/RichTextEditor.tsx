"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-background/50 border border-border rounded-xl animate-pulse flex items-center justify-center">
      <span className="text-muted-foreground">Loading editor...</span>
    </div>
  ),
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image"],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
    "color",
    "background",
  ];

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
      <style jsx global>{`
        .rich-text-editor .ql-container {
          min-height: 300px;
          font-size: 16px;
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          background: rgba(0, 0, 0, 0.2);
          border-color: hsl(var(--border));
        }
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          background: rgba(0, 0, 0, 0.3);
          border-color: hsl(var(--border));
        }
        .rich-text-editor .ql-toolbar .ql-stroke {
          stroke: hsl(var(--foreground));
        }
        .rich-text-editor .ql-toolbar .ql-fill {
          fill: hsl(var(--foreground));
        }
        .rich-text-editor .ql-toolbar .ql-picker {
          color: hsl(var(--foreground));
        }
        .rich-text-editor .ql-toolbar .ql-picker-options {
          background: hsl(var(--background));
          border-color: hsl(var(--border));
        }
        .rich-text-editor .ql-toolbar button:hover .ql-stroke,
        .rich-text-editor .ql-toolbar .ql-picker-label:hover .ql-stroke {
          stroke: hsl(var(--primary));
        }
        .rich-text-editor .ql-toolbar button:hover .ql-fill,
        .rich-text-editor .ql-toolbar .ql-picker-label:hover .ql-fill {
          fill: hsl(var(--primary));
        }
        .rich-text-editor .ql-toolbar button.ql-active .ql-stroke {
          stroke: hsl(var(--primary));
        }
        .rich-text-editor .ql-toolbar button.ql-active .ql-fill {
          fill: hsl(var(--primary));
        }
        .rich-text-editor .ql-editor {
          color: hsl(var(--foreground));
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: hsl(var(--muted-foreground));
          font-style: normal;
        }
        .rich-text-editor .ql-editor h1 {
          font-size: 2em;
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        .rich-text-editor .ql-editor h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        .rich-text-editor .ql-editor h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        .rich-text-editor .ql-editor blockquote {
          border-left: 4px solid hsl(var(--primary));
          padding-left: 1rem;
          margin: 1rem 0;
          color: hsl(var(--muted-foreground));
        }
        .rich-text-editor .ql-editor pre.ql-syntax {
          background: rgba(0, 0, 0, 0.4);
          border-radius: 0.5rem;
          padding: 1rem;
          overflow-x: auto;
        }
        .rich-text-editor .ql-editor a {
          color: hsl(var(--primary));
        }
        .rich-text-editor .ql-snow .ql-tooltip {
          background: hsl(var(--background));
          border-color: hsl(var(--border));
          color: hsl(var(--foreground));
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .rich-text-editor .ql-snow .ql-tooltip input[type="text"] {
          background: rgba(0, 0, 0, 0.2);
          border-color: hsl(var(--border));
          color: hsl(var(--foreground));
        }
      `}</style>
    </div>
  );
}
