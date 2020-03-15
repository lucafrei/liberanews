import { createUnlockButton } from "../components";

const domain = "theglobeandmail.com";

function unlock(article) {
  window.setTimeout(async () => {
    const newArticle = await fetchArticle();
    article.replaceWith(newArticle);
    document.getElementsByTagName("html")[0].classList.remove("keytar-enabled");
    document.querySelector("#teaser-container").remove();
    document.querySelector(".c-keytar-header").remove();
    document.querySelector(".c-keytar-content").remove();
    document.querySelector(".c-keytar-footer").remove();
  }, 500);
}

function addUnlockButton(article) {
  const container = article.parentElement;
  const button = createUnlockButton(unlock.bind(null, article));
  container.insertBefore(button, article);
}

async function fetchArticle() {
  const req = await fetch(document.location.href);
  const text = await req.text();
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(text, "text/html");
  const article = doc.querySelector(".c-article-body");
  const note = document.createElement("div");
  note.innerHTML = `Article unlocked with <a href="https://github.com/lucafrei/liberanews" target="_blank"><code>liberanews</code></a>`;
  article.appendChild(note);
  return article;
}

function check(timerId) {
  const article = document.querySelector(".c-article-body");
  const paywall = document.querySelector(".c-keytar-header");
  if (!paywall) {
    return;
  }
  window.clearInterval(timerId);
  console.log("liberanews: paywall found");
  addUnlockButton(article);
}

function run() {
  let timerId = window.setInterval(() => check(timerId), 1000);
}

export default { domain, run };
