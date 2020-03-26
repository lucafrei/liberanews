import { createUnlockButton } from "../components";

const domain = "repubblica.it";

async function unlock(lockedArticle) {
  const newArticle = await fetchArticle();
  replace(lockedArticle, newArticle);
  return true;
}

function addUnlockButton(lockedArticle) {
  const container = lockedArticle.parentElement;
  const button = createUnlockButton(unlock.bind(null, lockedArticle));
  container.insertBefore(button, lockedArticle);
}

async function fetchArticle() {
  let url = document.location.href;
  url = url.replace(
    "https://rep.repubblica.it/pwa/",
    "https://rep.repubblica.it/ws/detail/"
  );
  url = url.substring(0, url.length - 1);

  const req = await fetch(url);
  const text = await req.text();
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(text, "text/html");
  const article = doc.querySelector(".detail-article_body .paywall");
  const note = document.createElement("div");
  note.innerHTML = `Article unlocked with <a href="https://github.com/lucafrei/liberanews" target="_blank"><code>liberanews</code></a>`;
  article.querySelector("div.adv").replaceWith(note);
  return article;
}

function replace(lockedArticle, newArticle) {
  lockedArticle.innerHTML = newArticle.innerHTML;
}

function removeBanner() {
  const banner = document.querySelector(".paywall-adagio");
  banner.remove();
}

function check(timerId) {
  console.log("liberanews: check for paywall");
  const articleContainer = document
    .querySelector("news-app")
    .shadowRoot.querySelector("news-article")
    .shadowRoot.querySelector(".amp-doc-host")
    .shadowRoot.querySelector(".detail-article");
  const articleBody = articleContainer.querySelector(".detail-article_body");
  const paywall = articleContainer.querySelector(".paywall-fixed");
  if (articleContainer.querySelector("#liberanews--unlock")) {
    return;
  }
  if (!paywall) {
    return;
  }
  // window.clearInterval(timerId);
  console.log("liberanews: paywall found");
  addUnlockButton(articleBody);
}

function run() {
  let timerId = window.setInterval(() => check(timerId), 1000);
}

export default { domain, run };
