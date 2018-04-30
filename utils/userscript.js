module.exports = version => {
  return `
// ==UserScript==
// @name         Rooster Teeth++
// @namespace    http://tampermonkey.net/
// @version      ${version}
// @description  Improves the RT site
// @author       @Noojuno
// @match        http://*/*
// @grant        none
// @include      http://*.roosterteeth.com/*
// @include      https://*.roosterteeth.com/*
// @include      https://roosterteeth.com/*
// @include      http://roosterteeth.com/*
// @run-at       document-end
// @noframes
// ==/UserScript==
`;
};
