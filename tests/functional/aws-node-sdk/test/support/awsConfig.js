const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { config } = require('../../../../../lib/Config');

function getAwsCredentials(profile, credFile) {
    const filename = path.join(process.env.HOME, credFile);

    try {
        fs.statSync(filename);
    } catch (e) {
        const msg = `AWS credential file does not exist: ${filename}`;
        throw new Error(msg);
    }

    return new AWS.SharedIniFileCredentials({ profile, filename });
}

function getRealAwsConfig(awsLocation) {
    console.log('=====================');
    console.log('awsLocation', config.locationConstraints[awsLocation]);
    const cp =
        config.locationConstraints[awsLocation].details.credentialsProfile
        || 'default';
    console.log('credentials profile (cp)', cp);
    const credentials = getAwsCredentials(cp, '/.aws/credentials');
    console.log('credentials in getRealAwsConfig', credentials);
    const realAwsConfig = { credentials, signatureVersion: 'v4' };

    return realAwsConfig;
}

module.exports = {
    getRealAwsConfig,
    getAwsCredentials,
};
