import "./Mark.css";
import { useRef } from "react";

export default function MarkdownEditor(props) {
  const textareaRef = useRef(null);

  // Функция оборачивания выделенного текста
  const applyFormatting = (format) => {
    if (!textareaRef.current) return;

    // Получаем позиции выделения
    const { selectionStart, selectionEnd } = textareaRef.current;
    const before = props.value.substring(0, selectionStart);
    const selectedText = props.value.substring(selectionStart, selectionEnd);
    const after = props.value.substring(selectionEnd);

    let wrappedText = "";

    // Определяем, какую разметку применить, и оборачиваем выделенный текст.
    // Если ничего не выделено, можно вставить текст-заглушку.
    switch (format) {
      case "bold":
        wrappedText = `**${selectedText || "bold"}**`;
        break;
      case "italic":
        wrappedText = `*${selectedText || "italic"}*`;
        break;
      case "header":
        wrappedText = `# ${selectedText || "Header"}`;
        break;
      case "link":
        wrappedText = `[${selectedText || "click"}](https://example.com)`;
        break;
      case "quote":
        wrappedText = `> ${selectedText || "Quotes"}`;
        break;
      case "code":
        wrappedText = `\`${selectedText || "code"}\``;
        break;
      case "image":
        wrappedText = `![${selectedText || "Name"}](https://example.com)`;
        break;
      case "line":
        wrappedText = `\n***`;
        break;
      case "table":
        wrappedText =
          `\n| Header | Header | Header |\n` +
          `| ------ | ------ | ------ |\n` +
          `| Data | Data | Data |`;
        break;
      default:
        wrappedText = selectedText;
    }

    // Собираем новый текст
    const newValue = before + wrappedText + after;
    props.setValue(newValue);
  };

  return (
    <div className="markdown-editor">
      {/* Панель инструментов */}
      <div className="editor-toolbar">
        <div className="editor-toolbar-btns">
          <button onClick={() => applyFormatting("bold")}></button>
          <button onClick={() => applyFormatting("italic")}></button>
          <button onClick={() => applyFormatting("header")}></button>
          <button onClick={() => applyFormatting("link")}></button>
          <button onClick={() => applyFormatting("quote")}></button>
          <button onClick={() => applyFormatting("code")}></button>
          <button onClick={() => applyFormatting("image")}></button>
          <button onClick={() => applyFormatting("line")}></button>
          <button onClick={() => applyFormatting("table")}></button>
        </div>
      </div>

      {/* Поле ввода Markdown */}
      <textarea
        ref={textareaRef}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        className="editor-textarea"
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        placeholder="Please enter markdown text here..."
      ></textarea>
    </div>
  );
}