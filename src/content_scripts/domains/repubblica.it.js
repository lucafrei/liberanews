const domain = "repubblica.it";
function unlock(lockedArticle) {
  window.setTimeout(async () => {
    const newArticle = await fetchArticle();
    replace(lockedArticle, newArticle);
    //removeBanner();
  }, 2000);
}

function addUnlockButton(lockedArticle) {
  const container = lockedArticle.parentElement;
  const button = document.createElement("button");
  button.innerHTML = "Unlock article with <strong>liberanews</strong>";
  button.addEventListener("click", unlock.bind(null, lockedArticle), false);
  button.id = "liberanews--unlock";
  button.style =
    "display: block; border: 1px solid gray; margin: 20px auto; font-size: 26px; padding: 10px 20px";
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
