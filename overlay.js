(function() {
  chrome.storage.sync.get({
    counter: 0,
    overlay_on: false
  },
  function(data) {
    // return immediately if overlay is already enabled
    if (data.overlay_on) {
      return
    }

    chrome.storage.sync.set({overlay_on: true}, function() {
      console.log('enable overlay');
    });
    const page_overflow = document.documentElement.style.overflow;

    // disable overlay and cleanup
    function disable_overlay() {
      overlay.remove();
      chrome.storage.sync.set({overlay_on: false}, function() {
        console.log('disable overlay');
      });
      document.documentElement.style.overflow = page_overflow;
    }

    /* new div to be injected
    Structure:
      <div id="overlay">
        <btn></btn>
        <div>
          ** centered content **
          <div>
            ** counter **
          </div>
        </div>
      </div>
    */
  	var overlay = document.createElement('div');
    overlay.id = 'bf-overlay'
    overlay.style.position = 'absolute';
  	overlay.style.top = 0;
  	overlay.style.left = 0;
  	overlay.style.height = '100%';
  	overlay.style.width = '100%';
    overlay.style.background = 'black';
    overlay.style.zIndex = 100000;
    overlay.style.opacity = 0.95;

    // cancel button
    var cancel_btn = document.createElement("button");
    cancel_btn.innerHTML = "x";
    cancel_btn.style.background = 'transparent';
    cancel_btn.style.color = 'white';
    cancel_btn.style.border = 'none';
    cancel_btn.onclick = disable_overlay;

    // center content
  	var center = document.createElement('div');
  	center.style.height = '100%';
  	center.style.width = '100%';
    center.style.alignContent = "center";
    center.style.alignItems = "center";
    center.style.display = "flex";

    // counter div
    var counter = document.createElement('div');  // create counter
    counter.style.color = 'white';
    counter.style.fontSize = '200px';
    counter.style.marginLeft = "auto";
    counter.style.marginRight = "auto";

    center.appendChild(counter);
    overlay.appendChild(cancel_btn);
    overlay.appendChild(center);
  	document.body.appendChild(overlay);  // inject into document
    document.documentElement.style.overflow = 'hidden';

    counter.textContent = data.counter;
    var curr_val = data.counter;
    var interval = setInterval(function() {
      if (curr_val === 0) {
        // end interval, return settings back to normal
        clearInterval(interval);
        disable_overlay();
        return
      }
      curr_val -= 1;
      counter.textContent = curr_val;
    }, 1000);
  });
})();
