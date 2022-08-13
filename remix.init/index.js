/**
 * Barebones Stack
 * @author @dev-xo: https://github.com/dev-xo
 */
const fs = require("fs/promises")
const path = require("path")

const toml = require("@iarna/toml")
const sort = require("sort-package-json")

/**
 * @param {*} string
 */
const escapeRegExp = (string) =>
  // $& means the whole matched string.
  string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/**
 * @description
 * Creates and initiates a newly `.env` file, with provided variables from `.env.example`.
 */
const createAndInitEnvFile = async (rootDirectory) => {
  const ENV_PATH = path.join(rootDirectory, ".env")
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, ".env.example")

  const exampleEnvFile = await fs.readFile(EXAMPLE_ENV_PATH, "utf-8")
  await fs.writeFile(ENV_PATH, exampleEnvFile)
}

/**
 * @description Replaces default project name for the one provided by `DIR_NAME`.
 *
 * Files that are being updated:
 * - package.json
 * - fly.toml
 * - README.md
 */
const replaceProjectNameFromFiles = async (rootDirectory, appName) => {
  const PACKAGE_JSON_PATH = path.join(rootDirectory, "package.json")
  const FLY_TOML_PATH = path.join(rootDirectory, "fly.toml")
  const README_PATH = path.join(rootDirectory, "README.md")

  const README_HEADER_MATCHER = /#\sRemix\sBarebones\sStack/gm
  const APP_NAME_MATCHER = /barebones-stack/gm

  const README_HEADER_REPLACER = "# " + appName

  // 1. Reads.
  const [packageJsonFile, tomlFile, readmeFile] = await Promise.all([
    fs.readFile(PACKAGE_JSON_PATH, "utf-8"),
    fs.readFile(FLY_TOML_PATH, "utf-8"),
    fs.readFile(README_PATH, "utf-8"),
  ])

  // 2. Replaces.
  const replacedPackageJson =
    JSON.stringify(
      sort({ ...JSON.parse(packageJsonFile), name: appName }),
      null,
      2
    ) + "\n"

  const parsedToml = toml.parse(tomlFile)
  const replacedToml = parsedToml.app.replace(APP_NAME_MATCHER, appName)

  const replacedReadmeHeader = readmeFile.replace(
    README_HEADER_MATCHER,
    README_HEADER_REPLACER
  )
  const replacedReadmeHeaderAndText = replacedReadmeHeader.replace(
    APP_NAME_MATCHER,
    appName
  )

  // 3. Writes.
  await Promise.all([
    fs.writeFile(PACKAGE_JSON_PATH, replacedPackageJson),
    fs.writeFile(FLY_TOML_PATH, toml.stringify(replacedToml)),
    fs.writeFile(README_PATH, replacedReadmeHeaderAndText),
  ])
}

/**
 * @description
 * Runs after the project has been generated and dependencies have been installed.
 */
const main = async ({ rootDirectory, packageManager, isTypeScript }) => {
  const DIR_NAME = path.basename(rootDirectory)
  const APP_NAME = DIR_NAME.replace(/[^a-zA-Z0-9-_]/g, "-")

  if (!isTypeScript) {
    throw new Error(
      "😓 Javascript implementation of this template will be released soon! We apologise!"
    )
  }

  // Creates and initiates a newly `.env` file,
  // with provided variables from `.env.example`.
  await createAndInitEnvFile(rootDirectory)

  // Replaces default project name for the one provided by `DIR_NAME`.
  await replaceProjectNameFromFiles(rootDirectory, APP_NAME)

  /* const prodToml = toml.parse(prodContent)
  prodToml.app = prodToml.app.replace(REPLACER, APP_NAME)
  
  execSync("npm run format -- --loglevel warn", {
    stdio: "inherit",
    cwd: rootDirectory,
  }) */

  console.log(
    `Setup is complete. 🔋 Batteries has been included!
Start development with \`npm run dev\`
 `.trim()
  )
}

module.exports = main
