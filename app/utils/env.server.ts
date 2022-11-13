/**
 * Utils.
 */
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			// BASE
			NODE_ENV: 'development' | 'production' | 'test'
			SESSION_SECRET: string
			ENCRYPTION_SECRET: string

			// EMAIL PROVIDER
			EMAIL_PROVIDER_API_KEY: string
		}
	}
}

export {}
