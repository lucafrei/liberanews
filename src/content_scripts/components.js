export function createUnlockButton(callback) {
  async function wrapCallback() {
    text.innerHTML = "Working... might take up to 10 seconds";
    let result;
    try {
      result = await callback();
      console.log("liberanews:", result);
      if (!result) {
        throw Error("Cannot unlock");
      }
    } catch (e) {
      console.trace(e);
      console.log("liberanews: error", e);
      error.innerHTML = `<strong>Liberanews error</strong><br/> Try again, if it doesn't work contact me on <a href='https://twitter.com/FreiburgLuca' target='_blank'>Twitter</a>, <a href='https://github.com/lucafrei/liberanews' target='_blank'>GitHub</a>, or <a href='mailto:c.harlock@yandex.com?subject=Liberanews%20Error&body=URL:%20${document.location.href}'>send me an email</a>.`;
      error.style.display = "block";
    }
    button.remove();
  }

  const container = document.createElement("div");
  const error = document.createElement("div");
  const button = document.createElement("button");
  const img = document.createElement("img");
  const text = document.createElement("span");
  container.id = "liberanews--container";
  error.style = [
    "display: none",
    "margin: 20px auto",
    "font-size: 26px",
    "border: none",
    "color: black",
    "background: white",
    "padding: 10px 20px",
    "border-radius: 5px",
    "border: 2px solid #f44336"
  ].join(";");
  button.id = "liberanews--unlock";
  container.appendChild(error);
  container.appendChild(button);
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
  button.addEventListener("click", wrapCallback, false);
  return container;
}
