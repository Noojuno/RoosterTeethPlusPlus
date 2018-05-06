import $ from "domtastic";
import ready from "../utils/ready";
import findReactComponent from "../utils/react";
import { getSetting } from "../settings/settings";

import loaderHtml from "./loader.html";

function reverseChildNodes(node, ignoreClass) {
  if (!node) {
    return;
  }

  var parentNode = node.parentNode;
  var nextSibling = node.nextSibling;
  var frag = node.ownerDocument.createDocumentFragment();

  parentNode.removeChild(node);

  while (node.lastChild) {
    frag.appendChild(node.lastChild);
  }

  node.appendChild(frag);

  parentNode.insertBefore(node, nextSibling);
  return node;
}

function reverseEpisodes(node) {
  let reactComponent = findReactComponent(node);
  let { seasonData, totalItems } = reactComponent.state;
  let container = document.getElementsByClassName("episode-grid-container")[0];
  let shownSent = false;

  if (!getSetting("reverseEpisodeOrder")) {
    document.getElementById("spinner_RTPP").style = "display: none;";
    container.style = "";
    return;
  }

  let reverseInterval = setInterval(function() {
    if (!shownSent) {
      reactComponent.showMore();
      shownSent = true;
    }

    if (container.children.length >= reactComponent.state.totalItems) {
      reverseChildNodes(container);
      document.getElementById("spinner_RTPP").style = "display: none;";
      container.style = "";
      clearInterval(reverseInterval);
    }
  }, 100);
}

const initShow = () => {
  document.addEventListener("RTPP_show", e => {
    let seasonSet = false;
    ready(".episode-grid-container", e => {
      if (document.location.pathname == "/episode/recently-added") {
        return;
      }

      e.parentNode.insertBefore($(loaderHtml)[0], e);
      e.style = "display: none;";

      const selectBox = $("select.initialized")[0];

      selectBox.onchange = event => {
        document.getElementById("spinner_RTPP").style = "";
        e.style = "display: none;";

        reverseEpisodes(e.parentNode);
      };

      if (
        (!seasonSet && document.location.search.indexOf("season") !== -1) ||
        !getSetting("showNewestSeason")
      ) {
        reverseEpisodes(e.parentNode);
        seasonSet = true;
        return;
      }

      const reactTest = findReactComponent(e.parentNode);

      const bottomBox = selectBox.children[selectBox.children.length - 1];
      const number = bottomBox.attributes["data-number"].value;
      const value = bottomBox.attributes["value"].value;
      const selectSeasonObj = {
        target: {
          value,
          selectedIndex: 0,
          options: [{ dataset: { number } }]
        }
      };

      if (reactTest.selectSeason) {
        reactTest.props.updateUrl = false;
        reactTest.selectSeason(selectSeasonObj);

        reverseEpisodes(e.parentNode);
      }
    });
  });
};

export default initShow;
