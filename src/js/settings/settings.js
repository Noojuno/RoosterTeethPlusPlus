import ready from "../utils/ready";
import $ from "domtastic";

import settingsPage from "./settings.html";

export const SETTINGS_PREFIX = "RTPP_";

const settingKeys = [
  { key: "playerStyles", default: "true" },
  { key: "seasonRemove", default: "true" },
  { key: "shrinkStore", default: "true" },
  { key: "mp3Download", default: "true" },
  { key: "expandChannels", default: "false" },
  { key: "linkDump", default: "true" },
  { key: "carouselDisable", default: "[]" },
  { key: "showNewestSeason", default: "true" },
  { key: "reverseEpisodeOrder", default: "true" }
];

const carousels = [
  "LIVESTREAMS",
  "RECENT EPISODES",
  "MY WATCHLIST",
  "FEATURED MERCH",
  "RECENT SERIES",
  "ROOSTER TEETH SERIES",
  "ACHIEVEMENT HUNTER SERIES",
  "FUNHAUS SERIES",
  "SCREWATTACK SERIES",
  "COW CHOP SERIES",
  "SUGAR PINE 7 SERIES",
  "GAME ATTACK SERIES",
  "THE KNOW SERIES",
  "JT MUSIC SERIES",
  "FIRST SERIES",
  "FIRST EPISODES",
  "ANIMATION",
  "COMEDY",
  "GAMING",
  "BEHIND THE SCENES",
  "TALK SHOWS",
  "SCIENCE AND HOW-TO",
  "FIRST MEMBER FAVORITES",
  "TRENDING"
];

function addSettingsTab() {
  let tabHtml = `<li class="settings__tab tab" id="tab_rtpp">
    <a href="#settings-rtpp">Rooster Teeth++</a>
    </li>`;

  $(".settings__tabs__list").append($(tabHtml));

  $(".settings-app__content").append($(settingsPage));

  setupCarousel();
}

function setupCarousel() {
  let status = JSON.parse(localStorage.getItem("RTPP_carouselDisable")) || [];
  for (const title of carousels) {
    let titleId = "carousel_" + title.replace(/\ /g, "_");
    $("#carouselHide").append(
      $(`<div class="form-list__item">
    <form>
        <div class="form-list__switch switch">
            <label>
                <span style="color: black;">${title}</span>
                <input id="${titleId}" name="carousel_livestreams" type="checkbox">
                <span class="lever"></span>
            </label>
        </div>
    </form>
  </div>`)[0]
    );

    let checkbox = $("#" + titleId)[0];

    if (status.indexOf(title) != -1) {
      checkbox.checked = true;
    }

    checkbox.onclick = e => {
      let disabled =
        JSON.parse(localStorage.getItem("RTPP_carouselDisable")) || [];

      disabled.push(title);

      localStorage.setItem("RTPP_carouselDisable", JSON.stringify(disabled));
    };
  }
}

function getSettings() {
  for (const key of settingKeys) {
    let element = $("#" + key.key)[0];

    const storageKey = `${SETTINGS_PREFIX}${key.key}`;

    if (element && element.type == "checkbox") {
      if (localStorage.getItem(storageKey)) {
        element.checked = parseBool(localStorage.getItem(storageKey));
      } else {
        localStorage.setItem(storageKey, key.default);
        element.checked = parseBool(key.default);
      }

      element.onchange = () => {
        localStorage.setItem(storageKey, JSON.stringify(element.checked));
      };
    } else {
      if (key.key == "carouselDisable") {
      }
    }
  }
}

function getDefault(key) {
  for (const setting of settingKeys) {
    if (setting.key == key) {
      return parseBool(setting.default);
    }
  }

  return false;
}

export function getSetting(key) {
  const storageKey = `${SETTINGS_PREFIX}${key}`;
  const localSetting = localStorage.getItem(storageKey);
  let setting;

  if (localSetting == null) {
    setting = getDefault(key);
  } else {
    setting = localSetting;
  }

  return parseBool(setting);
}

function parseBool(boolToParse) {
  return JSON.parse(boolToParse);
}

const initSettings = () => {
  document.addEventListener("RTPP_settings", element => {
    addSettingsTab();
    getSettings();
  });
};

export default initSettings;
