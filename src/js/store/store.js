import addCss from "../utils/css";
import { getSetting } from "../settings/settings";

import storeCSS from "./store.css";

const initStore = () => {
  document.addEventListener("RTPP_main", element => {
    if (getSetting("shrinkStore")) {
      addCss(storeCSS);
    }
  });
};

export default initStore;
