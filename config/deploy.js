var gcsServiceAccountCredsPath = 'gcs-service-account-creds';
var gcsServiceAccountCreds = require('./' + gcsServiceAccountCredsPath);

module.exports = function(deployTarget) {
  var ENV = {
    build: {
      environment: deployTarget,
    },
    'revision-data': {
      type: 'git-commit'
    },
  };
  var bucket = '';

  ENV['gcloud-storage'] = {
    credentials: {
      "private_key": gcsServiceAccountCreds.private_key,
      "client_email": gcsServiceAccountCreds.client_email,
    },
    projectId: 'scanhappy-3e9e2',
  };

  ENV['gcs-index'] = {
    allowOverwrite: true,
    projectId: 'scanhappy-3e9e2',
    keyFilename: 'config/' + gcsServiceAccountCredsPath + '.json',
  };

  if (deployTarget === 'development') {
  }

  if (deployTarget === 'staging') {
    bucket = 'scannly';

    ENV.prependToFingerprint = 'https://storage.googleapis.com/' + bucket + '/';
    ENV['gcloud-storage'].bucket = bucket;
    ENV['gcs-index'].bucket = bucket;
  }

  if (deployTarget === 'production') {
    bucket = 'scannly';

    ENV.prependToFingerprint = 'https://storage.googleapis.com/' + bucket + '/';
    ENV['gcloud-storage'].bucket = bucket;
    ENV['gcs-index'].bucket = bucket;
  }

  return ENV;
};
