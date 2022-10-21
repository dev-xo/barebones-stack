![GitHub-Mark-Light](https://raw.githubusercontent.com/dev-xo/dev-xo/main/barebones-stack/assets/images/sqlite-light-logo-v1.png#gh-light-mode-only)
![GitHub-Mark-Dark ](https://raw.githubusercontent.com/dev-xo/dev-xo/main/barebones-stack/assets/images/sqlite-dark-logo-v1.png#gh-dark-mode-only)

<p align="center">
  <p align="center">
    <a href="https://barebones-stack.fly.dev">Live Demo</a>
    ·
    <a href="https://twitter.com/DanielKanem">Twitter</a>
    <br/>
    A starter focused create-remix app, that applies best practices into a clean, batteries included template. Support for SQLite and PostgreSQL. Deploys to Fly.io 
  </p>
</p>

## 💿 Features

This Stack has been created with two main purposes: **simplicity** and **solidity**. Aiming for those who loves to build their stuff from the ground, with a solid, testing-ready template, to start coding right away.

- [Fly app Deployment](https://fly.io) with [Docker.](https://www.docker.com/products/docker-desktop/)
- Database ORM with [Prisma.](https://www.prisma.io/)
- Production Ready with [SQLite](https://sqlite.org/index.html) and [PostgreSQL.](https://www.postgresql.org/)
- [GitHub Actions](https://github.com/features/actions) for Deploy on merge to Production and Staging environments.
- Healthcheck Endpoint for [Fly backups Region Fallbacks.](https://fly.io/docs/reference/configuration/#services-http_checks)
- Styling with [Tailwind.css](https://tailwindcss.com/) + [Tailwind Prettier-Plugin.](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
- End-to-End testing with [Cypress.](https://www.cypress.io/how-it-works)
- Unit Testing with [Vitest](https://vitest.dev) and [Testing Library.](https://testing-library.com)
- Local third party request mocking with [MSW.](https://mswjs.io)
- Linting with [ESLint.](https://eslint.org/)
- Code formatting with [Prettier.](https://prettier.io/)
- Static Types with [TypeScript.](https://www.typescriptlang.org/)
- Support for Javascript developers with continuous updates over time based on `remix.init`.

Learn more about [Remix Stacks](https://remix.run/stacks).

## 🔋 Quickstart

Barebones Stack has support for multiple database based on Prisma. The installer will prompt a selector allowing you to choose the database your project will run on. Deployment files will be updated matching the required criteria to successfully deploy to Fly.io

To get started, run the following commands in your console:

```sh
# Initializes template in your workspace:
npx create-remix@latest --template dev-xo/barebones-stack

# You will be prompted to select the database your project will run on.
# ...

# Seeds database: "If you generated this project, this step has been done for you."
npm run setup

# Starts dev server:
npm run dev
```

> Note: Cloning the repository instead of initializing it with the above commands, will result in a inappropriate experience. This template uses `remix.init` to configure itself and prepare your environment.

### Prisma Migrations

If your database choice was PostgreSQL, you will need to run Prisma migrations with your Postgres client running on the background. In order to accomplish it, feel free to remove the folder inside `/prisma` called `/migrations`, and run `npx prisma migrate dev --name init` to properly setup them.

## 🚀 Deployment

In order to keep a better track and an easier maintenance of each deployment documentation, we moved each one to its own file.

Check [SQLite DEPLOYMENT.md](https://github.com/dev-xo/dev-xo/blob/main/barebones-stack/docs/SQLITE-DEPLOYMENT.md) or [PostgreSQL DEPLOYMENT.md](https://github.com/dev-xo/dev-xo/blob/main/barebones-stack/docs/POSTGRESQL-DEPLOYMENT.md) to get your app to production.

## ⚙️ GitHub Actions

We use GitHub Actions for continuous integration and deployment.<br/><br/>
Anything that gets into the `main` branch will be deployed to production after running tests / build / etc.<br/>
Anything in the `dev` branch will be deployed to staging.

## 🧩 Testing

### Cypress

We use Cypress for our End-to-End tests in this project. You'll find those in the `cypress` directory. As you make changes, add to an existing file or create a new file in the `cypress/e2e` directory to test your changes.

We use [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, run `npm run test:e2e:dev` which will start the dev server for the app as well as the Cypress client. Make sure the database is running in docker as described above.

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

To run these tests in development, run `npm run test` or `npm run test:cov` to get a detailed summary of your tests.

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.

This template has pre-configured prettier settings on `.package-json`. Feel free to update each value with your preferred work style.

## ✨ Support

If you found the template useful, support it with a [Star ⭐](https://github.com/dev-xo/barebones-stack)<br />
It helps the repository grow and gives me motivation to keep working on it. Thanks you!

### ️Acknowledgments

A big shout out to [@MichaelDeBoey](https://github.com/MichaelDeBoey). He's doing an amazing job on `remix.init` and contributing to Remix community!
