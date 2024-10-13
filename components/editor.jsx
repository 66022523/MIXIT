"use client";
import { useCallback, forwardRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Dropcursor from "@tiptap/extension-dropcursor";
import Blockquote from "@tiptap/extension-blockquote";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import HardBreak from "@tiptap/extension-hard-break";
import Code from "@tiptap/extension-code";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import ListItem from "@tiptap/extension-list-item";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextStyle from "@tiptap/extension-text-style";
import History from "@tiptap/extension-history";
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  BackspaceIcon,
  BoldIcon,
  ChatBubbleBottomCenterTextIcon,
  CodeBracketIcon,
  CodeBracketSquareIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  ItalicIcon,
  ListBulletIcon,
  MinusIcon,
  NumberedListIcon,
  PhotoIcon,
  StrikethroughIcon,
} from "@heroicons/react/24/outline";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import { MarkdownIcon } from "@/components/icons";
import { imageToBase64 } from "@/utils";

export const InputContentEditor = forwardRef(
  function InputContentEditor(props, ref) {
    const lowlight = createLowlight(all);

    lowlight.register("html", html);
    lowlight.register("css", css);
    lowlight.register("js", js);
    lowlight.register("ts", ts);

    const limit = 2048;
    const editor = useEditor({
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl p-5 min-h-32 focus:outline-none",
        },
      },
      extensions: [
        Document,
        Heading.configure({
          levels: [1, 2, 3],
        }),
        Placeholder.configure({
          placeholder: "Write something …",
        }),
        CharacterCount.configure({
          limit,
        }),
        Image.configure({
          allowBase64: true,
        }),
        Bold,
        Italic,
        Code,
        Strike,
        Paragraph,
        HardBreak,
        Highlight,
        Typography,
        Blockquote,
        Dropcursor,
        HorizontalRule,
        History,
        Text,
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({ types: [ListItem.name] }),
        OrderedList,
        BulletList,
        ListItem,
        CodeBlockLowlight.configure({
          lowlight,
          HTMLAttributes: {
            class: "bg-base-300 text-base-content rounded-box py-2 px-3 mx-2",
          },
        }),
      ],
      editable: !props.disabled,
      onUpdate({ editor }) {
        props.setState(editor.getHTML());
      },
    });
    const percentage = editor
      ? Math.round((100 / limit) * editor.storage.characterCount.characters())
      : 0;

    const addImage = useCallback(
      async (event) => {
        const files = event.target.files;
        if (files?.length) {
          for (const file of files) {
            const src = await imageToBase64(file);
            editor.chain().focus().setImage({ src }).run();
          }
        }
      },
      [editor],
    );

    if (!editor) return;

    return (
      <div className="form-control">
        <div className="label">
          <span className="label-text">Content</span>
        </div>
        <div
          className="textarea textarea-bordered p-0"
          disabled={props.disabled}
        >
          <ul className="menu menu-horizontal w-full rounded-t-btn bg-base-200">
            <li className={props.disabled ? "disabled" : ""}>
              <details className="z-10">
                <summary>
                  {editor.isActive("paragraph") ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path d="m23,0h-14.5C3.813,0,0,3.813,0,8.5s3.813,8.5,8.5,8.5h5.5v6c0,.553.448,1,1,1s1-.447,1-1V2h3v21c0,.553.448,1,1,1s1-.447,1-1V2h2c.552,0,1-.447,1-1s-.448-1-1-1Zm-9,15h-5.5c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5h5.5v13Z" />
                    </svg>
                  ) : editor.isActive("heading", { level: 1 }) ? (
                    <H1Icon className="size-5" />
                  ) : editor.isActive("heading", { level: 2 }) ? (
                    <H2Icon className="size-5" />
                  ) : editor.isActive("heading", { level: 3 }) ? (
                    <H3Icon className="size-5" />
                  ) : editor.isActive("bulletList") ? (
                    <ListBulletIcon className="size-5" />
                  ) : editor.isActive("orderedList") ? (
                    <NumberedListIcon className="size-5" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path d="m23,0h-14.5C3.813,0,0,3.813,0,8.5s3.813,8.5,8.5,8.5h5.5v6c0,.553.448,1,1,1s1-.447,1-1V2h3v21c0,.553.448,1,1,1s1-.447,1-1V2h2c.552,0,1-.447,1-1s-.448-1-1-1Zm-9,15h-5.5c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5h5.5v13Z" />
                    </svg>
                  )}
                </summary>
                <ul className="bg-base-200">
                  <h2 className="menu-title">Hierarchy</h2>
                  <li className={props.disabled ? "disabled" : ""}>
                    <button
                      type="button"
                      onClick={() =>
                        editor.chain().focus().setParagraph().run()
                      }
                      className={editor.isActive("paragraph") ? "active" : ""}
                      disabled={props.disabled}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path d="m23,0h-14.5C3.813,0,0,3.813,0,8.5s3.813,8.5,8.5,8.5h5.5v6c0,.553.448,1,1,1s1-.447,1-1V2h3v21c0,.553.448,1,1,1s1-.447,1-1V2h2c.552,0,1-.447,1-1s-.448-1-1-1Zm-9,15h-5.5c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5h5.5v13Z" />
                      </svg>
                      Paragraph
                    </button>
                  </li>
                  <li className={props.disabled ? "disabled" : ""}>
                    <button
                      type="button"
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                      }
                      className={
                        editor.isActive("heading", { level: 1 }) ? "active" : ""
                      }
                      disabled={props.disabled}
                    >
                      <H1Icon className="size-5" />
                      Heading 1
                    </button>
                  </li>
                  <li className={props.disabled ? "disabled" : ""}>
                    <button
                      type="button"
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                      }
                      className={
                        editor.isActive("heading", { level: 2 }) ? "active" : ""
                      }
                      disabled={props.disabled}
                    >
                      <H2Icon className="size-5" />
                      Heading 2
                    </button>
                  </li>
                  <li className={props.disabled ? "disabled" : ""}>
                    <button
                      type="button"
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                      }
                      className={
                        editor.isActive("heading", { level: 3 }) ? "active" : ""
                      }
                      disabled={props.disabled}
                    >
                      <H3Icon className="size-5" />
                      Heading 3
                    </button>
                  </li>
                  <h2 className="menu-title">Lists</h2>
                  <li className={props.disabled ? "disabled" : ""}>
                    <button
                      type="button"
                      onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                      }
                      className={editor.isActive("bulletList") ? "active" : ""}
                      disabled={props.disabled}
                    >
                      <ListBulletIcon className="size-5" />
                      Bullet List
                    </button>
                  </li>
                  <li className={props.disabled ? "disabled" : ""}>
                    <button
                      type="button"
                      onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                      }
                      className={editor.isActive("orderedList") ? "active" : ""}
                      disabled={props.disabled}
                    >
                      <NumberedListIcon className="size-5" />
                      Ordered List
                    </button>
                  </li>
                </ul>
              </details>
            </li>
            <li className={props.disabled ? "disabled" : ""}>
              <label>
                <input
                  type="color"
                  className="size-5 rounded-sm"
                  onInput={(event) =>
                    editor.chain().focus().setColor(event.target.value).run()
                  }
                  value={editor.getAttributes("textStyle").color}
                  disabled={props.disabled}
                />
              </label>
            </li>
            <li className={props.disabled ? "disabled" : ""}>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                  !editor.can().chain().focus().toggleBold().run() ||
                  props.disabled
                }
                className={editor.isActive("bold") ? "active" : ""}
              >
                <BoldIcon className="size-5" />
              </button>
            </li>
            <li className={props.disabled ? "disabled" : ""}>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                  !editor.can().chain().focus().toggleItalic().run() ||
                  props.disabled
                }
                className={editor.isActive("italic") ? "active" : ""}
              >
                <ItalicIcon className="size-5" />
              </button>
            </li>
            <li className={props.disabled ? "disabled" : ""}>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                  !editor.can().chain().focus().toggleStrike().run() ||
                  props.disabled
                }
                className={editor.isActive("strike") ? "active" : ""}
              >
                <StrikethroughIcon className="size-5" />
              </button>
            </li>
            <li className={props.disabled ? "disabled" : ""}>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={
                  !editor.can().chain().focus().toggleCode().run() ||
                  props.disabled
                }
                className={editor.isActive("code") ? "active" : ""}
              >
                <CodeBracketIcon className="size-5" />
              </button>
            </li>
            <li className={props.disabled ? "disabled" : ""}>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive("codeBlock") ? "active" : ""}
                disabled={props.disabled}
              >
                <CodeBracketSquareIcon className="size-5" />
              </button>
            </li>
            <li className={props.disabled ? "disabled" : ""}>
              <label>
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onInput={addImage}
                  multiple
                />
                <PhotoIcon className="size-5" />
              </label>
            </li>
            <li className={props.disabled ? "disabled" : ""}>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={editor.isActive("highlight") ? "active" : ""}
                disabled={props.disabled}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M7.5,21c1.64,0,3.2-.7,4.3-1.93L21.98,7.32c1.43-1.65,1.34-4.15-.2-5.69l-.41-.41c-1.54-1.54-4.04-1.63-5.69-.2L3.92,11.21c-1.22,1.09-1.92,2.65-1.92,4.29v4.79l-1.85,1.85c-.2,.2-.2,.51,0,.71,.1,.1,.23,.15,.35,.15s.26-.05,.35-.15l1.85-1.85H7.5Zm-2.91-9.04L16.34,1.78c1.25-1.09,3.15-1.02,4.33,.15l.41,.41c1.17,1.17,1.24,3.07,.15,4.33l-10.18,11.75c-.24,.27-.51,.51-.81,.72,0-.01-.02-.02-.03-.03L3.9,12.8s-.02-.02-.04-.03c.21-.29,.44-.56,.71-.8Zm-1.58,3.54c0-.63,.13-1.26,.37-1.83l5.96,5.96c-.57,.24-1.19,.37-1.83,.37H3v-4.5Zm21,8c0,.28-.22,.5-.5,.5H4.5c-.28,0-.5-.22-.5-.5s.22-.5,.5-.5H23.5c.28,0,.5,.22,.5,.5Z" />
                </svg>
              </button>
            </li>
            <li className={props.disabled ? "disabled" : ""}>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive("blockquote") ? "active" : ""}
                disabled={props.disabled}
              >
                <ChatBubbleBottomCenterTextIcon className="size-5" />
              </button>
            </li>
            <li className={props.disabled ? "disabled" : ""}>
              <button
                type="button"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                disabled={props.disabled}
              >
                <MinusIcon className="size-5" />
              </button>
            </li>
            <li className={props.disabled ? "disabled" : ""}>
              <button
                type="button"
                onClick={() =>
                  editor.chain().focus().unsetAllMarks().clearNodes().run()
                }
                disabled={props.disabled}
              >
                <BackspaceIcon className="size-5" />
              </button>
            </li>
            <li
              className={
                !editor.can().undo() || props.disabled ? "disabled" : ""
              }
            >
              <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo() || props.disabled}
              >
                <ArrowUturnLeftIcon className="size-5" />
              </button>
            </li>
            <li
              className={
                !editor.can().redo() || props.disabled ? "disabled" : ""
              }
            >
              <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo() || props.disabled}
              >
                <ArrowUturnRightIcon className="size-5" />
              </button>
            </li>
          </ul>
          <EditorContent editor={editor} />
        </div>
        <div className="label">
          <span
            className={`label-text-alt flex items-center gap-2 ${
              editor.storage.characterCount.characters() === limit
                ? "text-warning"
                : ""
            }`}
          >
            <div
              className="radial-progress border-4 border-base-200 bg-base-200"
              style={{
                "--value": percentage,
                "--size": "1rem",
                "--thickness": "4px",
              }}
              role="progressbar"
            />
            <p>
              {editor.storage.characterCount.characters()} / {limit} characters
              <br />
              {editor.storage.characterCount.words()} words
            </p>
          </span>
          <span className="label-text-alt flex items-center gap-2">
            <MarkdownIcon className="size-5" /> Markdown format support.
          </span>
        </div>
      </div>
    );
  },
);
