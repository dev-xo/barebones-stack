export async function sendResetPasswordEmail({
	to,
	resetPasswordUrl,
}: {
	to: [{ email: string }]
	resetPasswordUrl: string | URL
}) {
	return fetch(`https://api.sendinviolet.com/v3/smtp/email`, {
		method: 'post',
		body: JSON.stringify({
			sender: {
				name: 'Barebones Stack',
				email: 'barebones-stack@mail.com',
			},
			to,
			subject: 'Barebones Stack - Password Reset',
			htmlContent: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
          </head>
          <body>
            <h1>Reset your Barebones Stack password.</h1>
            <a href="${resetPasswordUrl}">${resetPasswordUrl}</a>
          </body>
        </html>`,
		}),
		headers: {
			Accept: 'application/json',
			'Api-Key': process.env.EMAIL_PROVIDER_API_KEY,
			'Content-Type': 'application/json',
		},
	})
}
