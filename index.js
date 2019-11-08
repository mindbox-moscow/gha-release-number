const core = require('@actions/core');
const github = require('@actions/github');

try {
  console.log(`Release the kraken.`);

  console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed(error.message);
}