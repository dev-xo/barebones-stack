import type { LoaderArgs } from "@remix-run/node";
import type { Welcome } from "@prisma/client";

import { json } from "@remix-run/node";
import { prisma } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";

import BeamsPNG from "~/assets/images/beams.png";
import BonePNG from "~/assets/images/bone.png";

type LoaderData = {
  message: Awaited<Welcome["message"]>;
};

export async function loader({ request }: LoaderArgs) {
  const dbMessage = await prisma.welcome.findFirst({
    orderBy: { createdAt: "desc" },
    take: 1,
  });

  return json<LoaderData>({
    message: dbMessage?.message ? dbMessage.message : null,
  });
}

export default function Index() {
  const { message } = useLoaderData() as LoaderData;

  return (
    <div className="flex  flex-col items-center justify-center p-6 sm:p-0">
      {/* Background Image. */}
      <img
        className="pulse fixed z-[-1] h-[100%] object-cover"
        src={BeamsPNG}
        alt=""
      />

      {/* Socials. */}
      <div className="fixed top-4 right-4 flex flex-row items-center">
        <a
          href="https://github.com/dev-xo/barebones-stack"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-8 fill-slate-400 duration-100 hover:scale-110 hover:fill-slate-800
            active:scale-95 active:ease-in"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
            />
          </svg>
        </a>
        <div className="w-3" />

        <a
          href="https://twitter.com/DanielKanem"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-8 fill-slate-400 duration-100 hover:scale-110 hover:fill-slate-800
            active:scale-95 active:ease-in"
          >
            <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
          </svg>
        </a>
      </div>

      {/* Intro. */}
      <div className="overflow-x flex min-h-screen flex-col items-center justify-center">
        <img
          src={BonePNG}
          alt=""
          className="pulse relative left-[18px] h-36 drop-shadow-xl"
        />
        <div className="h-8" />

        <h1 className="relative text-center text-6xl font-bold drop-shadow-xl">
          Barebones Stack
          <span
            className="absolute top-[-28px] flex flex-row rounded-md bg-[rgba(244,44,64,0.8)] px-[8px] 
            py-[6px] text-white transition hover:scale-110  md:right-[-36px]"
          >
            <a
              href="https://github.com/dev-xo/barebones-postgres-stack"
              target="_blank"
              rel="noreferrer"
              className="text-[16px] hover:underline"
            >
              New PostgreSQL Version!
            </a>
          </span>
        </h1>
        <div className="h-3" />

        <p className="max-w-xl text-center text-lg font-normal drop-shadow-xl">
          A solid{" "}
          <a
            href="https://remix.run/docs/en/v1/pages/stacks"
            target="_blank"
            rel="noreferrer"
            className="font-bold hover:underline hover:opacity-50"
          >
            Remix Stack
          </a>{" "}
          that follows community guidelines and applies best practices into a
          clean, <span className="font-bold">batteries included</span> template.
        </p>
        <div className="h-11" />

        <div className="flex max-w-7xl flex-wrap justify-center gap-8 px-3">
          {[
            {
              src: "https://user-images.githubusercontent.com/1500684/157764397-ccd8ea10-b8aa-4772-a99b-35de937319e1.svg",
              alt: "Fly.io",
              href: "https://fly.io",
            },
            {
              src: "https://user-images.githubusercontent.com/1500684/157764484-ad64a21a-d7fb-47e3-8669-ec046da20c1f.svg",
              alt: "Prisma",
              href: "https://prisma.io",
            },
            {
              src: "https://user-images.githubusercontent.com/1500684/157764395-137ec949-382c-43bd-a3c0-0cb8cb22e22d.svg",
              alt: "SQLite",
              href: "https://sqlite.org",
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
              className="flex h-16 w-32 justify-center p-1 grayscale transition hover:scale-110 hover:grayscale-0 focus:grayscale-0"
            >
              <img alt={img.alt} src={img.src} />
            </a>
          ))}
        </div>
      </div>

      {/* Database Message. */}
      {message && (
        <p
          className="shake fixed bottom-6 z-[1] rounded-xl border-slate-200 bg-slate-900 py-[7px] px-3 
            text-center text-base font-medium text-white drop-shadow-xl hover:scale-105 hover:cursor-default"
        >
          {message}
        </p>
      )}
    </div>
  );
}
