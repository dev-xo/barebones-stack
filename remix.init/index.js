/**
 * Barebones Stack
 * @author @dev-xo https://github.com/dev-xo
 *
 * Some of the Typescript related scripts, have been developed by other authors.
 * @author @MichaelDeBoey https://github.com/MichaelDeBoey
 * @author @kentcdodds https://github.com/kentcdodds
 */
const { execSync } = require("child_process");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const toml = require("@iarna/toml");
const YAML = require("yaml");
const PackageJson = require("@npmcli/package-json");

/**
 * Helpers.
 */
const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const getRandomString = (length) => crypto.randomBytes(length).toString("hex");

/**
 * Filters out unused dependencies.
 */
const removeUnusedDependencies = (dependencies, unusedDependencies) =>
  Object.fromEntries(
    Object.entries(dependencies).filter(
      ([key]) => !unusedDependencies.includes(key)
    )
  );

/**
 * Cleans up Typescript references from Cypress folders.
 */
const cleanupCypressFiles = async (rootDirectory) => {
  const CYPRESS_CONFIG_PATH = path.join(rootDirectory, "cypress.config.js");

  // Reads, replaces and writes a new file.
  const cypressConfig = await fs.readFile(CYPRESS_CONFIG_PATH, "utf-8");
  const replacedCypressConfig = cypressConfig.replace(
    "export default",
    "module.exports ="
  );
  await fs.writeFile(CYPRESS_CONFIG_PATH, replacedCypressConfig);
};

/**
 * Cleans up Typescript references from Vitest config.
 */
const cleanupVitestConfigFile = async (rootDirectory) => {
  const VITEST_CONFIG_PATH = path.join(rootDirectory, "vitest.config.js");

  // Reads, replaces and writes a new file.
  const vitestConfig = await fs.readFile(VITEST_CONFIG_PATH, "utf-8");
  const replacedVitestConfig = vitestConfig.replace(
    "setup-test-env.ts",
    "setup-test-env.js"
  );
  await fs.writeFile(VITEST_CONFIG_PATH, replacedVitestConfig);
};

/**
 * Cleans up Typescript references from Github workflows.
 */
const cleanupDeployWorkflowFile = async (rootDirectory) => {
  const DEPLOY_WORKFLOW_PATH = path.join(
    rootDirectory,
    ".github",
    "workflows",
    "deploy.yml"
  );

  // Reads, parses, replaces and writes a new file.
  const deployWorkflow = await fs.readFile(DEPLOY_WORKFLOW_PATH, "utf-8");
  const parsedWorkflow = YAML.parse(deployWorkflow);

  delete parsedWorkflow.jobs.typecheck;
  parsedWorkflow.jobs.deploy.needs = parsedWorkflow.jobs.deploy.needs.filter(
    (need) => need !== "typecheck"
  );

  return await fs.writeFile(
    DEPLOY_WORKFLOW_PATH,
    YAML.stringify(parsedWorkflow)
  );
};

/**
 * Updates package.json
 */
const updatePackageJson = async (rootDirectory, isTypeScript, APP_NAME) => {
  const packageJson = await PackageJson.load(rootDirectory);

  const {
    devDependencies,
    prisma: { seed: prismaSeed, ...prisma },
    scripts: { typecheck, validate, ...scripts },
  } = packageJson.content;

  packageJson.update({
    name: APP_NAME,
    devDependencies: isTypeScript
      ? devDependencies
      : removeUnusedDependencies(devDependencies, ["ts-node"]),
    prisma: isTypeScript
      ? { ...prisma, seed: prismaSeed }
      : {
          ...prisma,
          seed: prismaSeed
            .replace("ts-node", "node")
            .replace("seed.ts", "seed.js"),
        },
    scripts: isTypeScript
      ? { ...scripts, typecheck, validate }
      : { ...scripts, validate: validate.replace(" typecheck", "") },
  });

  await packageJson.save();
};

/**
 * Creates and initiates a newly `.env` file,
 * with provided variables from `.env.example`.
 */
const createAndInitEnvFile = async (rootDirectory) => {
  const ENV_PATH = path.join(rootDirectory, ".env");
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, ".env.example");

  // Reads, replaces and writes a new file.
  const exampleEnv = await fs.readFile(EXAMPLE_ENV_PATH, "utf-8");
  const replacedExampleEnv = exampleEnv.replace(
    /^SESSION_SECRET=.*$/m,
    `SESSION_SECRET="${getRandomString(16)}"`
  );
  await fs.writeFile(ENV_PATH, replacedExampleEnv);
};

/**
 * Replaces default project name for the one provided by `DIR_NAME`.
 *
 * Files that are being updated:
 * - fly.toml
 * - README.md
 */
const replaceProjectNameFromFiles = async (rootDirectory, APP_NAME) => {
  const FLY_TOML_PATH = path.join(rootDirectory, "fly.toml");
  const README_PATH = path.join(rootDirectory, "README.md");
  const REPLACER = /barebones[\s|-]stack/gim;

  const [flyToml, readme] = await Promise.all([
    fs.readFile(FLY_TOML_PATH, "utf-8"),
    fs.readFile(README_PATH, "utf-8"),
  ]);

  // Replaces Fly.toml file.
  const replacedFlyToml = toml.parse(flyToml);
  replacedFlyToml.app = replacedFlyToml.app.replace(REPLACER, APP_NAME);

  // Replaces README.md file.
  const replacedReadme = readme.replace(REPLACER, APP_NAME);

  await Promise.all([
    fs.writeFile(FLY_TOML_PATH, toml.stringify(replacedFlyToml)),
    fs.writeFile(README_PATH, replacedReadme),
  ]);
};

/**
 * Replaces `Dockerfile` and adds a `lockfile`,
 * based on the provided package manager from user.
 */
const replaceDockerLockFile = async (rootDirectory, packageManager) => {
  const DOCKERFILE_PATH = path.join(rootDirectory, "Dockerfile");

  const dockerfile = await fs.readFile(DOCKERFILE_PATH, "utf-8");
  const lockfile = {
    npm: "package-lock.json",
    yarn: "yarn.lock",
    pnpm: "pnpm-lock.yaml",
  }[packageManager];

  const replacedDockerFile = lockfile
    ? dockerfile.replace(
        new RegExp(escapeRegExp("ADD package.json"), "g"),
        `ADD package.json ${lockfile}`
      )
    : dockerfile;

  await fs.writeFile(DOCKERFILE_PATH, replacedDockerFile);
};

/**
 * Runs after the project has been generated
 * and dependencies have been installed.
 */
async function main({ rootDirectory, packageManager, isTypeScript }) {
  const DIR_NAME = path.basename(rootDirectory);
  const APP_NAME = DIR_NAME.replace(/[^a-zA-Z0-9-_]/g, "-");

  if (!isTypeScript) {
    // Cleans up all Typescript references from the project.
    await Promise.all([
      cleanupCypressFiles(rootDirectory),
      cleanupVitestConfigFile(rootDirectory),
      cleanupDeployWorkflowFile(rootDirectory),
    ]);
  }

  await Promise.all([
    // Updates package.json.
    updatePackageJson(rootDirectory, isTypeScript, APP_NAME),

    // Creates and initiates a newly `.env` file,
    // with provided variables from `.env.example`.
    createAndInitEnvFile(rootDirectory),

    // Replaces default project name for the one provided by `DIR_NAME`.
    replaceProjectNameFromFiles(rootDirectory, APP_NAME),

    // Replaces `Dockerfile` and adds a `lockfile`,
    // based on the provided package manager from user.
    replaceDockerLockFile(rootDirectory, packageManager),
  ]);

  // Seeds database.
  execSync("npm run setup", { cwd: rootDirectory, stdio: "inherit" });

  // Formats the entire project.
  execSync("npm run format -- --loglevel warn", {
    cwd: rootDirectory,
    stdio: "inherit",
  });

  console.log(
    `
🔋 Batteries has been successfully set.
❗️ Go ahead and build something amazing!

📀 Start development with \`npm run dev\`

 `.trim()
  );
}

module.exports = main;
