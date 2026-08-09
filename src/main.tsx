import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'

// ─── Production-Ready Client Only Wrapper ──────────────────────────────────
// Only suppresses hydration warnings during development.
// In production, it renders normally.
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  // In production, always render children (no hydration mismatch)
  // In development, wait for mount to avoid hydration issues
  if (import.meta.env.DEV && !hasMounted) {
    return null
  }

  return children
}

// ─── Production-Ready Hydration ─────────────────────────────────────────────
if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root')
  if (rootElement) {
    // In development, use ClientOnly wrapper to avoid hydration mismatches
    // In production, hydrate normally
    if (import.meta.env.DEV) {
      hydrateRoot(rootElement, 
        <ClientOnly>
          <App />
        </ClientOnly>
      )
    } else {
      hydrateRoot(rootElement, <App />)
    }
  }
}

export { App }

/**
 * SSG render — React Router v7
 * Uses renderToPipeableStream directly (no fallback needed for React 19)
 */
export async function render(url: string): Promise<string> {
  const ReactDOMServer = await import('react-dom/server')
  const { createElement } = await import('react')
  const { StaticRouter } = await import('react-router-dom')
  const { AppRoutes, basename } = await import('./App')
  const { Writable } = await import('stream')

  return new Promise((resolve, reject) => {
    let html = ''
    const writable = new Writable({
      write(chunk, _enc, callback) {
        html += chunk.toString()
        callback()
      },
    })

    const { pipe } = ReactDOMServer.renderToPipeableStream(
      createElement(
        StaticRouter,
        { location: url, basename },
        createElement(AppRoutes)
      ),
      {
        onAllReady() {
          pipe(writable)
          writable.on('finish', () => resolve(html))
        },
        onError: (err) => {
          reject(err)
        },
      }
    )
  })
}