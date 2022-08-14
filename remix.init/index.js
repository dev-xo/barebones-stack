/**
 * Barebones Stack
 * @author @dev-xo https://github.com/dev-xo
 *
 * Most of the Typescript related scripts, are related to other authors.
 * @author @MichaelDeBoey https://github.com/MichaelDeBoey
 * @author @kentcdodds https://github.com/kentcdodds
 */
const fs = require("fs/promises")
const path = require("path")
const crypto = require("crypto")

const toml = require("@iarna/toml")
const PackageJson = require("@npmcli/package-json")

/**
 * @description
 * Runs after the project has been generated and dependencies have been installed.
 */
async function main({ rootDirectory, packageManager, isTypeScript }) {
  const DIR_NAME = path.basename(rootDirectory)
  const APP_NAME = DIR_NAME.replace(/[^a-zA-Z0-9-_]/g, "-")

  // Javascript support is on the way!
  if (!isTypeScript) {
    const packageJson = PackageJson.load(rootDirectory)

    updatePackageJson({ APP_NAME, isTypeScript, packageJson })

    /* throw new Error(
      "😓 Javascript implementation of this template will be released soon! We apologise!"
    ) */
  }

  // Creates and initiates a newly `.env` file,
  // with provided variables from `.env.example`.
  await createAndInitEnvFile(rootDirectory)

  // Replaces default project name for the one provided by `DIR_NAME`.
  await replaceProjectNameFromFiles(rootDirectory, APP_NAME)

  // Replaces `Dockerfile` and adds a `lockfile`,
  // based on the provided package manager from user.
  await replaceDockerLockFile(rootDirectory, packageManager)

  /*
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

function escapeRegExp(string) {
  // $& means the whole matched string.
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function getRandomString(length) {
  return crypto.randomBytes(length).toString("hex")
}

/**
 * @description
 * Creates and initiates a newly `.env` file, with provided variables from `.env.example`.
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
async function replaceProjectNameFromFiles(rootDirectory, APP_NAME) {
  const PACKAGE_JSON_PATH = path.join(rootDirectory, "package.json")
  const FLY_TOML_PATH = path.join(rootDirectory, "fly.toml")
  const README_PATH = path.join(rootDirectory, "README.md")

  // const README_HEADER_MATCHER = /#\sRemix\sBarebones\sStack/gm
  // const APP_NAME_MATCHER = /barebones-stack/gm
  const REPLACER_MATCHER = /barebones[\s|-]stack/gim

  // 1. Reads.
  const [tomlFile, readmeFile] = await Promise.all([
    fs.readFile(PACKAGE_JSON_PATH, "utf-8"),
    fs.readFile(FLY_TOML_PATH, "utf-8"),
    fs.readFile(README_PATH, "utf-8"),
  ])

  // 2. Replaces.
  // Replaces Fly.toml file.
  const replacedTomlFile = toml.parse(tomlFile)
  replacedTomlFile.app = replacedTomlFile.app.replace(
    REPLACER_MATCHER,
    APP_NAME
  )

  // Replaces README.md file.
  const replacedReadmeFile = readmeFile.replace(REPLACER_MATCHER, APP_NAME)

  // 3. Writes.
  await Promise.all([
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

/**
 * Typescript related scripts.
 * @author @MichaelDeBoey https://github.com/MichaelDeBoey
 * @author @kentcdodds https://github.com/kentcdodds
 */

/**
 * @description
 */
function removeUnusedDependencies(dependencies, unusedDependencies) {
  Object.fromEntries(
    Object.entries(dependencies).filter(
      ([key]) => !unusedDependencies.includes(key)
    )
  )
}

/**
 * @description
 */
const updatePackageJson = ({ packageJson, isTypeScript, APP_NAME }) => {
  const {
    devDependencies,
    prisma: { seed: prismaSeed, ...prisma },
    scripts: { typecheck, validate, ...scripts },
  } = packageJson.content

  packageJson.update({
    name: APP_NAME,
    devDependencies: isTypeScript
      ? devDependencies
      : removeUnusedDependencies(devDependencies, [
          "ts-node",
          "vite-tsconfig-paths",
        ]),
    prisma: isTypeScript
      ? prisma
      : {
          ...prisma,
          seed: prismaSeed
            .replace("ts-node", "node")
            .replace("seed.ts", "seed.js"),
        },
    scripts: isTypeScript
      ? { ...scripts, typecheck, validate }
      : { ...scripts, validate: validate.replace(" typecheck", "") },
  })
}

module.exports = main
