import ready from "../utils/ready";
import { getSetting } from "../settings/settings";

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
      replaceTitle(titles.item(i));
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

export default ready(".home-container", () => {
  if (getSetting("seasonRemove")) {
    var elements = document.getElementsByClassName("shift");
    for (var i = 0, len = elements.length; i < len; i++) {
      elements[i].onclick = replaceCardTitles;
    }

    ready(".episode-title", () => {
      replaceCardTitles();
    });

    ready(".featured-title", () => {
      replaceAllTitles("featured-title");
    });
  }
});
