#!/usr/bin/env node
import { execGit, tagCmd } from "./execGit.js";

execGit("fetch --tags");
if (execGit(`${tagCmd} --exact-match`, true))
	throw Error(`Current commit already has tag ${version}`);

const prevVersion = execGit(tagCmd, true) ?? "v0.0.0";
console.log("Bumping", prevVersion);

const newVersion = prevVersion.replace(
	/^(v.*)([0-9]+)$/,
	(_, p1, p2) => p1 + (parseInt(p2) + 1)
);
if (newVersion  == prevVersion)
	throw Error(`invalid version number ${prevVersion}`);

console.log("Tagging", newVersion);
execGit(`tag ${newVersion}`);
console.log("You probably want to push now");
console.log("git push --tags origin master");
