(function() {
  chrome.storage.sync.get({'counter': 0, 'overlay_on': false}, function(data) {
    if (data.overlay_on) {
      return
    }

    chrome.storage.sync.set({overlay_on: true}, function() {
      console.log('enable overlay');
    });

  	var overlay = document.createElement('div');  // create a new div
    var counter = document.createElement('div');  // create counter

    // save old settings
    const page_overflow = document.documentElement.style.overflow;

    overlay.id = 'bf-overlay'
    overlay.style.position = 'absolute';
  	overlay.style.top = 0;
  	overlay.style.left = 0;
  	overlay.style.height = '100%';
  	overlay.style.width = '100%';
    overlay.style.background = 'black';
    overlay.style.zIndex = 100000;
    overlay.style.opacity = 0.9;
    overlay.style.alignContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.display = "flex";

    counter.style.color = 'white';
    counter.style.fontSize = '200px';
    counter.style.marginLeft = "auto";
    counter.style.marginRight = "auto";
    overlay.appendChild(counter);

    // inject into document
  	document.body.appendChild(overlay);
    document.documentElement.style.overflow = 'hidden';

    counter.textContent = data.counter;
    var curr_val = data.counter;
    var interval = setInterval(function() {
      if (curr_val === 0) {
        clearInterval(interval);
        overlay.remove();
        chrome.storage.sync.set({overlay_on: false}, function() {
          console.log('disable overlay');
        });
        document.documentElement.style.overflow = page_overflow;
        return
      }
      curr_val -= 1;
      counter.textContent = curr_val;
    }, 1000);
  });
})();
