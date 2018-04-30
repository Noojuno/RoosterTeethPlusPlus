import addCss from "./utils/css";
import { getSetting } from "./settings/settings";

import playerCSS from "./player/player.css";

const initPlayer = document.addEventListener("RTPP_main", element => {
  if (getSetting("playerStyles")) {
    addCss(playerCSS);
  }
});

export default initPlayer;
