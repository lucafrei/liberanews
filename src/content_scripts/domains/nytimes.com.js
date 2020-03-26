import { createUnlockButton } from "../components";

const domain = "nytimes.com";

async function unlock() {
  document.querySelector("#gateway-content").remove();
  document.querySelector("#site-content").style = "";
  document.querySelector("#app > div > div").style =
    "position: relative; overflow: auto";
  document.querySelector("#app > div > div:first-child").lastChild.remove();
  return true;
}

function addUnlockButton(reference) {
  const container = reference.parentElement;
  const button = createUnlockButton(unlock);
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
