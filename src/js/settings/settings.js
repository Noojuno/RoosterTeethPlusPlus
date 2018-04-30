import ready from "../utils/ready";
import $ from "domtastic";

import settingsPage from "./settings.html";

export const SETTINGS_PREFIX = "RTPP_";

function addSettingsTab() {
  let tabHtml = `<li class="settings__tab tab" id="tab_rtpp">
    <a href="#settings-rtpp">Rooster Teeth++</a>
    </li>`;

  $(".settings__tabs__list").append($(tabHtml));

  $(".settings-app__content").append($(settingsPage));
}

function getSettings() {
  const settingKeys = [
    { key: "playerStyles", default: "true" },
    { key: "seasonRemove", default: "true" },
    { key: "shrinkStore", default: "true" },
    { key: "mp3Download", default: "true" },
    { key: "expandChannels", default: "false" }
  ];

  for (const key of settingKeys) {
    const element = $("#" + key.key)[0];
    const storageKey = `${SETTINGS_PREFIX}${key.key}`;

    if (localStorage.getItem(storageKey)) {
      element.checked = parseBool(localStorage.getItem(storageKey));
    } else {
      localStorage.setItem(storageKey, key.default);
      element.checked = parseBool(key.default);
    }

    element.onchange = () => {
      localStorage.setItem(storageKey, JSON.stringify(element.checked));
    };
  }
}

export function getSetting(key) {
  const storageKey = `${SETTINGS_PREFIX}${key}`;

  return parseBool(localStorage.getItem(storageKey));
}

function parseBool(boolToParse) {
  return JSON.parse(boolToParse);
}

const initSettings = ready(".settings-app", element => {
  addSettingsTab();
  getSettings();
});

export default initSettings;
