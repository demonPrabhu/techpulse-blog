import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import configService from '../appwrite/config'

/** Post preview card for grid listings (Home, My Posts); links through to the full post. */
export default function PostCard({ $id, title, featuredImage, userName, status }) {
    const [imageUrl, setImageUrl] = useState("")

    // featuredImage is a file ID, not a URL — resolve it to a viewable URL before rendering.
    useEffect(() => {
        const fetchImageUrl = async () => {
            const url = await configService.getFilePreview(featuredImage)
            if (url) {
                // If Appwrite returns a URL object, use .href, otherwise use the string
                setImageUrl(typeof url === 'string' ? url : url?.href || '')
            }
        }
        fetchImageUrl()
    }, [featuredImage])

    return (
        <Link to={`/post/${$id}`} className="group block h-full">
            <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition duration-300 ease-in-out hover:-translate-y-1 hover:border-blue-500/30">
                <div className="relative overflow-hidden">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={title}
                            className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="h-52 w-full animate-pulse bg-slate-800" />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/60 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex w-fit items-center gap-2">
                        <span className="inline-flex rounded px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400 border border-blue-500/20 bg-blue-500/5">
                            Blog Post
                        </span>
                        {status === 'inactive' && (
                            <span className="inline-flex rounded px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 border border-amber-500/20 bg-amber-500/5">
                                Draft
                            </span>
                        )}
                    </div>
                    <h2 className="line-clamp-2 text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">By {userName || 'Anonymous'}</p>
                    <div className="mt-4 flex items-center justify-between pt-3 text-sm text-slate-400">
                        <span>Read article</span>
                        <span aria-hidden="true">→</span>
                    </div>
                </div>
            </article>
        </Link>
    )
}
