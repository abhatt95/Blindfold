let changeColor = document.getElementById('startSession');

changeColor.onclick = function(element) {
  chrome.tabs.executeScript({ file: 'overlay.js' });
};
