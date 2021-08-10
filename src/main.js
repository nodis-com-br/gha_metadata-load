const core = require('@actions/core');
const artifact = require('@actions/artifact');
const fs = require('fs');
const process = require('process');

const artifactClient = artifact.create();
artifactClient.downloadArtifact('metadata').then(result => {

    const sourceJson = JSON.parse(fs.readFileSync('./metadata.json'));
    const destinyStream = fs.createWriteStream(process.env.GITHUB_ENV, {flags:'a'});

    for (const k in sourceJson) if (sourceJson.hasOwnProperty(k)) {
        const envDefinition = 'NODIS_' + k + '=' + sourceJson[k];
        core.info(envDefinition);
        destinyStream.write(envDefinition  + '\n');
    }

}).catch(err => core.setFailed(err));