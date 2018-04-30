import ready from "../utils/ready";
import $ from "domtastic";

import convert from "xml-js";

import { getSetting } from "../settings/settings";

function addButton(url, feedUrl) {
  const buttonHtml = $(`<div class="row">
                <a class="btn waves-effect waves-light primary" href="${url}" target="_blank"   >
                    <i class="icon-download left"></i>
                    Download as MP3
                </a>
                &nbsp;
              <a class="btn waves-effect waves-light secondary" style="float: right" href="${feedUrl}" target="_blank"   >
                <i class="icon-rss left"></i>
                RSS
            </a>
        </div>`)[0];

  const row = $(".video-details > .row")[1];
  const col = $(".video-details > .row > .col.s12").get(0);

  if (col) {
    col.className = col.className.replace("s12", "s8");
  }

  if (!$("#dumpCol")[0]) {
    row.append($(`<div id="dumpCol" class="col s4"></div>`)[0]);
  }

  $("#dumpCol").append(buttonHtml);
}

let fetching = false;
const initMp3 = () => {
  document.addEventListener("RTPP_episode", element => {
    let episodeSlug = document.location.href.split("/")[4];

    if (!getSetting("mp3Download") || fetching) {
      return;
    }

    fetching = true;
    fetch(`https://svod-be.roosterteeth.com/api/v1/episodes/${episodeSlug}`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        const episodeNumber = res.data[0].attributes.number;
        const showSlug = res.data[0].attributes.show_slug;

        const rssURL = `https://roosterteeth.com/show/${showSlug}/feed/mp3`;

        fetch(rssURL)
          .then(res => {
            return res.text();
          })
          .then(res => {
            const data = convert.xml2js(res, { compact: true });

            if (data.rss.channel.item) {
              for (const item of data.rss.channel.item) {
                if (item.guid._text == episodeNumber) {
                  addButton(item.enclosure._attributes.url, rssURL);
                }
              }
            }

            fetching = false;
          });
      });
  });
};

export default initMp3;
