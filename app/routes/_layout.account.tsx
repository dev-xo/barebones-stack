import type { DataFunctionArgs } from '@remix-run/node'

import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { authenticator } from '~/services/auth/config.server'

export async function loader({ request }: DataFunctionArgs) {
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login',
	})

	return json({ user })
}

export default function Account() {
	const { user } = useLoaderData<typeof loader>()

	return (
		<div className="flex flex-col items-center justify-center px-6 md:h-full">
			<h3 className="text-3xl font-bold text-gray-200">Dashboard</h3>
			<div className="mb-2" />
			<p className="max-w-sm text-center font-semibold text-gray-400">
				Simple Dashboard example that includes User Info and Subscription Plan.
			</p>
			<div className="mb-12" />

			<div className="flex w-full max-w-2xl flex-col items-center md:flex-row md:justify-evenly">
				{/* User. */}
				<div className="mb-16 flex h-full w-full flex-col items-center md:mb-0">
					{/* Avatar. */}
					{user.avatar ? (
						<img
							src={user.avatar}
							alt="Avatar"
							className="h-48 w-48 select-none rounded-full transition hover:scale-105 hover:brightness-110"
						/>
					) : (
						<img
							src="https://ui-avatars.com/api/?&name=hi&background=random"
							alt="Avatar"
							className="h-48 w-48 select-none rounded-full transition hover:scale-105 hover:brightness-110"
						/>
					)}
					<div className="m-4" />

					{/* Info. */}
					<div className="flex flex-col items-center">
						<h5 className="flex flex-row items-center text-center text-2xl font-bold text-gray-200">
							{user.name}
							<div className="mr-1" />
							<svg
								className="h-7 w-7 fill-sky-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24">
								<path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z" />
							</svg>
						</h5>

						<span className="text-center text-xl font-semibold text-gray-400">
							My account
						</span>
					</div>
					<div className="mb-4" />

					{/* Delete Account Form Button. */}
					<Form
						action="/user/delete-user"
						method="post"
						className="flex h-10 flex-row items-center rounded-xl border border-gray-600 px-6 
						font-bold text-gray-200 transition hover:scale-105 hover:border-red-500 hover:text-red-500 active:opacity-80">
						<button>Delete account</button>
					</Form>
				</div>
			</div>
		</div>
	)
}
