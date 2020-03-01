const domain = "morgenpost.de";

function unlock(lockedArticle) {
  window.setTimeout(async () => {
    const newArticle = await fetchArticle();
    replace(lockedArticle, newArticle);
    removeBanner();
  }, 2000);
}

function addUnlockButton(reference) {
  const container = reference.parentElement;
  const button = document.createElement("button");
  button.innerHTML = "Unlock article with <strong>liberanews</strong>";
  button.addEventListener("click", unlock.bind(null, reference), false);
  button.style =
    "display: block; margin: 20px auto; font-size: 26px; padding: 10px 20px";
  container.insertBefore(button, reference);
}

async function fetchArticle() {
  const req = await fetch(document.location.href);
  const text = await req.text();
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(text, "text/html");
  const article = doc.querySelector(".article__body");
  const note = document.createElement("div");
  note.innerHTML = `Article unlocked with <a href="https://github.com/lucafrei/liberanews" target="_blank"><code>liberanews</code></a>`;
  article.appendChild(note);
  return article;
}

function replace(lockedArticle, newArticle) {
  lockedArticle.replaceWith(newArticle);
}

function removeBanner() {
  const banner = document.querySelector(".paywall-container");
  banner.remove();
}

function run() {
  const lockedArticle = document.querySelector(".article__body");
  const paywall = document.querySelector("#paywall-container");

  if (!paywall) {
    return;
  }
  console.log("liberanews: paywall found");
  addUnlockButton(lockedArticle);
}

export default { domain, run };