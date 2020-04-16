"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const exec_1 = require("@actions/exec");
const core = require("@actions/core");
// Variables
/**The list of directories to build the typescripts from, if omitted then it will use the base project directory.*/
const directories = core.getInput("directories");
/**The name of a contributor of the repository, used for pushing to git.*/
const username = core.getInput("user-name");
/**The email of a contributor of the repository, used for pushing to git.*/
const useremail = core.getInput("user-email");
/**The commit message that will appear when a build has completed.*/
const message = core.getInput("message");
/**Tells the action that it has failed when an error has occured.
 * @param err {Error} - The error to log.*/
function onError(err) { core.setFailed(err.message); }
/**Compiles all the typescript.*/
function buildTypeScript() {
    return __awaiter(this, void 0, void 0, function* () {
        if (directories) {
            // Variables
            let dirs = splitString(directories, ',');
            for (let i = 0; i < dirs.length; i++) {
                console.log("Building typescript @ " + dirs[i]);
                yield exec_1.exec("tsc", ["-p", dirs[i]]);
            }
        }
        else {
            console.log("Building typescript @ base directory");
            yield exec_1.exec("tsc");
        }
    });
}
/**Pushes the newly compiled stuff to the repository.*/
function gitPush() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Pushing to git");
        yield exec_1.exec("git", ["config", "--global", "user.name", username]);
        yield exec_1.exec("git", ["config", "--global", "user.email", useremail]);
        yield exec_1.exec("git", ["add", "."]);
        yield exec_1.exec("git", ["commit", "-m", message]);
        yield exec_1.exec("git", ["push"]);
    });
}
/**Splits the string with respect to not splitting strings unnecessarily.
 * @param str {string} - The string to split.
 * @param delimiter {string} - The delimiter to split the string with.
 * @returns Returns the list of strings that are split correctly.*/
function splitString(str, delimiter) {
    if (str == "") {
        return [];
    }
    // Variables
    let prev = 0;
    let results = [];
    let isQuoted = false;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) == '"') {
            isQuoted = !isQuoted;
        }
        else if (!isQuoted && str.charAt(i) == delimiter) {
            results.push(str.substr(prev, i - prev).trim());
            prev = i + 1;
        }
    }
    results.push(str.substr(prev).trim());
    return results;
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield buildTypeScript();
        yield gitPush().catch(function () { });
    });
})().catch(onError);
