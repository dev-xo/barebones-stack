import type { LoaderArgs } from "@remix-run/node"
import { prisma } from "~/utils/db.server"

/**
 * Remix - Loader.
 * @protected Template code.
 *
 * If we can connect to database to make a simple query
 * and a HEAD request to ourselves, then we're good.
 *
 * Learn more: https://fly.io/docs/reference/configuration/#services-http_checks
 */
export async function loader({ request }: LoaderArgs) {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host")

  try {
    const url = new URL("/", `http://${host}`)
    // If we can connect to database to make a simple query and a HEAD request
    // to ourselves, then we're good.
    await Promise.all([
      prisma.welcome.count(),

      fetch(url.toString(), { method: "HEAD" }).then((r) => {
        if (!r.ok) return Promise.reject(r)
      }),
    ])

    return new Response("OK")
  } catch (error: unknown) {
    console.log("Healthcheck ❌", { error })
    return new Response("ERROR", { status: 500 })
  }
}
