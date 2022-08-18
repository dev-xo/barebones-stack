# Remix Barebones Stack

[![Product Name Screen Shot][product-screenshot]](#)

A solid create-remix app, that follows community guidelines and applies best practices into a clean, batteries included template.

## 🎯 Who is this template aiming for?

This template is aiming for those who loves to build their stuff **from the ground**, with a solid and well tested template, to start coding right away.<br />

- Clean and easy start.
- Everything is already set up, and it will work out of the box.
- Solid template with all the good features from the bigger stacks.

We've just included the batteries. You build the rest! Inspired on [Indie Stack](https://github.com/remix-run/indie-stack) and some other cool stacks.

- This template has support for Javascript users! And we'll keep improving it over time.

## 💿 Features

- [Fly app Deployment](https://fly.io) with [Docker](https://www.docker.com/products/docker-desktop/)
- Production-Ready with [SQLite Database](https://sqlite.org/index.html)
- Healthcheck endpoint for [Fly backups region fallbacks](https://fly.io/docs/reference/configuration/#services-http_checks)
- [GitHub Actions](https://github.com/features/actions) for Deploy on merge to production and staging environments.
- Database ORM with [Prisma](https://www.prisma.io/)
- Styling with [Tailwind.css](https://tailwindcss.com/) + [Tailwind Prettier-Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
- End-to-end testing with [Cypress](https://www.cypress.io/how-it-works)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Local third party request mocking with [MSW](https://mswjs.io)
- Linting with [ESLint](https://eslint.org/)
- Code formatting with [Prettier](https://prettier.io/)
- Static Types with [TypeScript](https://www.typescriptlang.org/)

Would you like to change something? Fork it, change it, and use `npx create-remix --template your/repo`!<br/>
Make it your own. Learn more about [Remix Stacks](https://remix.run/stacks).

## 🔋 Getting Started

- Initialize the following template into your workspace.

  ```sh
  npx create-remix --template dev-xo/barebones-stack
  ```

- Initial setup: _If you just generated this project, this step has been done for you._

  ```sh
  npm run setup
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.<br />
The database seed script creates a welcome message that will let you know, database is up and running.

## 🚀 Deployment

This Remix Stack comes with two GitHub Actions that handle automatically deploying your app to production and staging environments.

Prior to your first deployment, you'll need to do a few things:

- [Install Fly](https://fly.io/docs/getting-started/installing-flyctl/)

- Sign up and log in to Fly.

  ```sh
  fly auth signup
  ```

  > **Note:** If you have more than one Fly account, ensure that you are signed into the same account in the Fly CLI as you are in the browser. In your terminal, run `fly auth whoami` and ensure the email matches the Fly account signed into the browser.

- Create two apps on Fly, one for staging and one for production:

  ```sh
  fly apps create barebones-stack
  fly apps create barebones-stack-staging
  ```

  > **Note:** Make sure this name matches the `app` set in your `fly.toml` file. Otherwise, you will not be able to deploy.

- Initialize Git.

  ```sh
  git init
  ```

- Create a new [GitHub Repository](https://repo.new), and then add it as the remote for your project. **Do not push your app yet!**

  ```sh
  git remote add origin <ORIGIN_URL>
  ```

- Add a `FLY_API_TOKEN` to your GitHub repo. To do this, go to your user settings on Fly and create a new [token](https://web.fly.io/user/personal_access_tokens/new), then add it to [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) with the name `FLY_API_TOKEN`.

- Add a `SESSION_SECRET` to your fly app secrets, to do this you can run the following commands:

  ```sh
  fly secrets set SESSION_SECRET=$(openssl rand -hex 32) --app barebones-stack
  fly secrets set SESSION_SECRET=$(openssl rand -hex 32) --app barebones-stack-staging
  ```

  If you don't have openssl installed, you can also use [1password](https://1password.com/password-generator/) to generate a random secret, just replace `$(openssl rand -hex 32)` with the generated secret.

- Create a persistent volume for the sqlite database for both your staging and production environments. Run the following:

  ```sh
  fly volumes create data --size 1 --app barebones-stack
  fly volumes create data --size 1 --app barebones-stack-staging
  ```

Now that everything is set up you can commit and push your changes to your repo. Every commit to your `main` branch will trigger a deployment to your production environment, and every commit to your `dev` branch will trigger a deployment to your staging environment.

### Connecting to your database

The sqlite database lives at `/data/sqlite.db` in your deployed application. You can connect to the live database by running `fly ssh console -C database-cli`.

### Getting Help with Deployment

If you run into any issues deploying to Fly, make sure you've followed all of the steps above and if you have, then post as many details about your deployment (including your app name) to [the Fly support community](https://community.fly.io). They're normally pretty responsive over there and hopefully can help resolve any of your deployment issues and questions.

## ⚙️ GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `master` branch will be deployed to production after running tests/build/etc. Anything in the `dev` branch will be deployed to staging.

## 🔎 Testing

### Cypress

We use Cypress for our End-to-End tests in this project. You'll find those in the `cypress` directory. As you make changes, add to an existing file or create a new file in the `cypress/e2e` directory to test your changes.

We use [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, run `npm run test:e2e:dev` which will start the dev server for the app as well as the Cypress client. Make sure the database is running in docker as described above.

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.

## ❤️ Acknowledgments

Simply wanna say thank you all! Im having a great time developing this stack.<br />
Some of the cool features that are implemented in the template are from [Indie Stack](https://github.com/remix-run/indie-stack)

Also a big shout out to [@MichaelDeBoey](https://github.com/MichaelDeBoey).<br/>
He's doing an amazing job on `remix.init` folders and so on!

<!-- MARKDOWN LINKS & IMAGES -->
<!-- This text will be removed. Only propouse is to call github actions. -->

[product-screenshot]: ./app/assets/images/thumbnail.png
