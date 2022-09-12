/**
 * This should be used any time the redirect path is user-provided.
 * This avoids open-redirect vulnerabilities.
 *
 * @param { string } to Redirect destination.
 * @param { string } defaultRedirect Default redirect if `to` is unsafe.
 */
export const safeRedirect = (
	to: FormDataEntryValue | string | null | undefined,
	defaultRedirect = '/',
) => {
	if (
		!to ||
		typeof to !== 'string' ||
		!to.startsWith('/') ||
		to.startsWith('//')
	) {
		return defaultRedirect
	}

	return to
}
