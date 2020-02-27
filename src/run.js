function run() {
  const hostname = document.location.hostname;
  for (let [pattern, fighter] of FIGHTERS) {
    if (hostname.endsWith(pattern)) {
      console.log("liberanews: run", pattern);
      fighter();
    }
  }
}

run();
