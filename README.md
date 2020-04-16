
# Typescript Build/Push

This action is for building typescript projects that were pushed unbuilt and makes a commit for the built JS files.

## Usage

**`user-name` as (string):** The name of a contributor of the repository as it appears on GitHub's profiles, used for pushing to git. Recommended to add the owner of the repository. **(REQUIRED)**.

**`user-email` as (string):** The email of a contributor of the repository, used for pushing to git. Recommended to add the owner of the repository. **(REQUIRED)**.

**`message` as (string):** The commit message that will appear when a build has completed. *(Default: Automatically built unbuilt typescript)*

**`directories` as (string[]):** The list of directories to build the typescripts from, if omitted then it will use the base project directory. The list is seperated by comma that's not found within quotations (""). Example: `path/to/folder, second/path/to/folder/`

## License

The project is licensed under [MIT](LICENSE).
