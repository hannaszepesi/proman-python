export let domManager = {
  addChild(parentIdentifier, childContent) {
    const parent = document.querySelector(parentIdentifier);
    if (parent) {
      parent.insertAdjacentHTML("beforeend", childContent);
    } else {
      console.error("could not find such html element: " + parentIdentifier);
    }
  },
  addfirstChild(parentIdentifier, childContent) {
    const parent = document.querySelector(parentIdentifier);
    if (parent) {
      parent.insertAdjacentHTML("beforebegin", childContent);
    } else {
      console.error("could not find such html element: " + parentIdentifier);
    }
  },
  addEventListener(parentIdentifier, eventType, eventHandler) {
    const parent = document.querySelector(parentIdentifier);
    if (parent) {
      parent.addEventListener(eventType, eventHandler);
    } else {
      console.error("could not find such html element: " + parentIdentifier);
    }
  },

  addallEventListener(parentIdentifier, eventType, eventHandler) {
    const parent = document.querySelectorAll(parentIdentifier);
    if (parent) {
      for (let i of parent) {
        i.addEventListener(eventType, eventHandler);
      }
    } else {
      console.error("could not find such html element: " + parentIdentifier);
    }
  },

};

