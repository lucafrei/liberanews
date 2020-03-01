const domain = "corriere.it";

function unlock(article) {
  window.setTimeout(async () => {
    document.querySelector("#pwl_overlay").remove();
    document.querySelector("#pwl_vt").remove();
    const newArticle = await fetchArticle();
    document.querySelector("#content-to-read").replaceWith(newArticle);
  }, 500);
}

function addUnlockButton(reference) {
  const container = reference.parentElement;
  const button = document.createElement("button");
  button.innerHTML = "Unlock article with <strong>liberanews</strong>";
  button.addEventListener("click", unlock, false);
  button.style =
    "display: block; margin: 20px auto; font-size: 26px; padding: 10px 20px";
  container.insertBefore(button, reference);
}

async function fetchArticle() {
  let url = document.location.origin + document.location.pathname;
  url = url.replace("_preview.shtml", ".shtml");
  const req = await fetch(url, { credentials: "omit" });
  const text = await req.text();
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(text, "text/html");
  const article = doc.querySelector("#content-to-read");
  const note = document.createElement("div");
  note.innerHTML = `Article unlocked with <a href="https://github.com/lucafrei/liberanews" target="_blank"><code>liberanews</code></a>`;
  article.appendChild(note);
  return article;
}

function check(timerId) {
  console.log("liberanews: check", timerId);
  const paywall = document.querySelector("#pwl_vt");
  if (!paywall) {
    return;
  }
  window.clearInterval(timerId);
  console.log("liberanews: paywall found");
  const reference = paywall.querySelector(".bottom_xs");
  addUnlockButton(reference);
}

function run() {
  let timerId = window.setInterval(() => check(timerId), 1000);
}

export default { domain, run };
