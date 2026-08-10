import React from 'react'
import { Link } from 'react-router-dom'

/** Catch-all 404 page for unmatched routes. */
export default function NotFound() {

    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-lg rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">404</p>
                <h1 className="mt-2 text-2xl font-bold text-slate-900">Page not found</h1>
                <p className="mt-3 text-slate-600">Oops! This page doesn't exist.</p>
                {/* Using Link prevents a full page reload */}
                <Link
                    to="/"
                    className="mt-5 inline-flex items-center gap-1 rounded-lg bg-sky-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-sky-700"
                >
                    ← Go to Home
                </Link>
            </div>
        </div>
    )
}
