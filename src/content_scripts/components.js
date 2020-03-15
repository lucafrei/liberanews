export function createUnlockButton(cb) {
  const button = document.createElement("button");
  const img = document.createElement("img");
  const text = document.createElement("span");
  button.id = "liberanews--unlock";
  button.appendChild(img);
  button.appendChild(text);
  button.style = [
    "display: block",
    "margin: 20px auto",
    "font-size: 26px",
    "border: none",
    "color: white",
    "background: #2e7d32",
    "padding: 10px 20px",
    "border-radius: 5px"
  ].join(";");
  img.src = browser.runtime.getURL("icons/icon-64.png");
  img.style = [
    "display: inline",
    "width: 32px",
    "height: 32px",
    "margin-right: 10px",
    "vertical-align: top"
  ].join(";");
  text.innerHTML = "Unlock article with <strong>liberanews</strong>";
  if (cb) {
    button.addEventListener("click", cb, false);
  }
  return button;
}
