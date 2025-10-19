function start() {
  Push.create("Hello", {
    body: "hows it going?",
    icon: "img/notifications.png",
    timeout: 2000,
  });
}

function clear() {
  Push.clear();
}
