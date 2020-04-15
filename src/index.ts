
import { exec } from "@actions/exec";
import core = require("@actions/core");
import fs = require("fs");
import path = require("path");

// Variables
/**The list of directories to build the typescripts from, if omitted then it will use the base project directory.*/
const directories : (string | undefined) = core.getInput("directories");
/**The name of a contributor of the repository, used for pushing to git.*/
const username : string = core.getInput("user-name");
/**The email of a contributor of the repository, used for pushing to git.*/
const useremail : string = core.getInput("user-email");
/**The commit message that will appear when a build has completed.*/
const message : string = core.getInput("message");

/**Tells the action that it has failed when an error has occured.
 * @param err {Error} - The error to log.*/
function onError(err : Error) { core.setFailed(err.message); }

/**Compiles all the typescript.*/
async function buildTypeScript() {
	if(directories) {
		// Variables
		let dirs = splitString(directories, ',');
		
		for(let i = 0; i < dirs.length; i++) {
			console.log("Building typescript @ " + dirs[i]);
			await exec("tsc", ["-b", dirs[i]]);
		}
	}
	else {
		console.log("Building typescript @ base directory");
		await exec("tsc");
	}
}

/**Pushes the newly compiled stuff to the repository.*/
async function gitPush() {
	console.log("Pushing to git");
	await exec("git", ["config", "--global", "user.name",  username]);
	await exec("git", ["config", "--global", "user.email", useremail]);
	await exec("git", ["add", "--all"]);
	await exec("git", ["commit", "-m", message]);
	await exec("git", ["push"]);
}

/**Splits the string with respect to not splitting strings unnecessarily.
 * @param str {string} - The string to split.
 * @param delimiter {string} - The delimiter to split the string with.
 * @returns Returns the list of strings that are split correctly.*/
function splitString(str : string, delimiter : string) : string[] {
	if(str == "") { return []; }
	
	// Variables
	let prev = 0;
	let results : string[] = [];
	let isQuoted : boolean = false;
	
	for(let i = 0; i < str.length; i++) {
		if(str.charAt(i) == '"') { isQuoted = !isQuoted; }
		else if(!isQuoted && str.charAt(i) == delimiter) {
			results.push(str.substr(prev, i - prev).trim());
			prev = i + 1;
		}
	}
	results.push(str.substr(prev).trim());
	
	return results;
}

(async function() {
	await exec("tsc", ["--help"]);
	await buildTypeScript();
	await gitPush().catch(function() {});
})().catch(onError);

