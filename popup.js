let changeColor = document.getElementById('changeColor');

changeColor.onclick = function(element) {
  chrome.tabs.executeScript({ file: 'overlay.js' });
};

let startSessionButton = document.getElementById('startSession');

startSessionButton.onclick = function(element){
  console.log("Start Session was pressed");
}



