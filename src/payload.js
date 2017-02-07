(function() {
    console.info(`[SELECTION SHIELD] Overriding selection requests from ${window.location}`);

    const originalSelectionFunction = window.getSelection;
    let modifiersPressed = [];

    window.addEventListener('keydown', (e) => {
        if(e.metaKey || e.ctrlKey) {
            modifiersPressed = [e.which, ...modifiersPressed];
        }
    });

    window.addEventListener('keyup', (e) => {
        modifiersPressed = modifiersPressed.filter((key) => {
            return key !== e.which;
        });
    });

    function getSelection() {
        if(modifiersPressed.length) {
            return originalSelectionFunction();
        }

        return {};
    }

    window.getSelection = getSelection;
    document.getSelection = getSelection;
})();
