const domain = "gelocal.it";

function unlock() {
  window.setTimeout(async () => {
    const newArticle = await fetchArticle();
    replace(newArticle);
    removeBanner();
  }, 1000);
}

function addUnlockButton() {
  const reference = document.querySelector("#paywall-banner");
  const container = reference.parentElement;
  const button = document.createElement("button");
  button.innerHTML = "Unlock article with <strong>liberanews</strong>";
  button.addEventListener("click", unlock, false);
  button.style =
    "display: block; margin: 20px auto 80px; font-size: 26px; padding: 10px 20px";
  container.insertBefore(button, reference);
}

async function fetchArticle() {
  const req = await fetch(document.location.href);
  const text = await req.text();
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(text, "text/html");
  const article = doc.querySelector("#article-body");
  article.style.visibility = "visible";
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
  const phPaywall = document.querySelector("#paywall-banner");

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
