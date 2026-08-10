import React from 'react'

/** Site logo image, served from public/ so it resolves correctly on any route/domain. */
export default function Logo({width='100%'}) {
  return (
    <img src="/TechPulse.png" style={{width}} alt="Logo Placeholder" />
  )
}
