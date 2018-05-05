import $ from "domtastic";
import ready from "../utils/ready";

const initCarouselDisable = () => {
  document.addEventListener("RTPP_home", () => {
    ready(".carousel-container", e => {
      let title = e.firstChild;

      let disabled =
        JSON.parse(localStorage.getItem("RTPP_carouselDisable")) || [];

      if (disabled.indexOf(title.innerText.toUpperCase()) !== -1) {
        e.style = "display: none;";
      }
    });
  });
};

export default initCarouselDisable;
