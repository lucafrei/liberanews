// const URLS = [
//   "https://www.repstatic.it/minify/sites/lastampa/2019-v1/config.cache.php?name=social_js",
//   "https://cdn.ampproject.org/rtv/012002192257490/v0/amp-subscriptions-0.1.js"
// ];
//
// function cancel(requestDetails) {
//   console.log("Cancel", requestDetails);
//   return { cancel: true };
// }

// browser.webRequest.onBeforeRequest.addListener(
//   cancel,
//   {
//     urls: URLS
//   },
//   ["blocking"]
// );

var targets = ["https://www.wsj.com/*", "https://www.ft.com/*"];

function updateHeaders(e) {
  let fetchAs;
  let referer;
  let refererSet = false;

  for (let header of e.requestHeaders) {
    if (header.name.toLowerCase() === "x-liberanews-fetch-as") {
      fetchAs = header.value;
    }
    if (header.name.toLowerCase() === "x-liberanews-referer") {
      referer = header.value;
    }
  }
  let i = e.requestHeaders.length;
  while (i--) {
    let header = e.requestHeaders[i];
    let name = header.name.toLowerCase();
    if (name === "user-agent" && fetchAs !== undefined) {
      header.value = "Googlebot/2.1 (+http://www.google.com/bot.html)";
      e.requestHeaders.push({ name: "X-Forwarded-For", value: "66.249.66.1" });
    } else if (name === "referer" && referer !== undefined) {
      header.value = referer || header.value;
      refererSet = true;
    } else if (name === "cookie") {
      e.requestHeaders.splice(i, 1);
    } else if (name.startsWith("x-liberanews")) {
      e.requestHeaders.splice(i, 1);
    }
  }
  if (referer && !refererSet) {
    e.requestHeaders.push({ name: "Referer", value: referer });
  }
  return { requestHeaders: e.requestHeaders };
}

browser.webRequest.onBeforeSendHeaders.addListener(
  updateHeaders,
  { urls: targets },
  // see https://developer.chrome.com/extensions/webRequest#implementation
  navigator.userAgent.includes("Firefox")
    ? ["blocking", "requestHeaders"]
    : ["blocking", "requestHeaders", "extraHeaders"]
);
