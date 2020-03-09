const domain = "nytimes.com";

function unlock() {
  document.querySelector("#gateway-content").remove();
  document.querySelector("#site-content").style = "";
  document.querySelector("#app > div > div").style =
    "position: relative; overflow: auto";
  document.querySelector("#app > div > div:first-child").lastChild.remove();
}

function addUnlockButton(reference) {
  const container = reference.parentElement;
  const button = document.createElement("button");
  button.innerHTML = "Unlock article with <strong>liberanews</strong>";
  button.addEventListener("click", unlock, false);
  button.style =
    "display: block; border: 1px solid black; margin: 20px auto; font-size: 26px; padding: 10px 20px";
  container.insertBefore(button, reference);
}

function check(timerId) {
  const paywall = document.querySelector("#gateway-content");
  const reference = paywall && paywall.querySelector("div");
  if (!reference) {
    return;
  }
  window.clearInterval(timerId);
  console.log("liberanews: paywall found");
  addUnlockButton(reference);
}

function run() {
  let timerId = window.setInterval(() => check(timerId), 1000);
}

export default { domain, run };
