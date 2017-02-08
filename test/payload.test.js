import test from 'ava';

const KEY = { META:0, CTRL:1 };
const KEYS = [
    {
        metaKey: true,
        which: 91
    },
    {
        ctrlKey: true,
        whcih: 17
    }
];

const shieldedSelection = {};
const mockSelection = {
    anchorOffset: 1,
    type: 'Range'
};

test.before(t => {
    window.getSelection = function() {
        return mockSelection;
    }

    document.getSelection = function() {
        return mockSelection;
    }

    require('../src/payload');
});

test.afterEach(t => {
    manipulateKey(KEY.META, 'keyup');
    manipulateKey(KEY.CTRL, 'keyup');
});

test('should override getSelection by default', t => {
    assertSelectionIsShielded(t);
});

test('should disable the shield when the meta key is pressed', t => {
    manipulateKey(KEY.META, 'keydown');

    assertSelectionIsNotShielded(t);
});

test('should disable the shield when the ctrl key is pressed', t => {
    manipulateKey(KEY.CTRL, 'keydown');

    assertSelectionIsNotShielded(t);
});

test('should disable the shield when both the ctrl key and meta key are pressed', t => {
    manipulateKey(KEY.CTRL, 'keydown');
    manipulateKey(KEY.META, 'keydown');

    assertSelectionIsNotShielded(t);
});

test('should shield selection if the meta key is pressed then released', t => {
    manipulateKey(KEY.META, 'keydown');
    manipulateKey(KEY.META, 'keyup');

    assertSelectionIsShielded(t);
});

test('should shield selection if the ctrl key is pressed then released', t => {
    manipulateKey(KEY.CTRL, 'keydown');
    manipulateKey(KEY.CTRL, 'keyup');

    assertSelectionIsShielded(t);
});

function manipulateKey(key, type) {
    const evt = new window.Event(type);
    evt.metaKey = KEYS[key].metaKey;
    evt.ctrlKey = KEYS[key].ctrlKey;
    evt.which = KEYS[key].which;

    window.dispatchEvent(evt);
}

function assertSelectionIsShielded(t) {
    t.deepEqual(window.getSelection(), shieldedSelection);
    t.deepEqual(document.getSelection(), shieldedSelection);
}

function assertSelectionIsNotShielded(t) {
    t.deepEqual(window.getSelection(), mockSelection);
    t.deepEqual(document.getSelection(), mockSelection);
}