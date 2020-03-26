import { createUnlockButton } from "../components";

const domain = "corriere.it";

async function unlock(article) {
  const newArticle = await fetchArticle();
  const toReplace = document.querySelector("html");
  if (!toReplace) {
    throw new Error("Cannot replace content");
  }
  document.querySelector("#pwl_overlay").remove();
  document.querySelector("#pwl_vt").remove();
  toReplace.replaceWith(newArticle);
  return true;
}

function addUnlockButton(reference) {
  const container = reference.parentElement;
  const button = createUnlockButton(unlock);
  container.insertBefore(button, reference);
}

async function fetchArticle() {
  let url = document.location.origin + document.location.pathname;
  url = url.replace("_preview.shtml", ".shtml");
  const resp = await fetch(url, { credentials: "omit" });
  const bytes = await resp.arrayBuffer();
  const decoder = new TextDecoder("iso-8859-1");
  const text = decoder.decode(bytes);
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(text, "text/html");
  const article = doc.querySelector("section.body-article");

  // Replace header image
  const headerImage = article.querySelector(
    ".container-body-article .rs_preserve.rs_skip"
  );
  const lazyImage = headerImage && headerImage.querySelector("img.lazy");
  if (lazyImage) {
    lazyImage.replaceWith(headerImage.querySelector("noscript img"));
  }

  if (article.querySelector(".bck-media-list-group")) {
    article.querySelector(".bck-media-list-group").remove();
  }

  const note = document.createElement("div");
  note.innerHTML = `Article unlocked with <a href="https://github.com/lucafrei/liberanews" target="_blank"><code>liberanews</code></a>`;
  article.appendChild(note);
  return doc.querySelector("html");
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
