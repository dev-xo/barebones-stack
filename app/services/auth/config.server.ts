import type { UserSession } from '~/services/auth/session.server'

import { Authenticator } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'

import { sessionStorage } from '~/services/auth/session.server'
import { getUserById, getUserByEmail } from '~/models/user/get-user'
import { createEmailUser } from '~/models/user/create-user'

import { hashPassword, validateHashPassword } from './utils/encryption.server'
import { AUTH_KEYS } from '~/lib/constants'

/**
 * Inits Authenticator.
 */
export let authenticator = new Authenticator<UserSession>(sessionStorage, {
	sessionErrorKey: 'SESSION_ERROR',
	throwOnError: true,
})

/**
 * Strategies - Email Form.
 */
authenticator.use(
	new FormStrategy(async ({ form, context }) => {
		// Force casting type to UserSession.
		// This is required by the `Authenticator` type in this case.
		let user = {} as UserSession

		const email = form.get('email')
		const password = form.get('password')

		if (typeof email !== 'string' || typeof password !== 'string') {
			throw new Error('Invalid email or password.')
		}

		switch (context && context.action) {
			/**
			 * Login context.
			 */
			case AUTH_KEYS.IS_LOGIN_CONTEXT: {
				// Checks for user existence in database.
				const dbUser = await getUserByEmail(email, {
					password: true,
				})
				if (!dbUser || !dbUser.password) throw new Error('User not found.')

				// Validates provided credentials with database ones.
				const isPasswordValid = await validateHashPassword(
					password,
					dbUser.password.hash,
				)
				if (!isPasswordValid) throw new Error('Incorrect credentials.')

				// Sets user to database user.
				return (user = dbUser)
			}

			/**
			 * Register context.
			 */
			case AUTH_KEYS.IS_REGISTER_CONTEXT: {
				const name = form.get('name')
				if (typeof name !== 'string') throw new Error('Invalid name.')

				// Checks if email is already in use.
				const dbUser = await getUserByEmail(email)
				if (dbUser && dbUser.email === email)
					throw new Error('Email is already in use.')

				// Hashes password.
				const hashedPassword = await hashPassword(password)

				// Creates and stores a new user in database.
				const newUser = await createEmailUser(
					{
						name,
						email,
						avatar: `https://ui-avatars.com/api/?&name=${name}&background=random`,
					},
					hashedPassword,
				)
				if (!newUser) throw new Error('Failed to create a new user.')

				// Sets user as newly created user.
				return (user = newUser)
			}
		}

		// Returns user as Session.
		return user
	}),
)
