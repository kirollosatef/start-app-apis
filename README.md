# Start, productivity application apis

## Files overview

- `src` folder contains the source code of the application.
- `.env` file contains the environment variables.
- `package.json` file contains the dependencies , scripts and other information about the application.
- `.gitignore` file contains the files and folders that should be ignored by git.
- `tsconfig.json` file contains the configuration for the typescript compiler.
- `nodemon.json` file contains the configuration for nodemon.
- `editorconfig` file contains the configuration for the editor to run the same configuration for all the developers.

## Scripts overview

- `npm run start:dev`

  Starts the application in development using `nodemon` and `ts-node` to do cold reloading.

- `npm run build`

  Builds the app at `build`, cleaning the folder first.

- `npm run start`

  Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js.`
