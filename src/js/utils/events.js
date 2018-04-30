import ready from "./utils/ready";

const readyEvent = (domElement, eventName) => {
  eventName = eventName || domElement;

  ready(domElement, element => {
    const event = new CustomEvent("RTPP_" + eventName, {
      element: e
    });

    window.dispatchEvent(event);
  });
};

const initEvents = () => {
  /* Sidebar Event */
  readyEvent(".left-col", "sidebar");

  /* Main Event (used for adding CSS) */
  readyEvent(".app-page", "main");

  /* Episode Event */
  readyEvent(".episode-main", "episode");
};

export default initEvents;
