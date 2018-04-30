import ready from "./ready";

const readyEvent = (domElement, eventName) => {
  eventName = eventName || domElement;

  ready(domElement, element => {
    const event = new CustomEvent("RTPP_" + eventName, {
      element: element
    });

    document.dispatchEvent(event);
  });
};

const initEvents = () => {
  /* Sidebar Event */
  readyEvent(".left-col", "sidebar");

  /* Episode Event */
  readyEvent(".episode-main", "episode");

  /* Settings Event */
  readyEvent(".settings-app", "settings");

  /* Home Event */
  readyEvent(".home-container", "home");

  /* Title Event */
  readyEvent(".episode-title", "title");
  readyEvent(".featured-title", "title");

  /* Main Event (used for adding CSS) */
  readyEvent(".app-page", "main");

  /* Show Event */
  readyEvent(".show-container", "show");
};

export default initEvents;
