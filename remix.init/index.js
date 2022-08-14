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
const YAML = require("yaml")
const PackageJson = require("@npmcli/package-json")

/**
 * @description
 * Runs after the project has been generated and dependencies have been installed.
 */
async function main({ rootDirectory, packageManager, isTypeScript }) {
  const DIR_NAME = path.basename(rootDirectory)
  const APP_NAME = DIR_NAME.replace(/[^a-zA-Z0-9-_]/g, "-")

  if (!isTypeScript) {
    // TODO: SHOULD BE AN OBJECT? INSTEAD OF PROPS?
    // Updates packageJson, removing all Typescript references.
    await updatePackageJson({ rootDirectory, isTypeScript, APP_NAME })

    // Cleans up Typescript references from Github Actions deploy workflow.
    await cleanupDeployWorkflow(rootDirectory)

    // Cleans up Typescript references from Vitest config.
    await cleanupVitestConfig(rootDirectory)
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
  TODO: check more cmds.
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
 * Helper related scripts.
 * @link https://github.com/remix-run/indie-stack
 */
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
  const FLY_TOML_PATH = path.join(rootDirectory, "fly.toml")
  const README_PATH = path.join(rootDirectory, "README.md")

  const REPLACER_MATCHER = /barebones[\s|-]stack/gim

  // 1. Reads.
  const [tomlFile, readmeFile] = await Promise.all([
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
 * Typescript cleanups related scripts.
 * @author @MichaelDeBoey https://github.com/MichaelDeBoey
 * @author @kentcdodds https://github.com/kentcdodds
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
 * Updates packageJson, removing all Typescript references.
 */
const updatePackageJson = async ({ rootDirectory, isTypeScript, APP_NAME }) => {
  // 1. Reads.
  const packageJson = await PackageJson.load(rootDirectory)

  const {
    devDependencies,
    prisma: { seed: prismaSeed, ...prisma },
    scripts: { typecheck, validate, ...scripts },
  } = packageJson.content

  // 2. Updates.
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

  // 3. Saves.
  await packageJson.save()
}

/**
 * @description
 * Cleans up Typescript references from Github Actions deploy workflow.
 */
async function cleanupDeployWorkflow(rootDirectory) {
  const DEPLOY_WORKFLOW_PATH = path.join(
    rootDirectory,
    ".github",
    "workflows",
    "deploy.yml"
  )

  // 1. Reads.
  const githubDeployYmlFile = await fs.readFile(DEPLOY_WORKFLOW_PATH, "utf-8")

  // 2. Parses.
  let githubDeployYmlParsedFile = YAML.parse(githubDeployYmlFile)

  // 3. Deletes.
  delete githubDeployYmlParsedFile.jobs.typecheck
  githubDeployYmlParsedFile.jobs.deploy.needs =
    githubDeployYmlParsedFile.jobs.deploy.needs.filter(
      (need) => need !== "typecheck"
    )

  // 4 Writes.
  return await fs.writeFile(
    DEPLOY_WORKFLOW_PATH,
    YAML.stringify(githubDeployYmlParsedFile)
  )
}

/**
 * @description
 * Cleans up Typescript references from Vitest config.
 */
async function cleanupVitestConfig(rootDirectory) {
  const VITEST_CONFIG_PATH = path.join(rootDirectory, "vitest.config.js")

  // Reads, replaces and writes new file.
  const vitestConfigFile = await fs.readFile(VITEST_CONFIG_PATH, "utf-8")
  const replacedVitestConfig = vitestConfigFile.replace(
    "setup-test-env.ts",
    "setup-test-env.js"
  )
  return await fs.writeFile(VITEST_CONFIG_PATH, replacedVitestConfig)
}

module.exports = main
