const core = require('@actions/core');
const github = require('@actions/github');

try {
  console.log(`Release the kraken.`);

  console.log(`The event payload: ${payload}`);

  core.setOutput("next-number", "1.2.3");

} catch (error) {
  core.setFailed(error.message);
}