import corriere from "./domains/corriere.it";
import ft from "./domains/ft.com";
import gelocal from "./domains/gelocal.it";
import lastampa from "./domains/lastampa.it";
import morgenpost from "./domains/morgenpost.de";
import nytimes from "./domains/nytimes.com";
import repubblica from "./domains/repubblica.it";
import theglobeandmail from "./domains/theglobeandmail.com";
import wsj from "./domains/wsj.com";

const DOMAINS = [
  corriere,
  ft,
  gelocal,
  lastampa,
  morgenpost,
  nytimes,
  repubblica,
  theglobeandmail,
  wsj
];

const hostname = document.location.hostname;

for (let { domain, run } of DOMAINS) {
  if (hostname.endsWith(domain)) {
    console.log("liberanews: run", domain);
    run();
  }
}
