import { execGit, tagCmd } from "./execGit.ts";

execGit("fetch --tags");
let version = execGit(`${tagCmd} --exact-match`, true);

if (version) {
	console.warn("Current commit already has tag", version);
	process.exit(1);
}

const lastVersion = execGit(tagCmd, true) ?? "v0.0.0";
console.log("Bumping", lastVersion);

const split = lastVersion.split(".");
// Tags should only be missing for minor bumps.
const last = parseInt(split.pop()!) + 1;
version = [...split, last].join(".");

console.log("Tagging", version);
execGit(`tag ${version}`);
console.log("You probably want to push now");
console.log("git push --tags origin master");
