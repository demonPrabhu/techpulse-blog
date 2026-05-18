import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {

    return(
   <div className="not-found-container" style={{ textAlign: 'center', padding: '40px' }}>
      <h1>404 - Not Found</h1>
      <p>Oops! This page doesn't exist.</p>
      {/* Using Link prevents a full page reload */}
      <Link to="/" style={{ color: 'blue', fontWeight: 'bold' }}>Go to Home</Link>
    </div>)
}
