// push_notification
Notification.requestPermission(function(result) {
if (result !== "granted") {
  console.log("No notification permission granted!");
} else {
  const img = "";
  const text = "Now you have to waste 5 seconds on reading this nonsense notification.";
  const title = "Why did you press that?";
  const options = {
      body: text,
      icon: "",
      vibrate: [200, 100, 200],
      tag: "new-product",
      image: img,
      badge: "",
      actions: [
        { action: "Do Not Press", title: "Do Not Press"}
      ]
   };

  navigator.serviceWorker.ready.then(function(serviceWorker) {
    document.getElementById('notification_btn').onclick = function(){
      serviceWorker.showNotification(title, options);
    };
  });
}
});
