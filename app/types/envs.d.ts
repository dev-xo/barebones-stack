declare global {
	namespace NodeJS {
		interface ProcessEnv {
			// Base.
			NODE_ENV: 'development' | 'production' | 'test'
			SESSION_SECRET: string
			ENCRYPTION_SECRET: string

			// Database.
			DATABASE_URL: string

			// [Optional] Email Provider.
			EMAIL_PROVIDER_API_KEY: string
		}
	}
}

export {}
