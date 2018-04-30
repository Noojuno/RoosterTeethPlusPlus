import "../img/icon_128.png";
import $ from "domtastic";

import addCss from "./utils/css";

import initSettings, { getSetting } from "./settings/settings";
import initMp3 from "./mp3/mp3";
import initSeason from "./season/season";
import initPlayer from "./player/player";
import initStore from "./store/store";
import initEvents from "./utils/events";
import initLinkDump from "./dump/dump";
import ready from "./utils/ready";

document.addEventListener("RTPP_main", () => {
  addCss(`.video-details .col > span {white-space: pre-line;}`);
});

document.addEventListener("RTPP_sidebar", () => {
  if (getSetting("expandChannels")) {
    $(".channel-select .collapsible-header")[0].onclick = e => {
      e.stopPropagation();
    };

    $(".channel-select .collapsible-header").removeClass(
      "waves-effect waves-brand"
    );

    addCss(".channel-select .collapsible-body {display: block !important;}");
  }
});

function linkify(inputText) {
  var replacedText, replacePattern1, replacePattern2, replacePattern3;

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  replacedText = inputText.replace(
    replacePattern1,
    '<a href="$1" target="_blank">$1</a>'
  );

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank">$2</a>'
  );

  return replacedText;
}

ready(".video-details .col > span", () => {
  $(".video-details .col > span")[1].innerHTML = linkify(
    $(".video-details .col > span")[1].innerText
  );
});

initSettings();
initMp3();
initSeason();
initPlayer();
initStore();
initLinkDump();

initEvents();
