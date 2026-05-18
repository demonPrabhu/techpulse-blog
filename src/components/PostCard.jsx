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
                setImageUrl( url)
            }
        }
        fetchImageUrl()
    }, [featuredImage])

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4 m-4'>
                <div className='w-full justify-center mb-4'>
                    {/* 3. Use the state variable here */}
                    {imageUrl ? (
                        <img src={imageUrl} alt={title} className='rounded-xl' />
                    ) : (
                        <div className="h-40 w-full bg-gray-200 animate-pulse rounded-xl" /> // Loading placeholder
                    )}
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
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
