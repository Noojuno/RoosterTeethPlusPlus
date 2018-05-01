import ready from "../utils/ready";
import { getSetting } from "../settings/settings";
import $ from "domtastic";

function replaceTitle(titleElement) {
  var title = titleElement.textContent;
  var season = title.split(" - ")[0];
  if (season.indexOf(":E") != -1) {
    title = title.replace(season + " - ", "");
  } else {
    season = false;
  }

  titleElement.textContent = title;

  return { title: title, season: season };
}

function replaceAllTitles(selector) {
  if (getSetting("seasonRemove")) {
    var titles = document.getElementsByClassName(selector);

    for (var i = 0; i < titles.length; i++) {
      let t = replaceTitle(titles.item(i));
      if (selector == "featured-title" && t.season) {
        $(titles.item(i)).after(`<p class="featured-caption">${t.season}</p>`);
      }
    }
  }
}

function replaceCardTitles() {
  if (getSetting("seasonRemove")) {
    var cards = document.getElementsByClassName("episode-card");
    for (var i = 0; i < cards.length; i++) {
      var card = cards.item(i);
      var titleElement = card.getElementsByClassName("episode-title")[0];
      var info = replaceTitle(titleElement);

      var extraElement = card.getElementsByClassName("episode-extra")[0];
      if (info.season && extraElement.innerHTML.indexOf(info.season) == -1) {
        extraElement.innerHTML = info.season + " | " + extraElement.innerHTML;
      }
    }
  }
}

const seasonReplace = () => {
  //console.log("aaaaaaaaaaaaaaa");

  if (getSetting("seasonRemove")) {
    var elements = document.getElementsByClassName("shift");
    for (var i = 0, len = elements.length; i < len; i++) {
      elements[i].onclick = replaceCardTitles;
    }

    document.addEventListener("RTPP_title", () => {
      replaceCardTitles();
      replaceAllTitles("featured-title");
    });
  }
};

const initSeason = () => {
  //console.log("[RT++]", "Seasons enabled");
  document.addEventListener("RTPP_home", seasonReplace);
  document.addEventListener("RTPP_show", seasonReplace);
};

export default initSeason;
