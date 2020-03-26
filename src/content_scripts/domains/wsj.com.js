import { sleep } from "../utils";
import { createUnlockButton } from "../components";

const domain = "wsj.com";
const TOTALLY_ARBITRARY_ATTEMPTS = 20;
const TOTALLY_ARBITRARY_SLEEP_TIME = 100;

async function unlock() {
  let article;
  for (let i = 0; i < TOTALLY_ARBITRARY_ATTEMPTS; i++) {
    console.log("liberanews: fetch article, attempt", i);
    article = await fetchArticle();
    if (article) {
      document.querySelector(".wsj-snippet-body").replaceWith(article);
      document.querySelector(".wsj-snippet-login").remove();
      return true;
    }
    await sleep(TOTALLY_ARBITRARY_SLEEP_TIME);
  }
}

function addUnlockButton(reference) {
  const container = reference.parentElement;
  const button = createUnlockButton(unlock);
  container.insertBefore(button, reference);
}

async function fetchArticle() {
  let url = document.location.href;
  const req = await fetch(url, {
    headers: { "X-Liberanews-Fetch-As": "googlebot" }
  });
  const text = await req.text();
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(text, "text/html");
  const article = doc.querySelector(".article-content");
  if (!article) {
    return;
  }
  const note = document.createElement("div");
  note.innerHTML = `Article unlocked with <a href="https://github.com/lucafrei/liberanews" target="_blank"><code>liberanews</code></a>`;
  article.appendChild(note);
  return article;
}

function replace(lockedArticle, newArticle) {
  lockedArticle.innerHTML = newArticle.innerHTML;
}

function check(timerId) {
  console.log("liberanews: check", timerId);
  const paywall = document.querySelector(".wsj-snippet-login");
  if (!paywall) {
    return;
  }
  window.clearInterval(timerId);
  console.log("liberanews: paywall found");
  addUnlockButton(paywall.querySelector(".snippet-label"));
}

function run() {
  let timerId = window.setInterval(() => check(timerId), 1000);
}

export default { domain, run };
