import { Link } from '@remix-run/react'

export default function LoginIndex() {
	return (
		<div className="flex w-full flex-col">
			{/* Email. */}
			<Link
				to="email"
				prefetch="intent"
				className="relative flex h-12 w-full flex-row items-center justify-center rounded-xl bg-slate-600 
				text-base font-bold text-white transition hover:scale-105 hover:brightness-125 active:brightness-90">
				<svg
					className="absolute left-6 h-6 w-6 fill-white"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z" />
				</svg>

				<span>Continue with Email</span>
			</Link>
		</div>
	)
}
