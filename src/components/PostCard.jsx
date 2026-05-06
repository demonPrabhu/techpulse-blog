import React from 'react'
import { Link } from 'react-router'
import configService from '../appwrite/config'

export default function PostCard({
    $id,  // this is syntax of appwrite so we mention $symbol, $id
    title,
    featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
    <div>
        <div>
            <img src={configService.getFilePreview(featuredImage)} alt={title} />
            <h2>{title}</h2>
        </div>
    </div>
    </Link>
  )
}
