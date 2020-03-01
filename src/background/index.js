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

var targets = ["https://www.wsj.com/*"];

function updateHeaders(e) {
  let fetchAs;

  for (let header of e.requestHeaders) {
    if (header.name.toLowerCase() === "x-liberanews-fetch-as") {
      fetchAs = header.value;
    }
  }

  if (fetchAs !== undefined) {
    let i = e.requestHeaders.length;
    while (i--) {
      let header = e.requestHeaders[i];
      let name = header.name.toLowerCase();
      switch (name) {
        case "user-agent":
          header.value = "Googlebot/2.1 (+http://www.google.com/bot.html)";
          break;
        case "cookie":
          e.requestHeaders.splice(i, 1);
          break;
        case "x-liberanews-fetch-as":
          e.requestHeaders.splice(i, 1);
          break;
      }
    }
    e.requestHeaders.push({ name: "x-forwarded-for", value: "66.249.66.1" });
  }
  return { requestHeaders: e.requestHeaders };
}

browser.webRequest.onBeforeSendHeaders.addListener(
  updateHeaders,
  { urls: targets },
  ["blocking", "requestHeaders"]
);
