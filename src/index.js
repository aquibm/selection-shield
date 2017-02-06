(function() {
    let payload = document.createElement('script');
    payload.src = chrome.extension.getURL('payload.js');

    (document.head || document.documentElement).appendChild(payload);
})();