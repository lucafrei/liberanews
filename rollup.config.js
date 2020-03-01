import copy from "rollup-plugin-copy";

module.exports = [
  {
    input: "src/background/index.js",
    output: {
      file: "build/background.js",
      format: "iife"
    },
    plugins: [
      copy({
        targets: [
          {
            src: "src/manifest.json",
            dest: "build/"
          },
          {
            src: "src/icons",
            dest: "build/"
          },
          {
            src: "node_modules/webextension-polyfill/dist/browser-polyfill.js",
            dest: "build/"
          }
        ]
      })
    ],
    watch: {
      clearScreen: true,
      chokidar: {
        usePolling: true
      }
    }
  },
  {
    input: "src/content_scripts/index.js",
    output: {
      file: "build/content_scripts.js",
      format: "iife"
    },
    watch: {
      clearScreen: true,
      chokidar: {
        usePolling: true
      }
    }
  }
];
