// make sure service worker are supported
if(navigator.serviceWorker){
  // // unregister all service worker
  // navigator.serviceWorker.getRegistrations().then(function(registrations) {
  //  for(let registration of registrations) {
  //   registration.unregister();
  //   console.log("Service Worker: Unregistering");
  // } })

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service_worker.js')
    .then(reg => {
      console.log('Service Worker : Registered');
    })
    .catch(err => {
      console.log(`Service Worker Error: ${err}`);
    })
  })
}
