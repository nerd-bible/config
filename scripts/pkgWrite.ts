#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { execGit, tagCmd } from "./execGit.ts";

const server = process.env["SERVER_URL"] ?? process.env["GITHUB_SERVER_URL"];
const repo = process.env["REPOSITORY"] ?? process.env["GITHUB_REPOSITORY"];

if (!server || !repo) throw Error("Required SERVER_URL and REPOSITORY");

const version = execGit(`${tagCmd} --exact-match`, true);

console.log("Writing package.json");
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
pkg.version = version.substring(1);
pkg.repository = { url: `${server}/${repo}` };
writeFileSync("package.json", JSON.stringify(pkg, null, 2));
