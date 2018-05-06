module.exports = version => {
  return `
// ==UserScript==
// @name         Rooster Teeth++
// @namespace    http://tampermonkey.net/
// @version      ${version}
// @description  Improves the RT site
// @author       @Noojuno
// @match        *://roosterteeth.com/*
// @match        *://*.roosterteeth.com/*
// @exclude      *://store.roosterteeth.com/*
// @run-at       document-end
// @noframes
// ==/UserScript==
`;
};
