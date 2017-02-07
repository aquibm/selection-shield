const zip = require('bestzip');
const mkdirp = require('mkdirp');
const manifest = require('../src/manifest.json');

const packageName = `selection-shield-${manifest.version}.zip`;

mkdirp('./dist', (error) => {
    handleError(error);

    zip(`./dist/${packageName}`, ['src/*'], (error) => {
        handleError(error);
        console.info(`[Build] ${packageName} built successfully.`);
    });
});

function handleError(error) {
    if(error) {
        console.error(error);
        process.exit(1);
    }
}