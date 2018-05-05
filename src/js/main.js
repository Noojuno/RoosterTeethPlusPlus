import "../img/icon_128.png";
import $ from "domtastic";

import addCss from "./utils/css";
import ready from "./utils/ready";

import initSettings, { getSetting } from "./settings/settings";
import initMp3 from "./mp3/mp3";
import initSeason from "./season/season";
import initPlayer from "./player/player";
import initStore from "./store/store";
import initEvents from "./utils/events";
import initLinkDump from "./dump/dump";
import initDescription from "./description/description";
import initCarouselDisable from "./carouselDisable/carouselDisable";

function reverseChildNodes(node, ignoreClass) {
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

function findReactComponent(el) {
  for (const key in el) {
    if (key.startsWith("__reactInternalInstance$")) {
      const fiberNode = el[key];

      return fiberNode && fiberNode.return && fiberNode.return.stateNode;
    }
  }
  return null;
}

window.findReactComponent = findReactComponent;

document.addEventListener("RTPP_sidebar", () => {
  if (getSetting("expandChannels")) {
    $(".channel-select .collapsible-header")[0].onclick = e => {
      e.stopPropagation();
    };

    $(".channel-select .collapsible-header").removeClass(
      "waves-effect waves-brand"
    );

    addCss(".channel-select .collapsible-body {display: block !important;}");
  }
});

document.addEventListener("RTPP_show", e => {
  //$r.selectSeason({target:{value: "let-s-play-2018", selectedIndex: 0, options: [{dataset: {number: 8}}]}})
  //

  let readyCheck = ready(".carousel-container", e => {
    const carouselDom = document.getElementsByClassName(
      "carousel-container"
    )[0];
    const reactTest = findReactComponent(carouselDom);

    const selectBox = $("select.initialized")[0];
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

    console.log(reactTest);

    if (reactTest.selectSeason) {
      reactTest.props.updateUrl = false;
      reactTest.selectSeason(selectSeasonObj);
      ready(".show-more", () => {
        console.log("aaaa");
        reactTest.showMore();
        window.reverseTest();
      });
    }
  });
});

window.reverseTest = () => {
  let ele = document.getElementsByClassName("episode-grid-container")[0];
  reverseChildNodes(ele, ".show-more");
};

initSettings();
initMp3();
initSeason();
initPlayer();
initStore();
initLinkDump();
initDescription();
initCarouselDisable();

initEvents();
