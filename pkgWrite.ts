import { readFileSync, writeFileSync } from "node:fs";
import { execGit, tagCmd } from "./execGit.ts";

const repoUrl = process.argv.slice(2).find((a) => !a.startsWith("--"));
if (!repoUrl) throw Error("Required arg: repo URL");

const version = execGit(`${tagCmd} --exact-match`, true);

console.log("Writing package.json");
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
pkg.version = version.substring(1);
pkg.repository = { url: repoUrl };
writeFileSync("package.json", JSON.stringify(pkg, null, 2));
