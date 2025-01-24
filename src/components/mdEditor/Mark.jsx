import "./Mark.css";

export default function MarkdownEditor(props) {
  // Обработчики для кнопок форматирования
  const applyFormatting = (format) => {
    if (format === "bold") props.setValue((prev) => `${prev}**bold**`);
    if (format === "italic") props.setValue((prev) => `${prev}*italic*`);
    if (format === "header") props.setValue((prev) => `${prev}\n# Header`);
    if (format === "link") props.setValue((prev) => `${prev}[click](https://example.com)`);
    if (format === "quote") props.setValue((prev) => `${prev}\n> Quotes`);
    if (format === "code") props.setValue((prev) => `${prev}\n ${"`code`"} `);
    if (format === "image") props.setValue((prev) => `${prev}\n![Name](https://example.com)`);
  };

  return (
    <div className="markdown-editor">
      {/* Панель инструментов */}
      
      <div className="editor-toolbar">
        <div className="editor-toolbar-btns">
          <button onClick={() => applyFormatting("bold")}></button>
          <button onClick={() => applyFormatting("italic")}></button>
          <button onClick={() => applyFormatting("header")}> </button>
          <button onClick={() => applyFormatting("link")}></button>
          <button onClick={() => applyFormatting("quote")}></button>
          <button onClick={() => applyFormatting("code")}></button>
          <button onClick={() => applyFormatting("image")}></button>
        </div>
      </div>

      {/* Поле ввода Markdown */}
      <textarea
        className="editor-textarea"
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        placeholder="Please enter markdown text here..."
      ></textarea>
    </div>
  );
}