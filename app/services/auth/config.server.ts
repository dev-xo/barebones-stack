import type { AuthSession } from '~/services/auth/session.server'
import { Authenticator } from 'remix-auth'
import { sessionStorage } from '~/services/auth/session.server'

/**
 * Init.
 */
export let authenticator = new Authenticator<AuthSession>(sessionStorage, {
	sessionErrorKey: 'AUTH_SESSION_ERROR_KEY',
})
