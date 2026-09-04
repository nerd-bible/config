#!/usr/bin/env node
import { execGit, tagCmd } from "./execGit.js";

const suffix = process.argv[2] ?? "";

execGit("fetch --tags");
let version = execGit(`${tagCmd} --exact-match`, true);
if (version)
	throw Error(`Current commit already has tag ${version}`);

version = execGit(tagCmd, true) ?? "v0.0.0";
console.log("Bumping", version);

if (suffix && !version.includes(suffix)) {
	version += `-${suffix}0`;
	console.log("Added suffix", version);
}

let ranReplacer = false;
version = version.replace(
	/^(v.*)([0-9]+)$/,
	(_, p1, p2) => {
		ranReplacer = true;
		return p1 + (parseInt(p2) + 1);
	}
);
if (!ranReplacer)
	throw Error(`couldn't find suffix digits to bump ${version}`);

console.log("Tagging", version);
execGit(`tag ${version}`);
console.log("You probably want to push now");
console.log("git push --tags origin master");
