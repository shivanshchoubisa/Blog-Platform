/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoNgNARATAdAjABhgikCsUoHY5YVgFgSgTgGYSCAOMhfBELMsuR67EEMgThLRFQQApgDtUCMMDhhpssBLgBdSFgBmcAMZpiERUA=
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Autosave,
  Essentials,
  Paragraph,
  Autoformat,
  TextTransformation,
  ImageBlock,
  ImageToolbar,
  BlockQuote,
  CloudServices,
  ImageUpload,
  ImageInsertViaUrl,
  AutoImage,
  Table,
  TableToolbar,
  Heading,
  ImageTextAlternative,
  ImageCaption,
  ImageStyle,
  ImageInline,
  List,
  TableCaption,
  TodoList,
  Fullscreen,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Subscript,
  Superscript,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Highlight,
  Markdown,
  MediaEmbed,
  PasteFromMarkdownExperimental,
  Alignment,
  GeneralHtmlSupport,
  Indent,
  IndentBlock,
  HorizontalLine,
  PlainTableOutput,
  Emoji,
  Mention,
  Title,
  TextPartLanguage,
  Link,
  AutoLink,
  CodeBlock,
  BalloonToolbar,
  BlockToolbar,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

// import './App.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = "GPL"; // or <YOUR_LICENSE_KEY>.

export default function Editor({ initialData, onChange }) {
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "textPartLanguage",
            "fullscreen",
            "|",
            "heading",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "subscript",
            "superscript",
            "code",
            "|",
            "emoji",
            "horizontalLine",
            "link",
            "mediaEmbed",
            "insertTable",
            "highlight",
            "blockQuote",
            "codeBlock",
            "|",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          BalloonToolbar,
          BlockQuote,
          BlockToolbar,
          Bold,
          CloudServices,
          Code,
          CodeBlock,
          Emoji,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          Fullscreen,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsertViaUrl,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          List,
          Markdown,
          MediaEmbed,
          Mention,
          Paragraph,
          PasteFromMarkdownExperimental,
          PlainTableOutput,
          Strikethrough,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableToolbar,
          TextPartLanguage,
          TextTransformation,
          Title,
          TodoList,
          Underline,
        ],
        balloonToolbar: [
          "bold",
          "italic",
          "|",
          "link",
          "|",
          "bulletedList",
          "numberedList",
        ],
        blockToolbar: [
          "fontSize",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "|",
          "link",
          "insertTable",
          "|",
          "bulletedList",
          "numberedList",
          "outdent",
          "indent",
        ],
        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        fullscreen: {
          onEnterCallback: (container) =>
            container.classList.add(
              "editor-container",
              "editor-container_classic-editor",
              "editor-container_include-block-toolbar",
              "editor-container_include-fullscreen",
              "main-container",
            ),
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true,
            },
          ],
        },
        image: {
          toolbar: [
            "toggleImageCaption",
            "imageTextAlternative",
            "|",
            "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
          ],
        },
        initialData: initialData || "",
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        mention: {
          feeds: [
            {
              marker: "@",
              feed: [
                /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
              ],
            },
          ],
        },
        placeholder: "Type or paste your content here!",
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
      },
    };
  }, [isLayoutReady]);

  return (
    <div className="main-container">
      <div className="editor-container editor-container_classic-editor editor-container_include-block-toolbar editor-container_include-fullscreen">
        <div className="editor-container__editor">
          <div>
            {editorConfig && (
              <CKEditor
                onChange={(event, editor) => {
                  const data = editor.getData();
				  console.log(data)
                  onChange?.(data);
                }}
                editor={ClassicEditor}
                config={editorConfig}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
