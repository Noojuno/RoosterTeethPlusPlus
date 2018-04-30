import "../img/icon_128.png";
import $ from "domtastic";

import addCss from "./utils/css";

import initSettings, { getSetting } from "./settings/settings";
import initMp3 from "./mp3/mp3";
import initSeason from "./season/season";
import initPlayer from "./player/player";
import initStore from "./store/store";

document.addEventListener("RTPP_main", () => {
  addCss(`.video-details .col.s12 > span {white-space: pre-line;}`);
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

// ready(".show-container", () => {
//   const dropdown = FormSelect.getInstance(
//     document.getElementsByClassName("qa-materialize-select")[0]
//   );
// });

initSettings();
initMp3();
initSeason();
initPlayer();
initStore();
