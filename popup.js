window.onload = function () {

  // Inject code into startsession button to overlay screen on current page. 
  let changeColor = document.getElementById('startSession');
  changeColor.onclick = function(element) {
    chrome.tabs.executeScript({ file: 'overlay.js' });
  };

  // Get selected seconds from counter.
  let counter_seconds = document.getElementById('counter_seconds');
  counter_seconds.onchange = function() {
    localStorage.setItem("sessionDuration", document.getElementById("counter_seconds").value);
    chrome.storage.sync.set({
      counter: document.getElementById("counter_seconds").value
    });
  };

  // Onload display for seconds on screen synced with stored value.
  document.getElementById("counter_seconds").value = localStorage.getItem("sessionDuration");
  
};


