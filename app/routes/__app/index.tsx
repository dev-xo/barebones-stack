import { Link } from '@remix-run/react'

export default function Index() {
	return (
		<div className="flex h-screen w-full flex-col items-center px-4">
			{/*  Navigation  */}
			<nav className="z-20 flex w-full flex-row items-center justify-end py-4 px-2">
				<div className="flex flex-row items-center">
					<a
						href="https://github.com/dev-xo/barebones-stack"
						target="_blank"
						rel="noopener noreferrer">
						<svg
							className="h-8 w-8 fill-gray-800 transition hover:scale-110 active:scale-100"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
							/>
						</svg>
					</a>
				</div>
			</nav>

			{/* Main. */}
			<main className="relative bottom-3 flex h-full flex-col items-center justify-center">
				{/* Intro. */}
				<div className="flex flex-col items-center">
					<div className="transition hover:scale-110 active:scale-100">
						<img
							src="https://raw.githubusercontent.com/dev-xo/dev-xo/main/barebones-stack/assets/images/bone.png"
							alt=""
							className="pulse relative left-[18px] h-36 select-none drop-shadow-xl"
						/>
					</div>
					<div className="m-3" />

					<div className="flex flex-col items-center">
						<h1 className="text-3xl font-light text-gray-900 drop-shadow-md">
							<span className="font-semibold text-gray-900">Remix</span> Stacks
						</h1>
						<div className="mb-1" />
						<p
							className="cursor-default text-base font-semibold text-gray-900
            	drop-shadow-sm hover:opacity-50">
							Open Source Remix Template
						</p>
					</div>
					<div className="m-1" />

					<div className="flex flex-col items-center">
						<h1 className="text-5xl font-bold text-gray-900 drop-shadow-xl sm:text-6xl">
							Barebones
						</h1>
					</div>
					<div className="m-3" />

					{/* Buttons. */}
					<div className="flex flex-col items-center sm:flex-row">
						<a
							href="https://github.com/dev-xo/barebones-stack"
							target="_blank"
							rel="noopener noreferrer"
							className="flex h-auto w-full flex-row items-center text-lg font-semibold
          		text-gray-900 transition hover:scale-105 active:scale-100 sm:w-auto">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className="h-8 fill-gray-900">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
								/>
							</svg>
							<div className="w-2" />
							Github Documentation
						</a>
						<div className="mb-6 sm:ml-6 sm:mb-0" />

						<Link
							to="/login"
							className="flex h-12 w-full flex-row items-center justify-center rounded-xl bg-violet-500 px-6
          		text-lg font-bold text-gray-100 transition hover:scale-105 active:scale-100 sm:w-auto">
							Try Template
						</Link>
					</div>
				</div>
				<div className="m-6" />

				{/* Brandings. */}
				<div className="flex max-w-6xl flex-wrap justify-center gap-8">
					{[
						{
							src: 'https://user-images.githubusercontent.com/1500684/157764397-ccd8ea10-b8aa-4772-a99b-35de937319e1.svg',
							alt: 'Fly.io',
							href: 'https://fly.io',
						},
						{
							src: 'https://user-images.githubusercontent.com/1500684/157764484-ad64a21a-d7fb-47e3-8669-ec046da20c1f.svg',
							alt: 'Prisma',
							href: 'https://prisma.io',
						},
						{
							src: 'https://playwright.dev/img/playwright-logo.svg',
							alt: 'Playwright',
							href: 'https://playwright.dev/',
						},
						{
							src: 'https://user-images.githubusercontent.com/1500684/157772386-75444196-0604-4340-af28-53b236faa182.svg',
							alt: 'MSW',
							href: 'https://mswjs.io',
						},
						{
							src: 'https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg',
							alt: 'Vitest',
							href: 'https://vitest.dev',
						},
						{
							src: 'https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png',
							alt: 'Testing Library',
							href: 'https://testing-library.com',
						},
						{
							src: 'https://user-images.githubusercontent.com/1500684/157764276-a516a239-e377-4a20-b44a-0ac7b65c8c14.svg',
							alt: 'Tailwind',
							href: 'https://tailwindcss.com',
						},
					].map((img) => (
						<a
							key={img.href}
							href={img.href}
							target="_blank"
							rel="noopener noreferrer"
							className="flex h-14 w-28 select-none justify-center p-1 drop-shadow-sm
              grayscale transition hover:scale-110 hover:grayscale-0 focus:grayscale-0">
							<img alt={img.alt} src={img.src} />
						</a>
					))}
				</div>
			</main>

			{/* Footer */}
			<footer className="z-10 flex flex-col items-center p-8">
				<div
					className="fixed bottom-4 flex select-none flex-row items-center justify-between
					rounded-full bg-white p-3 px-6 shadow-2xl transition hover:scale-105">
					{/* Socials. */}
					<div className="flex flex-row items-center">
						<div className="flex flex-col">
							<p className="whitespace-nowrap text-sm font-semibold text-gray-400">
								Discover Remix
							</p>
						</div>
						<div className="mx-3" />

						<div className="flex flex-row items-center">
							<a
								href="https://github.com/remix-run"
								target="_blank"
								rel="noopener noreferrer">
								<svg
									className="h-6 w-6 fill-gray-400 transition hover:scale-110
									hover:fill-gray-900 active:scale-100"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
									/>
								</svg>
							</a>
							<div className="w-3" />

							<a
								href="https://twitter.com/remix_run"
								target="_blank"
								rel="noopener noreferrer">
								<svg
									className="h-6 w-6 fill-gray-400 transition hover:scale-110
									hover:fill-gray-900 active:scale-100"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
								</svg>
							</a>
							<div className="w-3" />

							<a
								href="https://discord.com/invite/xwx7mMzVkA"
								target="_blank"
								rel="noopener noreferrer">
								<svg
									className="h-6 w-6 fill-gray-400 transition hover:scale-110
									hover:fill-gray-900 active:scale-100"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}
