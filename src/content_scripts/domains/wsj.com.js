const domain = "wsj.com";

async function unlock() {
  const article = await fetchArticle();
  document.querySelector(".wsj-snippet-body").replaceWith(article);
  document.querySelector(".wsj-snippet-login").remove();
}

function addUnlockButton(reference) {
  const container = reference.parentElement;
  const button = document.createElement("button");
  button.innerHTML = "Unlock article with <strong>liberanews</strong>";
  button.addEventListener("click", unlock, false);
  button.style =
    "display: block; border: 1px solid gray; margin: 20px auto; font-size: 26px; padding: 10px 20px";
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
