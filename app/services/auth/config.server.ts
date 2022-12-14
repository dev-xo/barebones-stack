import type { UserSession } from '~/services/auth/session.server'

import { Authenticator } from 'remix-auth'
import { sessionStorage } from '~/services/auth/session.server'

/**
 * Inits Authenticator.
 */
export let authenticator = new Authenticator<UserSession>(sessionStorage)
