const core = require('@actions/core');
const github = require('@actions/github');

const defaultReleaseNumber = '1.0.0';

const githubToken = core.getInput('token');
const repoFullName = env.GITHUB_REPOSITORY;


async function getNextReleaseNumber() {
    const octokit = new github.GitHub(githubToken);

    let releaseName = null;

    [repoOwner, repoName] = repoFullName.split('/');

    const latestRelease = await octokit.repos.getLatestRelease({
        owner: repoOwner,
        repo: repoName
    })
    .catch(error => {
        if (error.status === 404) // no releases
            releaseName = defaultReleaseNumber;
        else
            throw error;
    });

    if (releaseName != null)
    {
        console.log("No releases found, using the default relase number.");
        return releaseName;
    }

    const tagRegex = /^v?(\d+)\.(\d+)\.(\d+)$/i;
    const versionMatch = latestRelease.data.tag_name.match(tagRegex);

    if (versionMatch == null)
        throw new Error("Latest release doesn't have a tag in a form of 'X.X.X' / 'vX.X.X'");
   
    return`${versionMatch[1]}.${versionMatch[2]}.${parseInt(versionMatch[3]) + 1}`;
}

getNextReleaseNumber()
    .then((releaseNumber) => {
        console.log(`Release number: ${releaseNumber}`);
        core.setOutput("release-number", releaseNumber);
    })
    .catch (err => {
        core.setFailed(err.message);
    });