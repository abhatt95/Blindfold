chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
    counter: localStorage.getItem("sessionDuration"),
    overlay_on: false,
  },
  function() {
    console.log("The counter is: " + counter);
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            schemes: ['http', 'https']
          },
        })],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});

