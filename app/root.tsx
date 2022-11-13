import type {
	LinksFunction,
	MetaFunction,
	ErrorBoundaryComponent,
} from '@remix-run/node'

import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'

import tailwindStylesheetUrl from './styles/tailwind.css'

/**
 * Remix - Links.
 */
export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: tailwindStylesheetUrl }]
}

/**
 * Remix - Meta.
 */
export const meta: MetaFunction = () => {
	return {
		charset: 'utf-8',
		title: 'Welcome to Barebones Stack!',
		description: `A starter focused Remix Stack that integrates User Authentication, 
		Forms validation and Testing. Driven by Prisma ORM. Deploys to Fly.io `,
		keywords:
			'remix, remix-stack, typescript, sqlite, postgresql, prisma, tailwindcss, fly.io',
		'og:title': 'Remix - Barebones Stack',
		'og:type': 'website',
		'og:url': 'https://barebones-stack.fly.dev',
		'og:image':
			'https://raw.githubusercontent.com/dev-xo/dev-xo/main/barebones-stack/assets/images/Barebones-Thumbnail.png',
		'og:card': 'summary_large_image',
		'og:creator': '@DanielKanem',
		'og:site': 'https://barebones-stack.fly.dev',
		'og:description': `A starter focused Remix Stack that integrates User Authentication, 
		Forms validation and Testing. Driven by Prisma ORM. Deploys to Fly.io `,
		'twitter:image':
			'https://raw.githubusercontent.com/dev-xo/dev-xo/main/barebones-stack/assets/images/Barebones-Thumbnail.png',
		'twitter:card': 'summary_large_image',
		'twitter:creator': '@DanielKanem',
		'twitter:title': 'Remix - Barebones Stack',
		'twitter:description': `A starter focused Remix Stack that integrates User Authentication, 
		Forms validation and Testing. Driven by Prisma ORM. Deploys to Fly.io `,
	}
}

/**
 * Remix - Error Boundary.
 */
export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
	console.error(error)
	return (
		<html>
			<head>
				<title>Oh no!</title>
				<Meta />
				<Links />
			</head>
			<body className="flex h-screen flex-col items-center justify-center">
				{/* Add here the UI you want your users to see. */}
				<h1 className="text-center text-3xl font-semibold">
					Whops. Something went wrong!
				</h1>
				<div className="mb-3" />
				<p>Please, check your client console.</p>
				<Scripts />
			</body>
		</html>
	)
}

/**
 * App Root.
 */
export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body className="h-full">
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === 'development' && <LiveReload />}
			</body>
		</html>
	)
}
