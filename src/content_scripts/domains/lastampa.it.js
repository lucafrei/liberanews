import { createUnlockButton } from "../components";

const domain = "lastampa.it";

function unlock() {
  window.setTimeout(async () => {
    const newArticle = await fetchArticle();
    replace(newArticle);
    removeBanner();
  }, 2000);
}

function addUnlockButton() {
  const reference = document.getElementById("article-body");
  const container = reference.parentElement;
  const button = createUnlockButton(unlock);
  container.insertBefore(button, reference);
}

async function fetchArticle() {
  const req = await fetch(document.location.href);
  const text = await req.text();
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(text, "text/html");
  const article = doc.querySelector("#article-body");
  const note = document.createElement("div");
  note.innerHTML = `Article unlocked with <a href="https://github.com/lucafrei/liberanews" target="_blank"><code>liberanews</code></a>`;
  article.appendChild(note);
  return article;
}

function replace(newArticle) {
  const articleBody = document.getElementById("article-body");
  articleBody.replaceWith(newArticle);
}

function removeBanner() {
  const banner = document.querySelector(".paywall-adagio");
  banner.remove();
}

function run() {
  const articleBody = document.getElementById("article-body");
  const phPaywall = document.getElementById("ph-paywall");

  if (!phPaywall) {
    return;
  }
  console.log("liberanews: paywall found");
  addUnlockButton();
}

export default { domain, run };
