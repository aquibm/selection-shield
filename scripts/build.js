const zip = require('bestzip');
const manifest = require('../src/manifest.json');

const packageName = `selection-shield-${manifest.version}.zip`;

zip(packageName, ['src/*'], (error) => {
    if(error) {
        console.error(error);
        process.exit(1);
    }

    console.info(`[Build] ${packageName} built successfully.`);
})