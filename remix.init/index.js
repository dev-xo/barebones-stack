/**
 * Barebones Stack
 * @author @dev-xo: https://github.com/dev-xo
 */
const { execSync } = require("child_process")
const crypto = require("crypto")
const fs = require("fs/promises")
const path = require("path")

const toml = require("@iarna/toml")
const sort = require("sort-package-json")

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
const getRandomString = (length) => crypto.randomBytes(length).toString("hex")

const createAndInitEnvFile = async (rootDirectory) => {
  const ENV_PATH = path.join(rootDirectory, ".env")
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, ".env.example")

  const exampleEnvFile = await fs.readFile(EXAMPLE_ENV_PATH, "utf-8")
  await fs.writeFile(ENV_PATH, exampleEnvFile)
}

const main = async ({ rootDirectory, packageManager, isTypeScript }) => {
  if (!isTypeScript) {
    throw new Error(
      "😓 Javascript implementation of this template will be released soon! We apologise!"
    )
  }

  const DIR_NAME = path.basename(rootDirectory)

  const PACKAGE_JSON_PATH = path.join(rootDirectory, "package.json")
  const DOCKERFILE_PATH = path.join(rootDirectory, "Dockerfile")
  const FLY_TOML_PATH = path.join(rootDirectory, "fly.toml")
  const README_PATH = path.join(rootDirectory, "README.md")
  const STACK_GITHUB_ACTION = path.join(
    rootDirectory,
    ".github/workflows/deploy.yml"
  )

  const REPLACER = "remix-barebones-template"
  const SUFFIX = getRandomString(2)
  const APP_NAME = (DIR_NAME + "-" + SUFFIX).replace(/[^a-zA-Z0-9-_]/g, "-")

  const [packageJson, dockerfile, prodContent, readme] = await Promise.all([
    fs.readFile(PACKAGE_JSON_PATH, "utf-8").then((s) => JSON.parse(s)),
    fs.readFile(DOCKERFILE_PATH, "utf-8"),
    fs.readFile(FLY_TOML_PATH, "utf-8"),
    fs.readFile(README_PATH, "utf-8"),
    fs.rm(STACK_GITHUB_ACTION),
  ])

  await createAndInitEnvFile(rootDirectory)

  const prodToml = toml.parse(prodContent)
  prodToml.app = prodToml.app.replace(REPLACER, APP_NAME)

  const newReadme = readme.replace(
    new RegExp(escapeRegExp(REPLACER), "g"),
    APP_NAME
  )

  const newPackageJson =
    JSON.stringify(sort({ ...packageJson, name: APP_NAME }), null, 2) + "\n"

  const lockfile = {
    npm: "package-lock.json",
    yarn: "yarn.lock",
    pnpm: "pnpm-lock.yaml",
  }[packageManager]

  /* 
  const newDockerfile = lockfile
    ? dockerfile.replace(
        new RegExp(escapeRegExp("ADD package.json"), "g"),
        `ADD package.json ${lockfile}`
      )
    : dockerfile 
  */

  await Promise.all([
    fs.writeFile(PACKAGE_JSON_PATH, newPackageJson),
    // fs.writeFile(DOCKERFILE_PATH, newDockerfile),
    fs.writeFile(FLY_TOML_PATH, toml.stringify(prodToml)),
    fs.writeFile(README_PATH, newReadme),

    /* fs.copyFile(
      path.join(rootDirectory, "remix.init", "gitignore"),
      path.join(rootDirectory, ".gitignore")
    ), */
  ])

  execSync("npm run format -- --loglevel warn", {
    stdio: "inherit",
    cwd: rootDirectory,
  })

  console.log(
    `Setup is complete.
🔋 Batteries has been included!
Start development with \`npm run dev\`
 `.trim()
  )
}

module.exports = main
