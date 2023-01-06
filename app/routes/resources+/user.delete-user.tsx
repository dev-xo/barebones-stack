import type { DataFunctionArgs } from '@remix-run/node'

import { redirect, json } from '@remix-run/node'
import { authenticator } from '~/services/auth/config.server'
import { getSession, destroySession } from '~/services/auth/session.server'

import { getUserById } from '~/models/user/get-user'
import { deleteUser } from '~/models/user/delete-user'

export const action = async ({ request }: DataFunctionArgs) => {
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login',
	})

	// Checks for user existence in database.
	const dbUser = await getUserById(user.id)

	if (dbUser) {
		const userId = dbUser.id

		// Deletes user from database.
		await deleteUser(userId)

		// Redirects destroying current Session.
		let session = await getSession(request.headers.get('Cookie'))

		return redirect('/', {
			headers: {
				'Set-Cookie': await destroySession(session),
			},
		})
	}

	// Whops!
	return json({}, { status: 400 })
}

export default function DeleteUserResource() {
	return <div>Whops! You should have been redirected.</div>
}
