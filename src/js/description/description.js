import ready from "../utils/ready";
import addCss from "../utils/css";
import $ from "domtastic";

function linkify(inputText) {
  var replacedText, replacePattern1, replacePattern2, replacePattern3;

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  replacedText = inputText.replace(
    replacePattern1,
    '<a href="$1" target="_blank">$1</a>'
  );

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank">$2</a>'
  );

  return replacedText;
}

const initDescription = () => {
  ready(".video-details .col > span", () => {
    $(".video-details .col > span")[1].innerHTML = linkify(
      $(".video-details .col > span")[1].innerText
    );
  });

  document.addEventListener("RTPP_main", () => {
    addCss(`.video-details .col > span {white-space: pre-line;}`);
  });
};

export default initDescription;
