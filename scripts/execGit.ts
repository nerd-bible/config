import { execSync } from "node:child_process";

export function execGit(args: string, allowFailure = false): string {
	try {
		return execSync(`git ${args}`, {
			encoding: "utf8",
			stdio: ["ignore", "pipe", "ignore"],
		}).trim();
	} catch (err) {
		if (!allowFailure) throw err;
		return ""; // typescript is dumb!
	}
}

export const tagCmd =
	"describe --tags --abbrev=0 --match='v[0-9]*.[0-9]*.[0-9]*'";
