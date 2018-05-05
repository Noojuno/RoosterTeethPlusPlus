import $ from "domtastic";
import ready from "../utils/ready";

const testDisable = [
  "LIVESTREAMS",
  "GAME ATTACK SERIES",
  "JT MUSIC SERIES",
  "THE KNOW SERIES",
  "ANIMATION",
  "FEATURED MERCH"
];

const initCarouselDisable = () => {
  document.addEventListener("RTPP_home", () => {
    ready(".carousel-container", e => {
      let title = e.firstChild;

      if (testDisable.indexOf(title.innerText.toUpperCase()) !== -1) {
        e.style = "display: none;";
      }
    });
  });
};

export default initCarouselDisable;
