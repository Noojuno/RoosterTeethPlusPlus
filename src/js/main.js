import "../img/icon_128.png";
import $ from "domtastic";

import addCss from "./utils/css";
import ready from "./utils/ready";

import initSettings, { getSetting } from "./settings/settings";
import initMp3 from "./mp3/mp3";
import initSeason from "./season/season";
import initPlayer from "./player/player";
import initStore from "./store/store";
import initEvents from "./utils/events";
import initLinkDump from "./dump/dump";
import initDescription from "./description/description";
import initCarouselDisable from "./carouselDisable/carouselDisable";
import initShow from "./show/show";

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

initSettings();
initMp3();
initSeason();
initPlayer();
initStore();
initLinkDump();
initDescription();
initCarouselDisable();
initShow();

initEvents();
