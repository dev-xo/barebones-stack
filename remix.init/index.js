/**
 * Barebones Stack
 * @author @dev-xo: https://github.com/dev-xo
 */
const fs = require("fs/promises")
const path = require("path")
const crypto = require("crypto")

const toml = require("@iarna/toml")
const sort = require("sort-package-json")

/**
 * @description Runs after the project has been generated
 * and dependencies have been installed.
 */
async function main({ rootDirectory, packageManager, isTypeScript }) {
  // Javascript support is on the way!
  if (!isTypeScript) {
    throw new Error(
      "😓 Javascript implementation of this template will be released soon! We apologise!"
    )
  }

  const DIR_NAME = path.basename(rootDirectory)
  const APP_NAME = DIR_NAME.replace(/[^a-zA-Z0-9-_]/g, "-")

  // Creates and initiates a newly `.env` file,with provided variables from `.env.example`.
  await createAndInitEnvFile(rootDirectory)

  // Replaces default project name for the one provided by `DIR_NAME`.
  await replaceProjectNameFromFiles(rootDirectory, APP_NAME)

  // Replaces `Dockerfile` and adds a `lockfile`,
  // based on the provided package manager from user.
  await replaceDockerLockFile(rootDirectory, packageManager)

  /* const prodToml = toml.parse(prodContent)
  prodToml.app = prodToml.app.replace(REPLACER, APP_NAME)
  
  execSync("npm run format -- --loglevel warn", {
    stdio: "inherit",
    cwd: rootDirectory,
  }) */

  console.log(
    `
Setup is complete. 🔋 Batteries has been included!
Start development with \`npm run dev\`
 `.trim()
  )
}

/**
 * @param {*} string
 * @returns
 */
function escapeRegExp(string) {
  // $& means the whole matched string.
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/**
 *
 * @param {*} length
 * @returns
 */
function getRandomString(length) {
  return crypto.randomBytes(length).toString("hex")
}

/**
 * @description Creates and initiates a newly `.env` file,
 * with provided variables from `.env.example`.
 */
async function createAndInitEnvFile(rootDirectory) {
  const ENV_PATH = path.join(rootDirectory, ".env")
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, ".env.example")

  const exampleEnvFil = await fs.readFile(EXAMPLE_ENV_PATH, "utf-8")
  const replacedExampleEnvFile = exampleEnvFil.replace(
    /^SESSION_SECRET=.*$/m,
    `SESSION_SECRET="${getRandomString(16)}"`
  )

  await fs.writeFile(ENV_PATH, replacedExampleEnvFile)
}

/**
 * @description Replaces default project name for the one provided by `DIR_NAME`.
 *
 * Files that are being updated:
 * - package.json
 * - fly.toml
 * - README.md
 */
async function replaceProjectNameFromFiles(rootDirectory, appName) {
  const PACKAGE_JSON_PATH = path.join(rootDirectory, "package.json")
  const FLY_TOML_PATH = path.join(rootDirectory, "fly.toml")
  const README_PATH = path.join(rootDirectory, "README.md")

  // const README_HEADER_MATCHER = /#\sRemix\sBarebones\sStack/gm
  // const APP_NAME_MATCHER = /barebones-stack/gm
  const REPLACER_MATCHER = /barebones[\s|-]stack/gim

  // 1. Reads.
  const [packageJsonFile, tomlFile, readmeFile] = await Promise.all([
    fs.readFile(PACKAGE_JSON_PATH, "utf-8"),
    fs.readFile(FLY_TOML_PATH, "utf-8"),
    fs.readFile(README_PATH, "utf-8"),
  ])

  // 2. Replaces.
  // Replaces Package.json file.
  const replacedPackageJsonFile =
    JSON.stringify(
      sort({ ...JSON.parse(packageJsonFile), name: appName }),
      null,
      2
    ) + "\n"

  // Replaces Fly.toml file.
  const replacedTomlFile = toml.parse(tomlFile)
  replacedTomlFile.app = replacedTomlFile.app.replace(REPLACER_MATCHER, appName)

  // Replaces README.md file.
  const replacedReadmeFile = readmeFile.replace(
    new RegExp(escapeRegExp(REPLACER_MATCHER), "g"),
    appName
  )

  // 3. Writes.
  await Promise.all([
    fs.writeFile(PACKAGE_JSON_PATH, replacedPackageJsonFile),
    fs.writeFile(FLY_TOML_PATH, toml.stringify(replacedTomlFile)),
    fs.writeFile(README_PATH, replacedReadmeFile),
  ])
}

/**
 * @description Replaces `Dockerfile` and adds a lockfile,
 * based on the provided package manager from user.
 */
async function replaceDockerLockFile(rootDirectory, packageManager) {
  const DOCKERFILE_PATH = path.join(rootDirectory, "Dockerfile")

  // 1. Reads.
  const dockerfile = await fs.readFile(DOCKERFILE_PATH, "utf-8")

  // 2. Replaces.
  const lockfile = {
    npm: "package-lock.json",
    yarn: "yarn.lock",
    pnpm: "pnpm-lock.yaml",
  }[packageManager]

  const replacedDockerFile = lockfile
    ? dockerfile.replace(
        new RegExp(escapeRegExp("ADD package.json"), "g"),
        `ADD package.json ${lockfile}`
      )
    : dockerfile

  // 3. Writes.
  await fs.writeFile(DOCKERFILE_PATH, replacedDockerFile)
}

module.exports = main
