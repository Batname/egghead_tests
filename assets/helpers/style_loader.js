function insertRules (style_rows) {
  let style = document.createElement("style");
  style.appendChild(document.createTextNode(style_rows));
  document.head.appendChild(style);
}

export default insertRules;