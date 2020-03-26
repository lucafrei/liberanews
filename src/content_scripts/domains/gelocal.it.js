import { createUnlockButton } from "../components";

const domain = "gelocal.it";

async function unlock() {
  const newArticle = await fetchArticle();
  replace(newArticle);
  removeBanner();
  return true;
}

function addUnlockButton() {
  const reference = document.querySelector("#ph-paywall:first-child");
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
  article.style.visibility = "visible";
  if (article.attributes.getNamedItem("hidden")) {
    article.attributes.removeNamedItem("hidden");
  }
  const note = document.createElement("div");
  note.innerHTML = `Article unlocked with <a href="https://github.com/lucafrei/liberanews" target="_blank"><code>liberanews</code></a>`;
  article.appendChild(note);
  return article;
}

function replace(newArticle) {
  const articleBody = document.getElementById("article-body");
  articleBody.replaceWith(newArticle);
  document.querySelector(".gnn-main-content").style = "overflow-x: unset";
}

function removeBanner() {
  const banner = document.querySelector(".paywall-adagio");
  banner.remove();
}

function check(timerId) {
  const phPaywall = document.querySelector("#ph-paywall");

  if (!phPaywall) {
    return;
  }
  window.clearInterval(timerId);
  console.log("liberanews: paywall found");
  addUnlockButton();
}

function run() {
  let timerId = window.setInterval(() => check(timerId), 1000);
}

export default { domain, run };
