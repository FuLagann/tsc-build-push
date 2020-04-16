
# Typescript Build/Push

This action is for building typescript projects that were pushed uncompiled, compiles the TypeScript into JavaScript, and makes a second commit for the compiled JS files.

## Usage

**`user-name` as (string):** The name of a contributor of the repository as it appears on GitHub's profiles, used for pushing to git. Recommended to add the owner of the repository. **(REQUIRED)**.

**`user-email` as (string):** The email of a contributor of the repository, used for pushing to git. Recommended to add the owner of the repository. **(REQUIRED)**.

**`message` as (string):** The commit message that will appear when a build has completed. *(Default: Automatically built unbuilt typescript)*

**`directories` as (string[]):** The list of directories to build the typescripts from, if omitted then it will use the base project directory. The list is seperated by comma that's not found within quotations (""). Example: `path/to/folder, second/path/to/folder/`

## Example Workflow Yaml

The following is an example of a workflow yaml that is used to have the action run on your repository:

```yml
on: [push]

jobs:
  build-push:
    runs-on: ubuntu-latest
    name: Builds Typescript
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Building Typescript
        uses: FuLagann/tsc-build-push@v1
        with:
          user-name: "John Doe"
          user-email: "john.doe@example.com"
          message: "Automatically built unbuilt typescript"
          directories: ./, path/to/folder/
```

## License

The project is licensed under [MIT](LICENSE).

## Contribution

Any issues, please make a [new issue on the project's repository.](https://github.com/FuLagann/tsc-build-push/issues)
