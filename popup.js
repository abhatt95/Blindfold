let changeColor = document.getElementById('changeColor');

changeColor.onclick = function(element) {
  chrome.tabs.executeScript({ file: 'overlay.js' });
};
