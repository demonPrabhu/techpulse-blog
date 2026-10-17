import React from 'react'
import { Link } from 'react-router-dom'

/** Catch-all 404 page for unmatched routes. */
export default function NotFound() {

    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="max-w-lg rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center shadow-[0_20px_50px_rgba(37,99,235,0.15)] backdrop-blur-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">404</p>
                <h1 className="mt-2 text-2xl font-bold text-white">Page not found</h1>
                <p className="mt-3 text-slate-400">Oops! This page doesn't exist.</p>
                <Link
                    to="/"
                    className="mt-5 inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700"
                >
                    ← Go to Home
                </Link>
            </div>
        </div>
    )
}
