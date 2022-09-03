import type { LoaderFunction } from "@remix-run/node"
import type { Welcome } from "@prisma/client"

import { json } from "@remix-run/node"
import { prisma } from "~/utils/db.server"
import { useLoaderData } from "@remix-run/react"

import BeamsPNG from "~/assets/images/beams.png"
import BonePNG from "~/assets/images/bone.png"

type LoaderData = {
  message: Awaited<Welcome["message"]>
}

export const loader: LoaderFunction = async ({ request }) => {
  const dbMessage = await prisma.welcome.findFirst({
    orderBy: { createdAt: "desc" },
    take: 1,
  })

  return json<LoaderData>({
    message: dbMessage?.message ? dbMessage.message : null,
  })
}

export default function Index() {
  const { message } = useLoaderData() as LoaderData

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center px-6">
      {/* Navigation. */}
      <nav
        className="absolute right-4 top-4 z-20 flex w-full flex-row items-center justify-end
      "
      >
        <a
          href="https://github.com/dev-xo/barebones-stack"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="h-8 w-8 fill-zinc-400 transition hover:scale-110 hover:fill-slate-900 active:scale-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
            />
          </svg>
        </a>
      </nav>

      {/* Background Image. */}
      <img
        className="pulse fixed z-[-1] h-[150%] select-none object-cover opacity-80"
        src={BeamsPNG}
        alt=""
      />

      {/* Headers. */}
      <div className="relative flex flex-col items-center">
        <img
          src={BonePNG}
          alt=""
          className="pulse relative left-[18px] h-36 drop-shadow-xl"
        />
        <div className="h-6" />

        <h1 className="relative text-center text-5xl font-bold text-slate-900 sm:text-7xl">
          Barebones Stack
          <span
            className="absolute right-[-50px] top-[-28px] flex cursor-default flex-row rounded-lg
           bg-[rgba(244,44,64,0.8)] px-2 py-[4px] text-base font-semibold text-white transition hover:scale-110"
          >
            {message ? message : "Help us with a Star on Github!"}
          </span>
        </h1>

        {/* Floating Assets. */}
        <span className="float absolute left-16 flex select-none flex-row items-center opacity-40 hover:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={38}
            height={35}
          >
            <path
              d="M 19 32.174 C 19 32.174 1.831 22.591 1.831 10.953 C 1.831 6.711 4.835 3.058 9.008 2.227 C 13.181 1.395 17.363 3.614 19 7.53 L 19 7.53 C 20.637 3.614 24.819 1.395 28.992 2.227 C 33.165 3.058 36.169 6.711 36.169 10.953 C 36.169 22.591 19 32.174 19 32.174 Z"
              fill="#f8a8a6"
              strokeWidth="3.66"
              stroke="#f8a8a6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="ml-2 font-semibold text-zinc-400">Open Source!</p>
        </span>

        <span className="float absolute right-0 top-20 flex select-none flex-row items-center opacity-40 hover:opacity-100">
          <svg
            className="scale-[1.6]"
            xmlns="http://www.w3.org/2000/svg"
            width={26}
            height={26}
          >
            <path
              d="M 13 0 C 20.18 0 26 5.82 26 13 C 26 20.18 20.18 26 13 26 C 5.82 26 0 20.18 0 13 C 0 5.82 5.82 0 13 0 Z"
              fill="#befad3"
            />
            <path
              d="M 8.5 13 L 12 16.5 L 19 10"
              fill="transparent"
              strokeWidth={2}
              stroke="#187f42"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="ml-4 flex flex-col">
            <p className="font-semibold leading-4 text-zinc-400">
              Testing Ready
            </p>
          </div>
        </span>
      </div>
      <div className="h-12" />

      {/* Brandings. */}
      <div className="flex max-w-7xl flex-wrap justify-center gap-8 px-3">
        {[
          {
            src: "https://user-images.githubusercontent.com/1500684/157764397-ccd8ea10-b8aa-4772-a99b-35de937319e1.svg",
            alt: "Fly.io",
            href: "https://fly.io",
          },
          {
            src: "https://user-images.githubusercontent.com/1500684/157764395-137ec949-382c-43bd-a3c0-0cb8cb22e22d.svg",
            alt: "SQLite",
            href: "https://sqlite.org",
          },
          {
            src: "https://user-images.githubusercontent.com/1500684/157764484-ad64a21a-d7fb-47e3-8669-ec046da20c1f.svg",
            alt: "Prisma",
            href: "https://prisma.io",
          },
          {
            src: "https://avatars.githubusercontent.com/u/44036562?s=280&v=4",
            alt: "Github Actions",
            href: "https://github.com/features/actions",
          },
          {
            src: "https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg",
            alt: "Cypress",
            href: "https://www.cypress.io",
          },
          {
            src: "https://user-images.githubusercontent.com/1500684/157772386-75444196-0604-4340-af28-53b236faa182.svg",
            alt: "MSW",
            href: "https://mswjs.io",
          },
          {
            src: "https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg",
            alt: "Vitest",
            href: "https://vitest.dev",
          },
          {
            src: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
            alt: "Testing Library",
            href: "https://testing-library.com",
          },
          {
            src: "https://user-images.githubusercontent.com/1500684/157764276-a516a239-e377-4a20-b44a-0ac7b65c8c14.svg",
            alt: "Tailwind",
            href: "https://tailwindcss.com",
          },
          {
            src: "https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg",
            alt: "Prettier",
            href: "https://prettier.io",
          },
          {
            src: "https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg",
            alt: "ESLint",
            href: "https://eslint.org",
          },
          {
            src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
            alt: "TypeScript",
            href: "https://typescriptlang.org",
          },
        ].map((img) => (
          <a
            key={img.href}
            href={img.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-16 w-32 select-none justify-center p-1 opacity-80 grayscale transition hover:scale-110 hover:opacity-100 hover:grayscale-0 focus:grayscale-0"
          >
            <img
              alt={img.alt}
              src={img.src}
            />
          </a>
        ))}
      </div>

      {/* Footer. */}
      <footer className="absolute bottom-4">
        <h5 className="text-center text-sm font-normal text-zinc-400">
          Discover Remix
        </h5>
        <div className="h-2" />

        <div className="flex flex-row items-center">
          <a href="https://github.com/remix-run">
            <svg
              className="h-6 w-6 fill-zinc-400 transition hover:scale-110 hover:fill-slate-900 active:scale-100"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
              />
            </svg>
          </a>
          <div className="w-3" />

          <a href="https://twitter.com/remix_run">
            <svg
              className="h-6 w-6 fill-zinc-400 transition hover:scale-110 hover:fill-slate-900 active:scale-100"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
            </svg>
          </a>
          <div className="w-3" />

          <a href="https://discord.com/invite/remix">
            <svg
              className="h-6 w-6 fill-zinc-400 transition hover:scale-110 hover:fill-slate-900 active:scale-100"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}
