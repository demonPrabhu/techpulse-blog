// import React from 'react'
// import { Link } from 'react-router'
// import configService from '../appwrite/config'

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import configService from '../appwrite/config'

export default function PostCard({ $id, title, featuredImage }) {
    // 1. Create a state to hold the resolved URL string
    const [imageUrl, setImageUrl] = useState("")

    // 2. Use useEffect to "await" the async function
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
            <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                <div className="relative overflow-hidden">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={title}
                            className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="h-52 w-full animate-pulse bg-slate-200" />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/40 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-5">
                    <span className="mb-3 inline-flex w-fit rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
                        Blog Post
                    </span>
                    <h2 className="line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-sky-700">
                        {title}
                    </h2>
                    <div className="mt-4 flex items-center justify-between pt-3 text-sm text-slate-500">
                        <span>Read article</span>
                        <span aria-hidden="true">→</span>
                    </div>
                </div>
            </article>
        </Link>
    )
}





// export default function PostCard({
//     $id,  // this is syntax of appwrite so we mention $symbol, $id
//     title,
//     featuredImage
// }) 

// {

//   console.log('PostCared', featuredImage)
//   return (
//     <Link to={`/post/${$id}`}>
//     <div
//     className='w-full bg-gray-100 rounded-xl p-4 m-4'
//     >
//         <div
//         className='w-full justify-center mb-4'
//         >
//             <img src={configService.getFileView(featuredImage)} alt={title} 
//             className='rounded-xl'
//             />
//         </div>
//         <h2 className='text-xl font-bold'>{title}</h2>
//     </div>
//     </Link>
//   )
// }
