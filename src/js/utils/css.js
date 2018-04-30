import ready from "./ready";
import $ from "domtastic";

/* ---- GENERAL CSS RESTYLING ---- */
export default function addCss(css) {
  let style = $('<style type="text/css"></style>').text(css);
  $("head").append(style);
}
