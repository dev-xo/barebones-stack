import type { AuthSession } from '~/lib/auth/session.server'

import { Authenticator } from 'remix-auth'
import { sessionStorage } from '~/lib/auth/session.server'

/**
 * Inits Authenticator.
 */
export let authenticator = new Authenticator<AuthSession>(sessionStorage)
