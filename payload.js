console.info(`[SELECTION SHIELD] Overriding selection requests from ${window.location}`);

window.getSelection = function() {
    return {};
}

document.getSelection = function() {
    return {};
}