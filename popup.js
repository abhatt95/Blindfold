let changeColor = document.getElementById('changeColor');

changeColor.onclick = function(element) {
  let color = 'green';
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'document.body.style.backgroundColor="' + color + '";'});
  });
};
