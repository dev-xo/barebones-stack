import type { MetaFunction, LoaderArgs, ActionArgs } from '@remix-run/node'
import { redirect, json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { authenticator } from '~/services/auth/config.server'
import { getSession, destroySession } from '~/services/auth/session.server'
import { getUserById } from '~/models/user.server'
import { deleteUser } from '~/models/user.server'

/**
 * Remix - Meta.
 */
export const meta: MetaFunction = () => {
	return {
		title: 'Barebones Stack - Account',
	}
}

/**
 * Remix - Loader.
 */
export const loader = async ({ request }: LoaderArgs) => {
	/**
	 * Checks for Auth Session.
	 */
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login',
	})

	return json({
		user,
	})
}

/**
 * Remix - Action.
 */
export const action = async ({ request }: ActionArgs) => {
	/**
	 * Checks for Auth Session.
	 */
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login',
	})

	/**
	 * Checks for user existence in database.
	 */
	const dbUser = await getUserById({
		id: user.id,
	})

	if (dbUser) {
		/**
		 * Deletes current user from database.
		 */
		const userId = dbUser.id
		await deleteUser(userId)

		/**
		 * Redirects to 'x' destroying current Auth Session.
		 */
		let session = await getSession(request.headers.get('Cookie'))

		return redirect('/', {
			headers: {
				'Set-Cookie': await destroySession(session),
			},
		})
	}

	/**
	 * Whops!
	 */
	return json({}, { status: 400 })
}

export default function AccountRoute() {
	const { user } = useLoaderData<typeof loader>()

	return (
		<div className="m-12 mx-auto flex h-full w-full max-w-4xl flex-row items-center px-6">
			{/* User Account. */}
			<div className="flex w-full flex-col items-center">
				{/* Avatar. */}
				<div className="relative flex flex-col">
					{user.avatar && (
						<img
							src={user.avatar}
							alt="Avatar"
							className="h-44 w-44 select-none rounded-full shadow-xl transition hover:scale-110"
						/>
					)}
				</div>
				<div className="m-3" />

				{/* Info. */}
				<div className="flex flex-col items-center">
					<h5 className="relative flex flex-row items-center text-3xl font-bold text-gray-900">
						{user.name}
						<svg
							className="absolute -right-9 h-7 w-7 fill-sky-500"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24">
							<path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z" />
						</svg>
					</h5>
					<div className="mb-1" />
					<span className="font-semibold text-gray-700">My account</span>
				</div>
				<div className="mb-3" />

				{/* Deletes user account. */}
				<Form method="post">
					<button
						className="flex h-9 flex-row items-center justify-center rounded-xl 
						bg-red-500 px-6 text-base font-bold text-white transition hover:scale-105 active:scale-100">
						<span>Delete Account</span>
					</button>
				</Form>
				<div className="mb-3" />

				{/* Logs Out. */}
				<Form action="/logout" method="post">
					<button
						className="flex h-9 flex-row items-center justify-center rounded-xl 
						bg-gray-900 px-6 text-base font-bold text-white transition hover:scale-105 active:scale-100">
						<span>Logout</span>
					</button>
				</Form>
			</div>
			<div className="mb-8" />
		</div>
	)
}
