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

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: tailwindStylesheetUrl }]
}

export const meta: MetaFunction = () => {
	return {
		charset: 'utf-8',
		title: 'Welcome to Remix Barebones Stack!',
		description:
			'A robust create-remix app, that applies best practices into a clean, batteries included template. SQLite version. Deploys to Fly.io',
		keywords:
			'remix,create-remix,remix-stack,typescript,sqlite,prisma,tailwindcss,fly.io',
		'og:title': 'Remix Barebones Stack',
		'og:type': 'website',
		'og:url': 'https://barebones-stack.fly.dev',
		'og:image':
			'https://raw.githubusercontent.com/dev-xo/dev-xo/main/barebones-stack/assets/images/thumbnail-sqlite-v1.png',
		'og:card': 'summary_large_image',
		'og:creator': '@DanielKanem',
		'og:site': 'https://barebones-stack.fly.dev',
		'og:description':
			'A robust create-remix app, that applies best practices into a clean, batteries included template. SQLite version. Deploys to Fly.io',
		'twitter:image':
			'https://raw.githubusercontent.com/dev-xo/dev-xo/main/barebones-stack/assets/images/thumbnail-sqlite-v1.png',
		'twitter:card': 'summary_large_image',
		'twitter:creator': '@DanielKanem',
		'twitter:title': 'Remix Barebones Stack',
		'twitter:description':
			'A robust create-remix app, that applies best practices into a clean, batteries included template. SQLite version. Deploys to Fly.io',
	}
}

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
				<h1 className="text-2xl">Something went wrong!</h1>
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
