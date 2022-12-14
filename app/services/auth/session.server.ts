import type { User, Password } from '@prisma/client'
import { createCookieSessionStorage } from '@remix-run/node'

export interface UserSession extends User {
	password?: Password | null
}

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: '_session',
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		secrets: [process.env.SESSION_SECRET || 'SESSION_SECRET'],
		secure: process.env.NODE_ENV === 'production',
	},
})

export const { getSession, commitSession, destroySession } = sessionStorage
