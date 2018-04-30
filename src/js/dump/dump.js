import { getSetting } from "../settings/settings";
import episodeMap from "./map.json";
import addCss from "../utils/css";
import dumpCss from "./dump.css";

import linkDumpHtml from "./dump.html";

import M from "materialize-css";

import $ from "domtastic";

const HEADERS = {
  Authorization: "Bearer cFLgrPDMuTdHUTdR0DJNA5vSXOdSisgmXnVeMiG1"
};

const drawLinkDump = links => {
  console.log(links);

  if (links.length > 0) {
    const row = $(".video-details > .row")[1];
    const col = $(".video-details > .row > .col.s12").get(0);

    if (col) {
      col.className = col.className.replace("s12", "s8");
    }

    if (!$("#dumpCol")[0]) {
      row.append($(`<div id="dumpCol" class="col s4"></div>`)[0]);
    }

    $("#dumpCol").append($(linkDumpHtml)[0]);

    M.Collapsible.init(document.querySelector("#dumpCollapse"));

    for (const link of links) {
      const url = link.content.link;
      const text = link.content.title;
      const thumbnail = link.content.picture.content.sm;

      $("#linkDump").append(
        $(`<a href="${url}" class="collection-item">${text}</a>`)[0]
      );
    }
  }
};

let fetching = false;
const initLinkDump = () => {
  if (getSetting("linkDump")) {
    addCss(dumpCss);
  }

  document.addEventListener("RTPP_episode", element => {
    const episodeSlug = document.location.href.split("/")[4];
    let videoId = null;
    if (getSetting("linkDump")) {
      for (const episode of episodeMap) {
        if (episodeSlug == episode.slug) {
          videoId = episode.id;
          break;
        }
      }

      if (!videoId) {
        return;
      }

      fetching = true;
      fetch(`https://roosterteeth.com/api/v1/episodes/${videoId}`, {
        headers: HEADERS
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.media && res.media.links) {
            const links = res.media.links;

            drawLinkDump(links);
          }
        });
    }
  });
};

export default initLinkDump;
