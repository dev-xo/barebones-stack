/**
 * Shared envs are used in both `entry.server.ts` and `root.tsx`.
 * Do not share sensible variables that you do not wish to
 * be included in the client.
 */
export function getGlobalEnvs() {
	return {}
}
